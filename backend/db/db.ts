import { DefaultAzureCredential } from "@azure/identity";
import sql from "mssql";
import { isSqlConnectivityError } from "@backend/db/sql-unavailable";
import { sqlDatabase, sqlEncrypt, sqlPort, sqlServer } from "@backend/env";

const AZURE_SQL_SCOPE = "https://database.windows.net/.default";
const TOKEN_REFRESH_MS = 5 * 60 * 1000;
const CONNECT_TIMEOUT_MS = 30_000;
const CONNECT_ATTEMPTS = 3;

type GlobalSql = {
  ciuSqlCredential?: DefaultAzureCredential;
  ciuSqlPool?: sql.ConnectionPool;
  ciuSqlConnecting?: Promise<sql.ConnectionPool>;
  ciuSqlTokenExpiresOn?: number;
};

const globalSql = globalThis as typeof globalThis & GlobalSql;

function credential() {
  globalSql.ciuSqlCredential ??= new DefaultAzureCredential();
  return globalSql.ciuSqlCredential;
}

async function azureSqlAccessToken() {
  const token = await credential().getToken(AZURE_SQL_SCOPE);
  if (!token?.token) {
    throw new Error(
      "Could not obtain an Azure SQL access token. Run `az login` locally or configure an Entra app identity."
    );
  }
  return token;
}

async function sqlConfig(): Promise<sql.config> {
  const token = await azureSqlAccessToken();
  globalSql.ciuSqlTokenExpiresOn = token.expiresOnTimestamp;

  return {
    server: sqlServer(),
    database: sqlDatabase(),
    port: sqlPort(),
    connectionTimeout: CONNECT_TIMEOUT_MS,
    options: {
      encrypt: sqlEncrypt(),
      trustServerCertificate: false,
      enableArithAbort: true,
      connectTimeout: CONNECT_TIMEOUT_MS,
    },
    authentication: {
      type: "azure-active-directory-access-token",
      options: {
        token: token.token,
      },
    },
    pool: {
      max: 8,
      min: 0,
      idleTimeoutMillis: 30_000,
    },
  };
}

function tokenNeedsRefresh() {
  const expiresOn = globalSql.ciuSqlTokenExpiresOn ?? 0;
  return !expiresOn || expiresOn - Date.now() < TOKEN_REFRESH_MS;
}

export async function closeSqlPool() {
  const pool = globalSql.ciuSqlPool;
  globalSql.ciuSqlPool = undefined;
  globalSql.ciuSqlTokenExpiresOn = undefined;
  if (pool) {
    try {
      await pool.close();
    } catch {
      // Ignore close errors so a new pool can be created.
    }
  }
}

async function connectPool() {
  let lastError: unknown;
  for (let attempt = 1; attempt <= CONNECT_ATTEMPTS; attempt += 1) {
    try {
      const pool = new sql.ConnectionPool(await sqlConfig());
      pool.on("error", () => {
        void closeSqlPool();
      });
      return await pool.connect();
    } catch (error) {
      lastError = error;
      if (!isSqlConnectivityError(error) || attempt === CONNECT_ATTEMPTS) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
    }
  }
  throw lastError;
}

export async function getSqlPool() {
  if (globalSql.ciuSqlPool?.connected && !tokenNeedsRefresh()) {
    return globalSql.ciuSqlPool;
  }

  if (globalSql.ciuSqlConnecting) {
    return globalSql.ciuSqlConnecting;
  }

  globalSql.ciuSqlConnecting = (async () => {
    if (globalSql.ciuSqlPool) {
      await closeSqlPool();
    }
    const connected = await connectPool();
    globalSql.ciuSqlPool = connected;
    return connected;
  })().finally(() => {
    globalSql.ciuSqlConnecting = undefined;
  });

  return globalSql.ciuSqlConnecting;
}

export async function withSqlRetry<T>(run: (pool: sql.ConnectionPool) => Promise<T>) {
  try {
    return await run(await getSqlPool());
  } catch (error) {
    if (!isSqlConnectivityError(error)) throw error;
    await closeSqlPool();
    return run(await getSqlPool());
  }
}

export { sql };

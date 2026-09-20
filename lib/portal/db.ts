import { DefaultAzureCredential } from "@azure/identity";
import sql from "mssql";
import { sqlDatabase, sqlEncrypt, sqlPort, sqlServer } from "@/lib/portal/env";

const AZURE_SQL_SCOPE = "https://database.windows.net/.default";
const TOKEN_REFRESH_MS = 5 * 60 * 1000;

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
    options: {
      encrypt: sqlEncrypt(),
      trustServerCertificate: false,
      enableArithAbort: true,
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

async function closePool() {
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

export async function getSqlPool() {
  if (globalSql.ciuSqlPool?.connected && !tokenNeedsRefresh()) {
    return globalSql.ciuSqlPool;
  }

  if (globalSql.ciuSqlConnecting) {
    return globalSql.ciuSqlConnecting;
  }

  globalSql.ciuSqlConnecting = (async () => {
    if (globalSql.ciuSqlPool) {
      await closePool();
    }
    const pool = new sql.ConnectionPool(await sqlConfig());
    const connected = await pool.connect();
    globalSql.ciuSqlPool = connected;
    return connected;
  })().finally(() => {
    globalSql.ciuSqlConnecting = undefined;
  });

  return globalSql.ciuSqlConnecting;
}

export { sql };

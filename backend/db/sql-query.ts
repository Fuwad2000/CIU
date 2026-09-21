import sql from "mssql";
import { withSqlRetry } from "@backend/db/db";

type Bind = (request: sql.Request) => void;

export async function query<T extends object>(text: string, bind?: Bind) {
  return withSqlRetry(async (pool) => {
    const request = pool.request();
    bind?.(request);
    const result = await request.query<T>(text);
    return result.recordset;
  });
}

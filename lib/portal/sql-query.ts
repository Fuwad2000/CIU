import sql from "mssql";
import { getSqlPool } from "@/lib/portal/db";

type Bind = (request: sql.Request) => void;

export async function query<T extends object>(text: string, bind?: Bind) {
  const pool = await getSqlPool();
  const request = pool.request();
  bind?.(request);
  const result = await request.query<T>(text);
  return result.recordset;
}

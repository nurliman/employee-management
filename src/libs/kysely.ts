import type { Generated, ColumnType, Kysely } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";
import { env } from "@/env.mjs";

type EmployeeTable = {
  id: Generated<number>;
  name: string;
  email: string;
  department_id: number;
  createdAt: ColumnType<Date, string | undefined, never>;
};

type DepartmentTable = {
  id: Generated<number>;
  name: string;
  createdAt: ColumnType<Date, string | undefined, never>;
};

export type Database = {
  employee: EmployeeTable;
  department: DepartmentTable;
};

let db: Kysely<Database>;

db = createKysely({
  connectionString: env.POSTGRES_URL,
});

export { db };
export { sql } from "kysely";

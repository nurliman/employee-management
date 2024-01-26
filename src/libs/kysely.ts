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

if (!process.env.VERCEL_ENV) {
  // @ts-expect-error
  const dialect = new (await import("kysely-postgres-js")).PostgresJSDialect({
    // @ts-expect-error
    postgres: (await import("postgres")).default(env.POSTGRES_URL),
  });

  // @ts-expect-error
  db = new (await import("kysely")).Kysely({
    dialect,
  });
} else {
  db = createKysely();
}

export { db };
export { sql } from "kysely";

import { type Kysely, sql } from "kysely";
import { type Database } from "@/libs/kysely";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("department")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("employee")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("department_id", "integer", (col) =>
      col.references("department.id").onDelete("cascade").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("employee_department_id_index")
    .on("employee")
    .column("department_id")
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("employee").execute();
  await db.schema.dropTable("department").execute();
}

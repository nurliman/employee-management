import { NextResponse, type NextRequest } from "next/server";
import { addEmployeeSchema } from "@/schemas";
import { db } from "@/libs/kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const employees = await db
      .selectFrom("employee")
      .selectAll("employee")
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom("department")
            .selectAll("department")
            .whereRef("department.id", "=", "employee.department_id")
        ).as("departments"),
      ])
      .execute();

    return NextResponse.json({ data: employees });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodyJson = await request.json();

    const validationResult = addEmployeeSchema.safeParse(bodyJson);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: validationResult.error.message,
        },
        {
          status: 400,
        }
      );
    }

    // check email uniqueness
    const existingEmailEmployee = await db
      .selectFrom("employee")
      .select("employee.id")
      .where("employee.email", "=", validationResult.data.email)
      .executeTakeFirst();

    if (existingEmailEmployee) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // check department existence
    const existingDepartment = await db
      .selectFrom("department")
      .select("department.id")
      .where("department.id", "=", validationResult.data.department_id)
      .executeTakeFirst();

    if (!existingDepartment) {
      return NextResponse.json(
        {
          message: "Department does not exist",
        },
        {
          status: 400,
        }
      );
    }

    const insertResult = await db
      .insertInto("employee")
      .values(validationResult.data)
      .executeTakeFirst();

    return NextResponse.json({
      message: "Employee added",
      data: insertResult.insertId,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

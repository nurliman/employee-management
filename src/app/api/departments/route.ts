import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/libs/kysely";
import { addDepartmentSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  try {
    const departments = await db.selectFrom("department").selectAll().execute();
    return NextResponse.json({ data: departments });
  } catch (error) {
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

    const validationResult = addDepartmentSchema.safeParse(bodyJson);

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

    const insertResult = await db
      .insertInto("department")
      .values(validationResult.data)
      .executeTakeFirst();

    return NextResponse.json(
      {
        message: "Department added successfully",
        data: insertResult.insertId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
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

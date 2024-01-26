import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/libs/kysely";

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

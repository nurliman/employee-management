import { Card, Title, Text } from "@tremor/react";
import { db } from "@/libs/kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import EmployeeTable from "@/components/EmployeeTable";

export default async function IndexPage() {
  const data = await db
    .selectFrom("employee")
    .selectAll("employee")
    .select((eb) => [
      // pets
      jsonArrayFrom(
        eb
          .selectFrom("department")
          .selectAll("department")
          .whereRef("department.id", "=", "employee.department_id")
      ).as("departments"),
    ])
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Employee Management System</Title>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis
        urna nisl. Nullam augue quam, tempus a fermentum et, ultricies nec
        turpis. Mauris vel est a enim scelerisque facilisis ac sed ex. Vivamus
        et velit augue. Aenean id eros quis est eleifend consequat. Nullam
        mattis augue vel imperdiet dapibus. Maecenas a ultrices nibh. Aliquam ut
        ligula eu nulla laoreet efficitur. Curabitur eros turpis, placerat at
        ante ut, venenatis vehicula orci.
      </Text>
      <Card className="mt-6">
        <EmployeeTable data={data} />
      </Card>
    </main>
  );
}

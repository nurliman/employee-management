"use client";

import { Card, Title, Text } from "@tremor/react";
import useSWR from "swr";
import EmployeeTable from "@/components/EmployeeTable";
import EmployeeAdd from "@/components/EmployeeAdd";
import Spinner from "@/components/Spinner";

export default function IndexPage() {
  const { data: employees = [], isLoading: isLoadingEmployees } =
    useSWR("/api/employees");

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
      <div className="flex flex-row mt-3 space-x-2">
        <EmployeeAdd />
      </div>
      <Card className="mt-6">
        {isLoadingEmployees ? (
          <div className="flex items-center justify-center">
            <Spinner className="!h-[50px] !w-[50px] !border-[7px]" />
          </div>
        ) : (
          <EmployeeTable data={employees} />
        )}
      </Card>
    </main>
  );
}

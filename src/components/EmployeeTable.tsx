import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";

export type EmployeeTableProps = {
  data: any[];
};

export default function EmployeeTable({ data = [] }: EmployeeTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map?.((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>
              <Text>{employee.email}</Text>
            </TableCell>
            <TableCell>
              <Text>{employee.departments?.[0]?.name}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

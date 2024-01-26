import { z } from "zod";

export const addEmployeeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  department_id: z.number().int().positive(),
});

export const addDepartmentSchema = z.object({
  name: z.string().min(1),
});

export type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>;

export type AddDepartmentSchema = z.infer<typeof addDepartmentSchema>;

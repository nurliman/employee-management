import { z } from "zod";

export const addEmployeeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  department_id: z.number().int().positive(),
});

export type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>;

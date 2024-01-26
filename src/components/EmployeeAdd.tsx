"use client";

import useSWR, { useSWRConfig } from "swr";
import { ofetch } from "ofetch";
import { useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEmployeeSchema, type AddEmployeeSchema } from "@/schemas";

import {
  Button,
  Dialog,
  DialogPanel,
  Title,
  Text,
  TextInput,
  Select,
  SelectItem,
} from "@tremor/react";

export default function EmployeeAdd() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();

  const { data: departments = [], isLoading: isLoadingDepartments } =
    useSWR("/api/departments");

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
    control,
  } = useForm<AddEmployeeSchema>({
    resolver: zodResolver(addEmployeeSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await ofetch("/api/employees", {
        method: "POST",
        body: data,
      });

      toast.success("Employee added successfully.");
      mutate("/api/employees");
      reset();
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || "An error occurred, please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Employee</Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Add Employee</Title>
          <form
            className="relative mt-3 flex h-[300px] flex-col space-y-4 overflow-y-auto"
            onSubmit={onSubmit}
          >
            <div className="space-y-2">
              <Text>Name</Text>
              <TextInput
                placeholder="Name"
                {...register("name")}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message?.toString()}
              />
            </div>
            <div className="space-y-2">
              <Text>Email</Text>
              <TextInput
                placeholder="Email"
                {...register("email")}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message?.toString()}
              />
            </div>
            <div className="space-y-2">
              <Text>Department</Text>
              <Controller
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    ref={ref}
                    enableClear={false}
                    value={value as any}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    disabled={isLoadingDepartments}
                  >
                    {departments?.map?.((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                name="department_id"
                control={control}
              />
              {errors.department_id?.message ? (
                <Text className="text-red-500">
                  {errors.department_id?.message}
                </Text>
              ) : null}
            </div>
            <div className="flex-1" />
            <div className="flex flex-row space-x-4">
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting || isLoadingDepartments}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="light"
                disabled={isSubmitting}
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}

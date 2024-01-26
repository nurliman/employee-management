"use client";

import { ofetch } from "ofetch";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { addDepartmentSchema, type AddDepartmentSchema } from "@/schemas";
import {
  Button,
  Dialog,
  DialogPanel,
  TextInput,
  Title,
  Text,
} from "@tremor/react";

export default function DepartmentAdd() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<AddDepartmentSchema>({
    resolver: zodResolver(addDepartmentSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await ofetch("/api/departments", {
        method: "POST",
        body: data,
      });

      toast.success("Employee added successfully.");
      mutate("/api/departments");
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
      <Button onClick={() => setIsOpen(true)}>Add Department</Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Add Employee</Title>
          <form
            className="relative mt-3 flex h-[150px] flex-col space-y-4 overflow-y-auto"
            onSubmit={onSubmit}
          >
            <div className="space-y-2">
              <Text>Department Name</Text>
              <TextInput
                placeholder="Department Name"
                {...register("name")}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message?.toString()}
              />
            </div>

            <div className="flex-1" />
            <div className="flex flex-row space-x-4">
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
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

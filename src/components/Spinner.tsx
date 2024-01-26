import type { ComponentProps } from "react";
import { clsx } from "clsx";

export type SpinnerProps = ComponentProps<"div"> & {};

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      {...props}
      className={clsx(
        "inline-block border border-solid rounded-full animate-spin",
        "border-blue-100 border-t-blue-600",
        "h-6 w-6 border-4",
        className
      )}
    />
  );
}

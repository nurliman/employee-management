import Spinner from "@/components/Spinner";

export default function SpinnerPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Spinner className="!h-[75px] !w-[75px] !border-[10px]" />
    </div>
  );
}

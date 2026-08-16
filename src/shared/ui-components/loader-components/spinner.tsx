import { Loader2Icon } from "lucide-react";

import { cn } from "@/shared/utils/cn";

type SpinnerProps = React.ComponentProps<"svg">;

const Spinner = ({ className, ...props }: Readonly<SpinnerProps>) => {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
};

export default Spinner;

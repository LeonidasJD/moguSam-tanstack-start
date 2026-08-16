import { Loader } from "lucide-react";

type SpinnerProps = {
  size?: number;
  color?: string;
};

const Spinner = ({ size = 12, color = "black" }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <Loader className={`w-${size} h-${size} text-${color} animate-spin`} />
    </div>
  );
};

export default Spinner;

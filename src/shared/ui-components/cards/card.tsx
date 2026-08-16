import { cn } from "@/shared/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("bg-white rounded-lg p-4 shadow-md", className)}>
      {children}
    </div>
  );
};

export default Card;

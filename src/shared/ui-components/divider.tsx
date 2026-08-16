import { cn, tv, type VariantProps } from "tailwind-variants";

const varaiants = tv({
  base: "p-px",
  variants: {
    variant: {
      primary: "bg-gold",
      light: "bg-white",
      dark: "bg-black",
      neutral: "bg-neutral",
    },
    position: {
      horizontal: "w-full h-0.5",
      vertical: "h-10 w-px",
    },
  },
  defaultVariants: {
    variant: "light",
    position: "horizontal",
  },
});
interface DividerProps extends VariantProps<typeof varaiants> {
  className?: string;
}

const Divider = ({ variant, position, className }: DividerProps) => {
  return (
    <div className={cn(varaiants({ variant, position }), className)}></div>
  );
};

export default Divider;

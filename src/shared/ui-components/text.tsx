import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

import { tv, type VariantProps } from "@/shared/utils/cn";

const textVariants = tv({
  base: "",
  variants: {
    variant: {
      heading: "text-xl md:text-2xl leading-none",
      subheading: "text-lg md:text-xl leading-none",
      paragraph: "text-sm md:text-base leading-none",
      small: "text-xs md:text-sm leading-none",
    },
    color: {
      black: "text-black",
      "brown-dark": "text-brown-dark",
      gold: "text-gold",
      "light-black": "text-light-black",
      brown: "text-brown",
      error: "text-error",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    type: "paragraph",
    color: "black",
    weight: "normal",
  },
});

type TextVariants = VariantProps<typeof textVariants>;

type TextProps = TextVariants &
  Omit<useRender.ComponentProps<"p">, "className"> & {
    className?: string;
  };

const Text = ({
  variant = "paragraph",
  color = "black",
  weight = "normal",
  className,
  render,
  ...otherProps
}: TextProps) => {
  const element = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      { className: textVariants({ variant, color, weight, class: className }) },
      otherProps,
    ),
  });

  return element;
};

export default Text;
export type { TextProps, TextVariants };

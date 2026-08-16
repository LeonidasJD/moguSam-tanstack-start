import type { ReactNode } from "react";
import { Button as ButtonBase } from "@base-ui/react/button";
import type { ButtonProps as ButtonBaseProps } from "@base-ui/react/button";

import { tv, type VariantProps } from "@/shared/utils/cn";

const buttonVariants = tv({
  slots: {
    base: "inline-flex items-center justify-center font-semibold tracking-[0.01em] transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
    icon: "shrink-0 [&_svg]:size-full",
  },
  variants: {
    variant: {
      primary:
        "bg-gold text-white shadow-[0px_8px_24px_rgba(245,158,11,0.2)] hover:bg-gold/90 hover:shadow-[0px_8px_24px_rgba(245,158,11,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
      secondary:
        "bg-white text-black border-2 border-light-brown hover:bg-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2",
      outlined:
        "bg-white/0 text-black border-2 border-black hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
      inverted:
        "bg-light-black text-white hover:bg-light-black/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2",
      link: "bg-transparent text-gold hover:text-black/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2",
    },
    shape: {
      text: "rounded-xl",
      labeledIcon: "rounded-xl",
      round: "rounded-full",
    },
    size: {
      small: {
        icon: "size-3.5",
      },
      normal: {
        icon: "size-4",
      },
    },
  },
  compoundVariants: [
    {
      shape: "text",
      size: "small",
      class: { base: "h-8 px-3 text-sm" },
    },
    {
      shape: "text",
      size: "normal",
      class: { base: "h-12 px-4 text-sm" },
    },
    {
      shape: "labeledIcon",
      size: "small",
      class: { base: "h-8 px-3 text-sm gap-1.5" },
    },
    {
      shape: "labeledIcon",
      size: "normal",
      class: { base: "h-12 px-4 text-sm gap-2" },
    },
    {
      shape: "round",
      size: "small",
      class: { base: "size-10", icon: "size-4" },
    },
    {
      shape: "round",
      size: "normal",
      class: { base: "size-12", icon: "size-5" },
    },
    {
      variant: "link",
      size: "small",
      class: { base: "h-8 px-3 text-sm" },
    },
    {
      variant: "link",
      size: "normal",
      class: { base: "h-12 px-4 text-sm" },
    },
  ],
  defaultVariants: {
    variant: "primary",
    shape: "text",
    size: "normal",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonVariants &
  Omit<ButtonBaseProps, "className"> & {
    className?: string;
    icon?: ReactNode;
    iconPosition?: "start" | "end";
  };

const Button = ({
  variant,
  size,
  shape,
  icon,
  iconPosition = "start",
  className,
  children,
  ...props
}: Readonly<ButtonProps>) => {
  const resolvedShape =
    shape === "round"
      ? "round"
      : icon != null
        ? "labeledIcon"
        : (shape ?? "text");

  const { base, icon: iconSlot } = buttonVariants({
    variant,
    size,
    shape: resolvedShape,
  });
  const isRound = resolvedShape === "round";
  const iconNode = isRound ? (children ?? icon) : icon;

  return (
    <ButtonBase className={base({ class: className })} {...props}>
      {isRound ? (
        <span className={iconSlot()}>{iconNode}</span>
      ) : (
        <>
          {iconNode && iconPosition === "start" ? (
            <span className={iconSlot()} aria-hidden>
              {iconNode}
            </span>
          ) : null}
          {children}
          {iconNode && iconPosition === "end" ? (
            <span className={iconSlot()} aria-hidden>
              {iconNode}
            </span>
          ) : null}
        </>
      )}
    </ButtonBase>
  );
};

export default Button;
export type { ButtonProps, ButtonVariants };

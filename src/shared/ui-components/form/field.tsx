import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Field } from "@base-ui/react/field";

import { cn, tv, type VariantProps } from "@/shared/utils/cn";

export const FieldRoot = ({ className, ...props }: Field.Root.Props) => {
  return (
    <Field.Root {...props} className={cn("flex flex-col gap-2", className)} />
  );
};

export const FieldLabel = ({ className, ...props }: Field.Label.Props) => {
  return (
    <Field.Label
      {...props}
      className={cn(
        "text-sm font-semibold leading-5 tracking-[0.01em] text-black",
        className,
      )}
    />
  );
};

export const FieldControl = ({ className, ...props }: Field.Control.Props) => {
  return (
    <Field.Control
      {...props}
      className={cn(
        "h-14 w-full rounded-xl border border-light-brown bg-white px-4 text-base text-black outline-none transition-colors duration-200 placeholder:text-brown data-focused:border-gold disabled:opacity-50",
        className,
      )}
    />
  );
};

export const FieldError = ({ className, ...props }: Field.Error.Props) => {
  return (
    <Field.Error {...props} className={cn("text-sm text-error", className)} />
  );
};

export const FieldDescription = ({
  className,
  ...props
}: Field.Description.Props) => {
  return (
    <Field.Description
      {...props}
      className={cn("text-sm text-brown-dark", className)}
    />
  );
};

const leadingIcons = {
  text: User,
  email: Mail,
  password: Lock,
} as const;

const inputVariants = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "text-sm font-semibold leading-5 tracking-[0.01em] text-black",
    controlWrapper: "relative",
    icon: "pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brown-dark",
    control: "",
    visibilityButton:
      "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-brown-dark transition-colors hover:text-black",
    error: "text-sm text-error",
    description: "text-sm text-brown-dark",
  },
  variants: {
    type: {
      text: {},
      email: {},
      password: {},
    },
    icon: {
      true: {
        control: "pl-12 pr-4",
      },
      false: {
        control: "px-4",
      },
    },
  },
  compoundVariants: [
    {
      type: "password",
      icon: true,
      class: { control: "pl-12 pr-12" },
    },
    {
      type: "password",
      icon: false,
      class: { control: "pl-4 pr-12" },
    },
  ],
  defaultVariants: {
    type: "text",
    icon: false,
  },
});

type InputVariants = VariantProps<typeof inputVariants>;

type InputProps = InputVariants &
  Omit<Field.Control.Props, "className" | "type"> & {
    label: string;
    error?: string;
    description?: string;
    icon?: boolean;
    type?: "text" | "email" | "password";
    className?: string;
  };

export const Input = ({
  label,
  error,
  required = false,
  description,
  icon = false,
  type = "text",
  className,
  placeholder,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;
  const LeadingIcon = leadingIcons[type];
  const styles = inputVariants({ type, icon });

  return (
    <FieldRoot invalid={!!error} className={styles.root()}>
      <FieldLabel className={styles.label()}>
        {label} {required ? <span className="text-gold">*</span> : null}
      </FieldLabel>
      <div className={styles.controlWrapper()}>
        {icon ? <LeadingIcon className={styles.icon()} aria-hidden /> : null}
        <FieldControl
          type={inputType}
          placeholder={placeholder}
          className={styles.control({ class: className })}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            className={styles.visibilityButton()}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={
              isPasswordVisible ? "Sakrij lozinku" : "Prikaži lozinku"
            }
          >
            {isPasswordVisible ? (
              <EyeOff className="size-5" aria-hidden />
            ) : (
              <Eye className="size-5" aria-hidden />
            )}
          </button>
        ) : null}
      </div>
      <FieldError match={!!error} className={styles.error()}>
        {error}
      </FieldError>
      {description ? (
        <FieldDescription className={styles.description()}>
          {description}
        </FieldDescription>
      ) : null}
    </FieldRoot>
  );
};

export type { InputVariants };

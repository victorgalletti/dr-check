import React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", icon, error, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-medical-text-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-medical-text-muted">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-lg border border-medical-border bg-medical-surface px-3 py-2 text-medical-text ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-medical-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dr-green focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              icon && "pl-10",
              error && "border-dr-red focus-visible:ring-dr-red",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-dr-red">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;

import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", checked, ...props }, ref) => (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <span className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-background checked:bg-primary checked:border-primary"
          {...props}
        />
        <span className="absolute left-0 top-0 h-4 w-4 flex items-center justify-center pointer-events-none">
          {checked ? (
            <svg
              className="h-3 w-3 text-primary-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : null}
        </span>
      </span>
    </label>
  )
);
Checkbox.displayName = "Checkbox";

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "medical"
    | "medical-outline"
    | "medical-ghost"
    | "medical-secondary"
    | "google";
  size?: "default" | "sm" | "lg" | "icon" | "full";
}

const variantClasses: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  medical:
    "bg-dr-green text-medical-dark hover:bg-dr-green-hover shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
  "medical-outline":
    "border-2 border-dr-green text-dr-green bg-transparent hover:bg-dr-green hover:text-medical-dark",
  "medical-ghost":
    "text-dr-green hover:bg-dr-green/10 hover:text-dr-green-hover",
  "medical-secondary":
    "bg-medical-surface text-medical-text border border-medical-border hover:bg-medical-border/50",
  google:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md",
};

const sizeClasses: Record<string, string> = {
  default: "h-12 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-14 rounded-xl px-8 text-base font-semibold",
  icon: "h-10 w-10",
  full: "h-12 w-full px-4 py-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
    return (
      <button
        ref={ref}
        className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

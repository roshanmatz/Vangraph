"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "bg-vg-surface text-foreground",
        primary: "bg-vg-primary/20 text-vg-primary",
        success: "bg-vg-success/20 text-vg-success",
        warning: "bg-vg-warning/20 text-vg-warning",
        danger: "bg-vg-danger/20 text-vg-danger",
        purple: "bg-vg-purple/20 text-vg-purple",
        outline: "border border-border bg-transparent text-muted-foreground",
      },
      size: {
        default: "px-2 py-0.5 text-[10px]",
        sm: "px-1.5 py-0.5 text-[8px]",
        lg: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

// Status dot component
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "active" | "idle" | "reviewing" | "error";
}

const statusDotColors = {
  active: "bg-vg-success",
  idle: "bg-muted-foreground",
  reviewing: "bg-vg-warning",
  error: "bg-vg-danger",
};

export function StatusDot({ status, className, ...props }: StatusDotProps) {
  return (
    <span
      className={cn(
        "w-2 h-2 rounded-full inline-block",
        statusDotColors[status],
        className
      )}
      {...props}
    />
  );
}

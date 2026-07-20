import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-base-border bg-white/5 text-ink-muted",
        indigo: "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
        cyan: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
        emerald: "border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald",
        amber: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

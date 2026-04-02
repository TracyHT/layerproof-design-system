import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // ── Neutral hierarchy ──────────────────────────────────────────────────────
        default:
          "bg-[var(--neutral-surface-default)] text-[var(--neutral-text-on-color)] hover:bg-[var(--neutral-surface-dark)] focus-visible:ring-[var(--neutral-surface-default)]/20",
        secondary:
          "bg-[var(--neutral-surface-surface)] text-[var(--neutral-text-secondary)] hover:bg-[var(--neutral-surface-lighter)] focus-visible:ring-[var(--neutral-surface-default)]/20",
        outline:
          "border border-[var(--neutral-divider-default)] bg-transparent text-[var(--neutral-text-secondary)] hover:bg-[var(--neutral-surface-disable)] focus-visible:ring-[var(--neutral-surface-default)]/20",
        ghost:
          "bg-transparent text-[var(--neutral-text-secondary)] hover:bg-[var(--neutral-surface-disable)]",
        link: "bg-transparent text-[var(--neutral-text-secondary)] underline-offset-4 hover:underline",

        // ── Accent hierarchy ───────────────────────────────────────────────────────
        accent:
          "bg-[var(--accent-surface-default)] text-[var(--accent-text-on-color)] hover:bg-[var(--accent-surface-btn-hover)] focus-visible:ring-[var(--accent-surface-default)]/50",
        "accent-secondary":
          "bg-[var(--accent-surface-surface)] text-[var(--accent-text-default)] hover:bg-[var(--accent-surface-light)] focus-visible:ring-[var(--accent-surface-default)]/30",
        "accent-ghost":
          "bg-transparent text-[var(--accent-text-default)] hover:bg-[var(--accent-surface-surface)]",
        "accent-outline":
          "border border-[var(--accent-divider-default)] bg-transparent text-[var(--accent-text-default)] hover:bg-[var(--accent-surface-surface)] focus-visible:ring-[var(--accent-surface-default)]/30",
        "accent-link":
          "bg-transparent text-[var(--accent-text-default)] underline-offset-4 hover:underline",

        // ── Danger hierarchy ───────────────────────────────────────────────────────
        destructive:
          "bg-[var(--danger-default)] text-[var(--neutral-text-on-color)] hover:bg-[var(--danger-dark)] focus-visible:ring-[var(--danger-default)]/30",
        "destructive-secondary":
          "bg-[var(--danger-surface)] text-[var(--danger-default)] hover:bg-[var(--danger-light)] focus-visible:ring-[var(--danger-default)]/20",
        "destructive-outline":
          "border border-[var(--danger-default)] bg-transparent text-[var(--danger-default)] hover:bg-[var(--danger-surface)] focus-visible:ring-[var(--danger-default)]/20",
        "destructive-ghost":
          "bg-transparent text-[var(--danger-default)] hover:bg-[var(--danger-surface)]",
        "destructive-link":
          "bg-transparent text-[var(--danger-default)] underline-offset-4 hover:underline",

        // ── Preserved ─────────────────────────────────────────────────────────────
        neutral:
          "bg-[var(--neutral-surface-disable)] text-[var(--neutral-text-secondary)] hover:bg-[var(--neutral-surface-lighter)] focus-visible:ring-[var(--neutral-surface-default)]/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

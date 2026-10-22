import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Token mapping follows Figma "Semantic Color V2" (action/*, accent/*, button/*).
        // ── Neutral hierarchy ──────────────────────────────────────────────────────
        default:
          "bg-[var(--action-neutral-background-default)] text-[var(--foreground-inverse)] hover:bg-[var(--action-neutral-background-hover)] active:bg-[var(--action-neutral-background-pressed)] focus-visible:ring-[var(--border-focus)]/50",
        secondary:
          "bg-[var(--action-secondary-background-default)] text-[var(--action-secondary-foreground)] hover:bg-[var(--action-secondary-background-hover)] focus-visible:ring-[var(--action-secondary-focus)]/50",
        outline:
          "border border-[var(--action-secondary-border)] bg-transparent text-[var(--action-secondary-foreground)] hover:bg-[var(--action-tertiary-background-hover)] focus-visible:ring-[var(--action-secondary-focus)]/50",
        ghost:
          "bg-transparent text-[var(--action-tertiary-foreground-default)] hover:bg-[var(--action-tertiary-background-hover)] hover:text-[var(--action-tertiary-foreground-hover)] focus-visible:ring-[var(--action-tertiary-focus)]/50",
        link: "bg-transparent text-[var(--action-tertiary-foreground-default)] underline-offset-4 hover:underline hover:text-[var(--action-tertiary-foreground-hover)]",

        // ── Accent hierarchy ───────────────────────────────────────────────────────
        accent:
          "bg-[var(--action-primary-background-default)] text-[var(--button-accent-primary-foreground)] hover:bg-[var(--action-primary-background-hover)] active:bg-[var(--action-primary-background-pressed)] focus-visible:ring-[var(--action-primary-focus)]/50",
        "accent-secondary":
          "bg-[var(--accent-background-subtle)] text-[var(--accent-foreground-default)] hover:bg-[var(--accent-background-selected)] focus-visible:ring-[var(--accent-focus-ring)]/40",
        "accent-ghost":
          "bg-transparent text-[var(--accent-foreground-default)] hover:bg-[var(--accent-background-subtle)] focus-visible:ring-[var(--accent-focus-ring)]/40",
        "accent-outline":
          "border border-[var(--accent-border-default)] bg-transparent text-[var(--accent-foreground-default)] hover:bg-[var(--accent-background-subtle)] focus-visible:ring-[var(--accent-focus-ring)]/40",
        "accent-link":
          "bg-transparent text-[var(--accent-foreground-default)] underline-offset-4 hover:underline",

        // ── Danger hierarchy ───────────────────────────────────────────────────────
        destructive:
          "bg-[var(--button-danger-primary-background-default)] text-[var(--button-danger-primary-foreground)] hover:bg-[var(--button-danger-primary-background-hover)] focus-visible:ring-[var(--button-danger-border)]",
        "destructive-secondary":
          "bg-[var(--button-danger-secondary-background-default)] text-[var(--button-danger-secondary-foreground)] hover:bg-[var(--button-danger-secondary-background-hover)] focus-visible:ring-[var(--button-danger-border)]",
        "destructive-outline":
          "border border-[var(--button-danger-border)] bg-transparent text-[var(--button-danger-outline-foreground)] hover:bg-[var(--button-danger-outline-background-hover)] focus-visible:ring-[var(--button-danger-border)]",
        "destructive-ghost":
          "bg-transparent text-[var(--button-danger-tertiary-foreground)] hover:bg-[var(--button-danger-tertiary-background-hover)]",
        "destructive-link":
          "bg-transparent text-[var(--button-danger-tertiary-foreground)] underline-offset-4 hover:underline",

        // ── Preserved ─────────────────────────────────────────────────────────────
        neutral:
          "bg-[var(--background-subtle)] text-[var(--foreground-secondary)] hover:bg-[var(--background-muted)] focus-visible:ring-[var(--border-focus)]/50",
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

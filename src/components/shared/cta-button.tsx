"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ctaClass =
  "h-12 rounded-none px-7 text-[11px] font-medium tracking-[0.22em] uppercase";

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "outlineLight";
  className?: string;
  onClick?: () => void;
}) {
  const variantClass = {
    primary: "bg-foreground text-background hover:bg-foreground/88",
    outline:
      "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground hover:text-background",
    light: "bg-background text-foreground hover:bg-background/90",
    outlineLight:
      "border border-white/40 bg-transparent text-white hover:bg-white hover:text-foreground",
  }[variant];

  return (
    <a
      href={href}
      onClick={(event) => {
        if (href.startsWith("#")) {
          const target = document.getElementById(href.slice(1));
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", href);
          }
        }
        onClick?.();
      }}
      className={cn(
        buttonVariants({ variant: "default" }),
        ctaClass,
        variantClass,
        className
      )}
    >
      {children}
    </a>
  );
}

export function CtaButton({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "outlineLight";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const variantClass = {
    primary: "bg-foreground text-background hover:bg-foreground/88",
    outline:
      "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground hover:text-background",
    light: "bg-background text-foreground hover:bg-background/90",
    outlineLight:
      "border border-white/40 bg-transparent text-white hover:bg-white hover:text-foreground",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant: "default" }),
        ctaClass,
        variantClass,
        "disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

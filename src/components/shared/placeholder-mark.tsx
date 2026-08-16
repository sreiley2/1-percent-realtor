import { cn } from "@/lib/utils";

export function PlaceholderMark({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-dashed border-stone/70 bg-stone/10 px-2 py-0.5 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}

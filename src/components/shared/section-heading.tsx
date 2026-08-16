import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", light && "text-white/55")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display-title text-4xl sm:text-5xl lg:text-[3.5rem]",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
            align === "center" && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

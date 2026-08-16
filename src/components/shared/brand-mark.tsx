import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  inverted = false,
  priority = false,
}: {
  inverted?: boolean;
  priority?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/brand/logo.png"
        alt=""
        width={96}
        height={96}
        quality={100}
        unoptimized
        sizes="48px"
        className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        priority={priority}
      />
      <span
        className={cn(
          "flex items-baseline gap-2",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        <span className="font-display text-[1.65rem] leading-none italic">1%</span>
        <span className="text-[11px] font-medium tracking-[0.32em] uppercase">
          Realtor
        </span>
      </span>
    </span>
  );
}

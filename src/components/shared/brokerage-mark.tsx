"use client";

import Image from "next/image";
import { site } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function BrokerageMark({
  className,
}: {
  className?: string;
}) {
  const { logo, name } = site.brokerage;

  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      quality={100}
      unoptimized
      className={cn("h-auto w-24 sm:w-28", className)}
    />
  );
}

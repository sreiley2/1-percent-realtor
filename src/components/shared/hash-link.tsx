"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export function HashLink({
  href,
  className,
  children,
  onClick,
  ...props
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "className">) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) {
      onClick?.();
      return;
    }

    const hash = href.slice(hashIndex);
    const onHome = window.location.pathname === "/";

    if (!onHome) {
      onClick?.();
      return;
    }

    const target = document.getElementById(hash.slice(1));
    if (!target) {
      onClick?.();
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", hash);
    onClick?.();
  }

  const resolvedHref = href.startsWith("#") ? `/${href}` : href;

  return (
    <a href={resolvedHref} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

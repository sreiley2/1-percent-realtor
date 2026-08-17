import { NextResponse, type NextRequest } from "next/server";

const homepageSections = ["buy", "sell", "about", "faq", "contact"] as const;

export function proxy(request: NextRequest) {
  const section = request.nextUrl.pathname.slice(1);
  if (!homepageSections.includes(section as (typeof homepageSections)[number])) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.hash = section;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/buy", "/sell", "/about", "/faq", "/contact"],
};

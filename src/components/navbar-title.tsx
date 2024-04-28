"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function NavbarTitle() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div>
        <p className="sr-only">seeets</p>
      </div>
    );
  }

  return (
    <Link
      href="/"
      className="text-2xl font-extrabold tracking-tight lg:text-3xl"
    >
      seeets
    </Link>
  );
}

export { NavbarTitle };

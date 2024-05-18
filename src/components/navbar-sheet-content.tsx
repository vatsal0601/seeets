"use client";

import {
  Dumbbell,
  Home,
  LayoutDashboard,
  LogIn,
  Timer,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { SheetContent, SheetClose } from "./ui/sheet";

export default function NavbarSheetContent({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <SheetContent>
      <nav className="grid gap-2 text-lg font-medium">
        <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <Dumbbell className="size-6" />
          <span className="sr-only">seeets homepage</span>
        </div>
        <SheetClose asChild>
          <Link
            href="/"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/" && "bg-muted text-foreground",
            )}
          >
            <Home className="size-5" />
            home
          </Link>
        </SheetClose>
        {isLoggedIn ? (
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/dashboard" && "bg-muted text-foreground",
              )}
            >
              <LayoutDashboard className="size-5" />
              dashboard
            </Link>
          </SheetClose>
        ) : null}
        <SheetClose asChild>
          <Link
            href="/interval-timer"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/interval-timer" && "bg-muted text-foreground",
            )}
          >
            <Timer className="size-5" />
            interval timer
          </Link>
        </SheetClose>
        {isLoggedIn ? (
          <SheetClose asChild>
            <Link
              href="/profile"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/profile" && "bg-muted text-foreground",
              )}
            >
              <UserRound className="size-5" />
              profile
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <Link
              href="/sign-in"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/sign-in" && "bg-muted text-foreground",
              )}
            >
              <LogIn className="size-5" />
              sign in
            </Link>
          </SheetClose>
        )}
      </nav>
    </SheetContent>
  );
}

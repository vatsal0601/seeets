import { Timer, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "~/components/theme-toggle";
import { Skeleton } from "~/components/ui/skeleton";
import { NavbarTitle } from "~/components/navbar-title";

function Navbar() {
  return (
    <nav className="absolute top-0 flex h-16 w-full items-center justify-between px-5 lg:px-10">
      <NavbarTitle />
      <ul className="flex items-center gap-3">
        <li>
          <Button
            variant="ghost"
            size="sm"
            className="hidden h-10 lg:inline-flex"
            asChild
          >
            <Link href="/interval-timer">interval timer</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" asChild>
            <Link href="/interval-timer">
              <Timer className="size-5" />
            </Link>
          </Button>
        </li>
        <li>
          <ClerkLoading>
            <Skeleton className="h-10 w-10 rounded-full" />
          </ClerkLoading>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "h-10 w-10 rounded-full",
                  userButtonAvatarBox: "h-10 w-10 rounded-full",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="hidden h-10 lg:inline-flex"
                >
                  login
                </Button>
                <Button variant="secondary" size="icon" className="lg:hidden">
                  <LogIn className="size-5" />
                </Button>
              </div>
            </SignInButton>
          </SignedOut>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };

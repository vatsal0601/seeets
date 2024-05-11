import { currentUser } from "@clerk/nextjs/server";
import { LogIn, Timer } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { NavbarTitle } from "~/components/navbar-title";
import { ThemeToggle } from "~/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { getUserInitials } from "~/lib/utils";

async function Navbar() {
  const user = await currentUser();

  const isLoggedIn = user !== null;

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
          <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
            {isLoggedIn ? (
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>
                    {getUserInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/sign-in">
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
              </Link>
            )}
          </Suspense>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };

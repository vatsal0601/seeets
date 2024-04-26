import { Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/10 backdrop-blur-[2px]">
      <div className="flex h-16 items-center justify-between px-5 lg:px-10">
        <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          seeets
        </h3>
        <ul className="flex items-center gap-3">
          <li>
            <Button size="sm" className="hidden h-10 lg:inline-flex" asChild>
              <Link href="/interval-timer">
                <Timer className="mr-1 size-[1.2rem]" />
                <span>interval timer</span>
              </Link>
            </Button>
            <Button size="icon" className="lg:hidden" asChild>
              <Link href="/interval-timer">
                <Timer className="size-[1.2rem]" />
              </Link>
            </Button>
          </li>
          <li className="size-10">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Navbar };

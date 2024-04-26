import { Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/10 p-3 backdrop-blur-[2px]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          seeets
        </h3>
        <ul className="flex items-center gap-3">
          <li>
            <Button size="sm" className="h-10" asChild>
              <Link href="/interval-timer">
                <Timer className="mr-1 size-[1.2rem]" />
                <span>interval timer</span>
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

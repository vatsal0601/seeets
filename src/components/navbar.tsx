import { auth } from "@clerk/nextjs/server";
import { PanelRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import NavbarSheetContent from "./navbar-sheet-content";

function Navbar() {
  const { userId } = auth();

  const isLoggedIn = userId !== null;

  return (
    <header className="absolute top-0 flex h-16 w-full items-center justify-end px-5 lg:px-10">
      <ul className="flex items-center gap-3">
        <li>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="secondary">
                <PanelRight className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <NavbarSheetContent isLoggedIn={isLoggedIn} />
          </Sheet>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  );
}

export { Navbar };

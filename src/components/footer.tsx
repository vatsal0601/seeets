import Link from "next/link";
import { Button } from "~/components/ui/button";

function Footer() {
  return (
    <footer className="flex h-16 items-center justify-between border-t px-5 lg:px-10">
      <p className="text-muted-foreground">
        <span>made by</span>
        <Link
          href="https://twitter.com/vatsal0601"
          className="ml-1 hover:underline hover:underline-offset-4"
        >
          vatsal
        </Link>
      </p>
      <Button variant="link" size="sm">
        share feedback
      </Button>
    </footer>
  );
}

export { Footer };

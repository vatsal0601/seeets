import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { cn } from "~/lib/utils";

export const metadata = {
  title: "seeets",
  description:
    "a free and open-source platform for tracking workouts and analyzing progress.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", GeistSans.variable, GeistMono.variable)}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}

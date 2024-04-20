import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Analytics } from "@vercel/analytics/react";

import { cn } from "~/lib/utils";

export const metadata = {
  title: "seeets",
  description:
    "a free and open-source platform for tracking workouts and analyzing progress.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["workout", "tracker", "progress", "analysis"],
  authors: [{ name: "Vatsal Sakariya", url: "https://twitter.com/vatsal0601" }],
  openGraph: {
    title: "seeets",
    description:
      "a free and open-source platform for tracking workouts and analyzing progress.",
    url: "https://seeets.vercel.app",
    type: "website",
    locale: "en_US",
    siteName: "seeets",
    images: [{ url: "https://seeets.vercel.app/og-image.png", alt: "seeets" }],
  },
  twitter: {
    title: "seeets",
    description:
      "a free and open-source platform for tracking workouts and analyzing progress.",
    creator: "@vatsal0601",
    site: "@vatsal0601",
    card: "summary_large_image",
    images: [{ url: "https://seeets.vercel.app/og-image.png", alt: "seeets" }],
    creatorId: "vatsal0601",
    siteId: "vatsal0601",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html
        lang="en"
        className={cn("h-full", GeistSans.variable, GeistMono.variable)}
      >
        <body className="h-full">{children}</body>
      </html>
      <Analytics />
    </>
  );
}

import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("min-h-svh", GeistSans.variable, GeistMono.variable)}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className="relative min-h-svh">
            <Navbar />
            {children}
            {modal}
            <Footer />
          </body>
        </ThemeProvider>
      </html>
      <Analytics />
    </ClerkProvider>
  );
}

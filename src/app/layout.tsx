import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { Shell } from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "CashTap AI | Premium Earning Accelerator",
  description: "Identify high-potential discussions and generate natural responses that convert.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CashTap AI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-sidebar="expanded">
      <body className="bg-page text-white selection:bg-accent/30">
        <SearchProvider>
          <Shell>
            {children}
          </Shell>
        </SearchProvider>
      </body>
    </html>
  );
}

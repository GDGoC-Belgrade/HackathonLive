import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavMenu from "./components/NavMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackathonLive",
  description: "HackathonLive app",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-md">
          <main className="p-4 pb-[calc(var(--nav-height)+env(safe-area-inset-bottom))]">{children}</main>
          <NavMenu/>
        </div>
      </body>
    </html>
  );
}

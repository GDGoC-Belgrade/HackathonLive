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
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh" >
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white shadow-md">
          <main className="min-w-0 flex-1 p-4 pb-[calc(var(--nav-height)+env(safe-area-inset-bottom)+1rem)]">{children}</main>
          <NavMenu/>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { StoreModal } from "@/components/modals/StoreModal";
import { ThemeProvider } from "@/components/ThemeProvider";
const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "CMS - ADMIN",
  description: "Content Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreModal />
          <Toaster position="top-center" theme="dark" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

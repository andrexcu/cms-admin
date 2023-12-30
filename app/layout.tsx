import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { StoreModal } from "@/components/modals/StoreModal";

const DM_sans = DM_Sans({ subsets: ["latin"], weight: "400" });

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
    <html lang="en">
      <body className={DM_sans.className}>
        <Toaster richColors position="top-center" />
        <StoreModal />
        {children}
      </body>
    </html>
  );
}

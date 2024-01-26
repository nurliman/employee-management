import type { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Employee Management System",
  description:
    "A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.",
};

export default function RootLayout({ children }: PropsWithChildren<object>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

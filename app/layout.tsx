// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kartik's Coding Steps",
  description: "Step-by-step notes for my coding YouTube videos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="bg-zinc-950 text-zinc-50">{children}</body>
    </html>
  );
}

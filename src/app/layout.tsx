import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thikana Logistics - Truck Booking Service",
  description: "Fast & Reliable Truck Booking Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
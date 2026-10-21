import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali, Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thikana Logistics — ট্রাক ও পিকআপ বুকিং সেবা | ৬৪ জেলা",
  description:
    "বাংলাদেশের যেকোন প্রান্তে ট্রাক ও পিকআপ বুকিং সেবা। ৭ থেকে ২৩ ফিট খোলা ও কাভার্ড গাড়ি, ন্যায্য ভাড়া, অভিজ্ঞ ড্রাইভার ও ২৪/৭ হটলাইন সাপোর্ট।",
  keywords: [
    "ট্রাক বুকিং",
    "ট্রাক ভাড়া",
    "পিকআপ বুকিং",
    "গাড়ি ভাড়া",
    "ঢাকা ট্রাক বুকিং",
    "Thikana Logistics",
  ],
  openGraph: {
    title: "Thikana Logistics — ট্রাক ও পিকআপ বুকিং সেবা",
    description:
      "দেশজুড়ে নিরাপদ ও নির্ভরযোগ্য ট্রাক পরিবহন সেবা। সহজ অনলাইন বুকিং, ন্যায্য ভাড়া।",
    type: "website",
    locale: "bn_BD",
    siteName: "Thikana Logistics",
  },
};

export const viewport: Viewport = {
  themeColor: "#eb601b",
  width: "device-width",
  initialScale: 1,
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${roboto.variable} ${notoBengali.variable} ${hindSiliguri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

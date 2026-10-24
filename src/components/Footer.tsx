import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTruckMoving,
  FaWhatsapp,
} from 'react-icons/fa';
import { siteConfig } from '@/lib/siteConfig';
import { CopyrightYear } from './ui/CopyrightYear';

const QUICK_LINKS = [
  { label: 'হোম', href: '#home' },
  { label: 'আমাদের সম্পর্কে', href: '#about-us' },
  { label: 'ট্রাকের ধরণ', href: '#truck-types' },
  { label: 'কিভাবে কাজ করে', href: '#how-work' },
  { label: 'রিভিউ', href: '#reviews' },
  { label: 'প্রশ্নোত্তর', href: '#faq' },
];

const ROUTES = [
  { label: 'ঢাকা → চট্টগ্রাম', href: '#booking-form' },
  { label: 'ঢাকা → সিলেট', href: '#booking-form' },
  { label: 'ঢাকা → রাজশাহী', href: '#booking-form' },
  { label: 'ঢাকা → খুলনা', href: '#booking-form' },
  { label: 'ঢাকা → বরিশাল', href: '#booking-form' },
  { label: 'চট্টগ্রাম → ঢাকা', href: '#booking-form' },
];

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-10 bg-[#2B3840] pb-8 pt-[130px] text-white">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
<div>
            <Link
              href="/"
              aria-label="Thikana Logistics Home"
              className="inline-flex items-center justify-center rounded-lg bg-white p-2.5 transition hover:bg-[#FFF3EC]"
            >
              <Image
                src="/images/logo.png"
                alt="Thikana Logistics Logo"
                width={130}
                height={36}
                className="block h-auto w-[110px] object-contain sm:w-[125px]"
              />
            </Link>
            <p className="mt-5 max-w-[280px] text-sm leading-6 text-white/70">
              বাংলাদেশের যেকোনো প্রান্তে ট্রাক ও পিকআপ পরিবহনে নির্ভরযোগ্য বুকিং সেবা — ন্যায্য ভাড়া, অভিজ্ঞ ড্রাইভার, নিরাপদ ডেলিভারি।
            </p>
            <span className="chip mt-5 bg-white/10 text-[#FFC72C]">
              <FaTruckMoving className="h-3.5 w-3.5" aria-hidden="true" />
              ৬৪ জেলায় সার্ভিস
            </span>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://facebook.com/thikanalogistics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#EB601B] hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/thikanalogistics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#EB601B] hover:text-white"
              >
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#EB601B] hover:text-white"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[17px] font-bold">দ্রুত লিংক</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 transition hover:text-[#EB601B]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#EB601B]" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[17px] font-bold">প্রধান রুটসমূহ</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {ROUTES.map((route) => (
                <li key={route.label}>
                  <a
                    href={route.href}
                    className="inline-flex items-center gap-2 transition hover:text-[#EB601B]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#EB601B]" aria-hidden="true" />
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[17px] font-bold">যোগাযোগ করুন</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#EB601B]"
                  aria-hidden="true"
                />
                <span>ঠিকানা লজিস্টিকস পিএলসি, ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="h-4 w-4 shrink-0 text-[#EB601B]" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.phoneDialNumber}`}
                  className="transition hover:text-[#EB601B]"
                >
                  {siteConfig.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="h-4 w-4 shrink-0 text-[#EB601B]" aria-hidden="true" />
                <a
                  href="mailto:info@thikanalogistics.com"
                  className="transition hover:text-[#EB601B]"
                >
                  info@thikanalogistics.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaClock className="h-4 w-4 shrink-0 text-[#EB601B]" aria-hidden="true" />
                <span>সারাদিন সেবা (২৪/৭)</span>
              </li>
            </ul>
            <a
              href="#booking-form"
              className="btn btn-primary mt-6 px-5 py-2.5 text-sm"
            >
              <FaCheckCircle className="h-4 w-4" aria-hidden="true" />
              বুকিং কনফার্ম করুন
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/60 sm:flex-row">
          <p>
            © <CopyrightYear /> Thikana Logistics. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p>ঢাকা, বাংলাদেশ</p>
        </div>
      </div>
    </footer>
  );
};

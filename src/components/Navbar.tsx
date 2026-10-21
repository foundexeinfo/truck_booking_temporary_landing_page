import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEnvelope,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import { MobileNav } from './MobileNav';
import { siteConfig } from '@/lib/siteConfig';

const NAV_LINKS = [
  { label: 'হোম', href: '#home' },
  { label: 'আমাদের সম্পর্কে', href: '#about-us' },
  { label: 'ট্রাকের ধরণ', href: '#truck-types' },
  { label: 'কিভাবে কাজ করে', href: '#how-work' },
  { label: 'রিভিউ', href: '#reviews' },
  { label: 'প্রশ্নোত্তর', href: '#faq' },
];

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="hidden bg-[#2B3840] text-white lg:block">
        <div className="shell flex items-center justify-between gap-6 py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FaHeadset className="h-4 w-4 text-[#EB601B]" aria-hidden="true" />
              <span>২৪/৭ হটলাইন: {siteConfig.phoneNumber}</span>
            </span>
            <a
              href="mailto:info@thikanalogistics.com"
              className="inline-flex items-center gap-2 transition hover:text-[#FFC72C]"
            >
              <FaEnvelope className="h-4 w-4 text-[#EB601B]" aria-hidden="true" />
              <span>info@thikanalogistics.com</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FaShieldAlt className="h-4 w-4 text-[#EB601B]" aria-hidden="true" />
              <span>নিরাপদ ও নির্ভরযোগ্য পরিবহন</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="h-4 w-4 text-[#EB601B]" aria-hidden="true" />
              <span>জেলা ভিত্তিক সার্ভিস</span>
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#EDF0F4] bg-white/95 backdrop-blur">
        <div className="shell flex items-center justify-between gap-4 py-2.5">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo-trimmed.png"
              alt="Thikana Logistics PLC Logo"
              width={150}
              height={38}
              priority
              className="h-auto w-[128px] object-contain sm:w-[150px]"
            />
          </Link>

          <nav aria-label="প্রধান মেনু" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-[15px] font-semibold text-[#1F2937] transition after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#EB601B] after:transition-all after:duration-300 hover:text-[#C14A0E] hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${siteConfig.phoneDialNumber}`}
              className="btn btn-primary px-4 py-2.5 text-[14px] sm:text-[15px]"
            >
              <FaPhoneAlt className="h-4 w-4" aria-hidden="true" />
              কল করুন
            </a>
            <MobileNav links={NAV_LINKS} />
          </div>
        </div>
      </header>
    </>
  );
};

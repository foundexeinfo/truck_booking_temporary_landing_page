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
      {/* Top Information Bar */}
      <div className="hidden bg-[#2B3840] text-white lg:block">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-6 px-4 py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FaHeadset
                className="h-4 w-4 text-[#EB601B]"
                aria-hidden="true"
              />
              <span>২৪/৭ হটলাইন: {siteConfig.phoneNumber}</span>
            </span>

            <a
              href="mailto:info@thikanalogistics.com"
              className="inline-flex items-center gap-2 transition hover:text-[#FFC72C]"
            >
              <FaEnvelope
                className="h-4 w-4 text-[#EB601B]"
                aria-hidden="true"
              />
              <span>info@thikanalogistics.com</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FaShieldAlt
                className="h-4 w-4 text-[#EB601B]"
                aria-hidden="true"
              />
              <span>নিরাপদ ও নির্ভরযোগ্য পরিবহন</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt
                className="h-4 w-4 text-[#EB601B]"
                aria-hidden="true"
              />
              <span>জেলা ভিত্তিক সার্ভিস</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#EDF0F4] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1140px] items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Thikana Logistics Home"
          >
            <Image
              src="/images/logo.png"
              alt="Thikana Logistics Logo"
              width={130}
              height={36}
              priority
              className="block h-auto w-[110px] object-contain sm:w-[125px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="প্রধান মেনু"
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative whitespace-nowrap text-[15px] font-semibold text-[#1F2937] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#EB601B] after:transition-all after:duration-300 hover:text-[#C14A0E] hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Call Button & Mobile Menu */}
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={`tel:${siteConfig.phoneDialNumber}`}
              className="btn btn-primary inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-[14px] sm:text-[15px]"
            >
              <FaPhoneAlt
                className="h-4 w-4"
                aria-hidden="true"
              />
              কল করুন
            </a>

            <MobileNav links={NAV_LINKS} />
          </div>
        </div>
      </header>
    </>
  );
};
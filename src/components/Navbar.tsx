
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 shadow-[0_4px_24px_rgb(23_33_43_/_4%)] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1120px] items-center justify-between gap-4 px-4 sm:h-[84px]">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="Thikana Logistics PLC Logo"
            width={150}
            height={50}
            priority
            className="h-auto w-[132px] object-contain sm:w-[155px]"
          />
        </Link>

        <a
          href="tel:01346695348"
          className="inline-flex items-center gap-2 rounded-xl bg-[#17212b] px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#253746] sm:px-4 sm:text-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-[#ff8a50]" aria-hidden="true">☎</span>
          <span className="hidden sm:inline">সরাসরি কল</span>
          01346-695348
        </a>
      </div>
    </header>
  );
};

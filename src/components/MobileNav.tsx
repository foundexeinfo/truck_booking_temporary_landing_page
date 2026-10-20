'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="মেনু"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#EB601B] text-white transition hover:bg-[#C14A0E]"
      >
        {open ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
      </button>

      {open && (
        <nav
          aria-label="মোবাইল মেনু"
          className="absolute inset-x-0 top-full z-40 border-t border-[#EDF0F4] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        >
          <ul className="shell grid grid-cols-1 gap-1 py-3 sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold text-[#1F2937] transition hover:bg-[#FFF3EC] hover:text-[#C14A0E]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

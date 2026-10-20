import { io } from 'next/cache';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { BookingForm } from '@/components/BookingForm';
import { ReviewSection } from '@/components/ReviewSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f8] font-sans">
      <Navbar />

      <section className="hero-pattern px-4 pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative z-10">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-orange-200 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#f05a18] shadow-[0_0_12px_#f05a18]" />
              সহজ বুকিং · নির্ভরযোগ্য পরিবহন
            </span>
            <h1 className="mb-5 max-w-2xl text-4xl font-black leading-[1.22] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              আপনার মালামাল,
              <br />
              <span className="text-[#ff8a50]">নিরাপদ যাত্রায়</span>
              <br />
              ঠিকানার ট্রাক
            </h1>
            <p className="mb-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              বাসা বদল হোক বা ব্যবসার পণ্য পরিবহন—আপনার প্রয়োজন অনুযায়ী গাড়ি বেছে নিন, বুকিংয়ের তথ্য পাঠান WhatsApp-এ।
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#booking-area"
                className="inline-flex items-center gap-3 rounded-xl bg-[#f05a18] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#ff6a27] sm:text-base"
              >
                বুকিং শুরু করুন
                <span aria-hidden="true">↘</span>
              </a>
              <a
                href="tel:01346695348"
                className="rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                ☎ &nbsp;01346-695348
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-orange-200/20" />
            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full border border-white/10" />
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">THIKANA LOGISTICS</p>
                  <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">পথ হোক সহজ</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f05a18] text-2xl shadow-lg shadow-orange-950/30" aria-hidden="true">
                  🚚
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 text-[#17212b] shadow-lg sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full border-[3px] border-[#f05a18] bg-white" />
                    <span className="my-1 h-8 border-l-2 border-dashed border-slate-300" />
                    <span className="h-3 w-3 rounded-full bg-[#16834a] ring-4 ring-green-100" />
                  </div>
                  <div className="flex-1">
                    <div className="pb-4">
                      <p className="text-xs font-medium text-slate-500">লোড পয়েন্ট</p>
                      <p className="mt-1 font-bold">আপনার ঠিকানা</p>
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-3">
                      <p className="text-xs font-medium text-slate-500">গন্তব্য</p>
                      <p className="mt-1 font-bold">আপনার পছন্দের জায়গা</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/10 p-3.5">
                  <p className="text-lg font-extrabold text-white">৭–২৩ ফিট</p>
                  <p className="mt-1 text-xs text-slate-300">বিভিন্ন গাড়ির সাইজ</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/10 p-3.5">
                  <p className="text-lg font-extrabold text-white">খোলা · কাভার্ড</p>
                  <p className="mt-1 text-xs text-slate-300">আপনার পছন্দমতো</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="booking-area" className="mx-auto w-full max-w-[1000px] px-4 py-12 sm:py-16">
        <BookingForm />
        <ReviewSection />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-slate-600">বুকিং নিয়ে কোনো প্রশ্ন আছে?</p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <a href="https://wa.me/8801346695348" target="_blank" rel="noreferrer" className="text-[#16834a] transition hover:text-[#116d3d]">
              WhatsApp-এ কথা বলুন
            </a>
            <a href="tel:01346695348" className="text-[#17212b] transition hover:text-[#f05a18]">
              01346-695348
            </a>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/10 bg-[#111c26] px-4 py-8 text-center text-xs text-slate-300 sm:text-sm">
        <p className="font-semibold text-white">Thikana Logistics PLC</p>
        <p className="mt-2">© <Suspense fallback={null}><CurrentYear /></Suspense> সর্বস্বত্ব সংরক্ষিত। · আপনার মালামাল, আমাদের দায়িত্ব।</p>
      </footer>
    </div>
  );
}

async function CurrentYear() {
  await io();
  return new Date().getFullYear();
}
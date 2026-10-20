import {
  FaArrowRight,
  FaBolt,
  FaCoins,
  FaHandHoldingUsd,
  FaHeadset,
  FaListOl,
  FaMapMarkerAlt,
  FaPen,
  FaShieldAlt,
  FaStar,
  FaTruck,
  FaTruckLoading,
  FaTruckMoving,
  FaUserShield,
  FaWhatsapp,
} from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { BookingForm } from '@/components/BookingForm';
import { ReviewSection } from '@/components/ReviewSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';
import { TRUCK_SIZES } from '@/data/vehicleData';

const HERO_FEATURES = [
  'সঠিক সময়ে পণ্য ডেলিভারি',
  'দক্ষ ও অভিজ্ঞ ড্রাইভার',
  'সাশ্রয়ী মূল্যে পরিবহন সেবা',
  'আস্থা ও নিরাপত্তার গ্যারান্টি',
];

const STATS = [
  { icon: FaTruck, value: '৭–২৩ ফিট', label: 'বিভিন্ন সাইজের ট্রাক ও পিকআপ' },
  { icon: FaTruckLoading, value: '২ ধরনের', label: 'খোলা ও কাভার্ড গাড়ি কভারেজ' },
  { icon: FaHeadset, value: '২৪/৭', label: 'হটলাইন সাপোর্ট' },
  { icon: FaMapMarkerAlt, value: '৬৪ জেলা', label: 'সারা দেশে পরিবহন সেবা' },
];

const BENEFITS = [
  {
    icon: FaCoins,
    title: 'স্বচ্ছ ও সাশ্রয়ী ভাড়া',
    text: 'কোনো hidden চার্জ ছাড়াই নির্ধারিত এবং প্রতিযোগিতামূলক ভাড়ায় মালামাল পরিবহনের সুযোগ।',
  },
  {
    icon: FaBolt,
    title: 'সহজ ও দ্রুত বুকিং',
    text: 'যেকোনো সময় ফর্ম পূরণ করে বা সরাসরি কল করে অল্প সময়ের মধ্যে ট্রাক বা পিকআপ বুক করা যায়।',
  },
  {
    icon: FaUserShield,
    title: 'অভিজ্ঞ ড্রাইভার',
    text: 'আমাদের প্রতিটি ড্রাইভার দক্ষ ও অভিজ্ঞ, যারা মালামাল নিরাপদে গন্তব্যে পৌঁছে দেন।',
  },
  {
    icon: FaShieldAlt,
    title: 'নিরাপদ মালামাল পরিবহন',
    text: 'যত্নসহকারে করা পরিবহনের মাধ্যমে আপনার মালামাল গন্তব্যে নিরাপদে পৌঁছে যায়।',
  },
  {
    icon: FaTruckMoving,
    title: 'বিভিন্ন ধরণের গাড়ি',
    text: 'ছোট বড় মাঝারী সব ধরনের ট্রাক/পিকআপ পাবেন আপনার চাহিদা ও পছন্দ অনুযায়ী।',
  },
  {
    icon: FaHeadset,
    title: 'দ্রুত যোগাযোগ ও সাপোর্ট',
    text: 'আমরা আছি আপনাদের পাশে দিনরাত, যেকোন সময় যেকোন দরকারে গ্রাহক সেবায় নিয়োজিত।',
  },
];

const STEPS = [
  {
    icon: FaPen,
    title: 'ট্রিপের তথ্য দিন',
    text: 'লোড-আনলোড পয়েন্ট, মালামালের ধরণ, গাড়ির সাইজ ও তারিখ ফর্মে দিন।',
  },
  {
    icon: FaHandHoldingUsd,
    title: 'ভাড়া ও বাজেট নিশ্চিত করুন',
    text: 'ফর্ম, হোয়াটসঅ্যাপ বা কলে সর্বনিম্ন সাশ্রয়ী ভাড়া জানুন এবং বুকিং নিশ্চিত করুন।',
  },
  {
    icon: FaTruck,
    title: 'ড্রাইভার পৌঁছে যাবে',
    text: 'নিশ্চিত সময়ে অভিজ্ঞ ট্রাক ড্রাইভার আপনার ঠিকানায় উপস্থিত হবে।',
  },
  {
    icon: FaTruckLoading,
    title: 'লোড ও ডেলিভারি',
    text: 'মালামাল লোড করে আপনার গন্তব্যে পৌঁছে দেওয়া হবে, সাথে সাথে WhatsApp-এ আপডেট পাবেন।',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <section
        id="home"
        className="hero-pattern px-4 pb-[190px] pt-[28px] text-white sm:px-6 sm:pb-[150px] sm:pt-[60px]"
      >
        <div className="shell">
          <div className="flex flex-col gap-[34px] lg:flex-row lg:items-start lg:gap-[44px]">
            <div className="flex flex-col gap-[26px] lg:w-[46%]">
              <div className="flex flex-col gap-[16px]">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                  <FaStar className="h-3.5 w-3.5 text-[#FFD28A]" aria-hidden="true" />
                  ৬৪ জেলায় দ্রুত ও নিরাপদ পরিবহন সেবা
                </span>

                <h1 className="text-[30px] font-semibold leading-[38px] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px]">
                  বাংলাদেশের যেকোন প্রান্ত থেকে{' '}
                  <span className="text-[#FFE1C7]">দ্রুত, সহজ ও নিরাপদ</span> ট্রাক বুকিং করুন।
                </h1>

                <p className="text-[15px] leading-[26px] text-[#FCE7DA] sm:text-[16px] sm:leading-7">
                  বাসা ও অফিস শিফটিং, ফ্যাক্টরি প্রোডাক্ট বা কমার্শিয়াল মালামাল পরিবহনে আর কোনো
                  দুশ্চিন্তা নয়। মুহূর্তেই সাশ্রয়ী মূল্যে ও অভিজ্ঞ ড্রাইভার সহ ট্রাক/পিকআপ বুক করুন।
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
                {HERO_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-white">
                    <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white/20">
                      <svg
                        viewBox="0 0 24 24"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#truck-types"
                  className="btn btn-white px-7 py-3.5 text-[15px]"
                >
                  <FaTruckLoading className="h-4 w-4" aria-hidden="true" />
                  ট্রাকের ধরণ দেখুন
                </a>
                <a
                  href={siteConfig.whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp px-7 py-3.5 text-[15px]"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  হোয়াটসঅ্যাপে চ্যাট করুন
                </a>
              </div>
            </div>

            <div id="booking-form" className="flex justify-center scroll-mt-24 lg:flex-1">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <div className="relative z-10 -mt-[80px]">
        <div className="shell">
          <div className="card overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
            <div className="grid grid-cols-1 gap-px bg-[#EDF0F4] sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 bg-white px-6 py-6 transition hover:bg-[#FFFBF8]"
                  >
                    <span className="icon-tile icon-tile-round">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                        {stat.value}
                      </h3>
                      <p className="mt-1 text-[13px] font-medium text-[#6B7684]">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- BENEFITS ---------------- */}
      <section id="about-us" className="section section-white scroll-mt-24">
        <div className="shell">
          <div className="text-center">
            <span className="eyebrow justify-center">কেন আমরাই সেরা?</span>
            <h2 className="section-title">কেন Thikana Logistics বেছে নেবেন?</h2>
            <p className="section-lead mx-auto text-center">
              ট্রাক বুকিংয়ের প্রতিটি ধাপে আমরা দায়িত্ব নিই — সহজ বুকিং, ন্যায্য ভাড়া ও নিরাপদ
              ডেলিভারি।
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="card card-hover p-6">
                  <span className="icon-tile">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold text-[#0F172A]">{benefit.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-[#5B6672]">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- TRUCK TYPES ---------------- */}
      <section id="truck-types" className="section section-soft scroll-mt-24">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">
                <FaTruckMoving className="h-4 w-4" aria-hidden="true" />
                আমাদের ট্রাকের বহর
              </span>
              <h2 className="section-title">আপনার প্রয়োজন অনুযায়ী উপযুক্ত ট্রাক বেছে নিন</h2>
              <p className="section-lead">
                ৭ থেকে ২৩ ফিট পর্যন্ত ট্রাক ও পিকআপ — প্রতিটি সাইজে খোলা ও কাভার্ড দুটোই
                উপলব্ধ।
              </p>
            </div>
            <a href="#booking-form" className="btn btn-primary shrink-0 px-6 py-3 text-[15px]">
              ট্রাক বুকিং ফর্ম
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TRUCK_SIZES.map((item) => (
              <div
                key={item.size}
                className="card card-hover group flex flex-col items-center p-5 text-center"
              >
                <span className="icon-tile icon-tile-round">
                  <FaTruck className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-[17px] font-bold text-[#0F172A]">{item.size}</h3>
                <span className="chip mt-2">{item.capacity} ধারণক্ষমতা</span>
                <p className="mt-2 text-[12px] text-[#7B8794]">খোলা ও কাভার্ড</p>
                <a
                  href="#booking-form"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#C14A0E] transition group-hover:gap-2.5"
                >
                  বুক করুন
                  <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section id="how-work" className="section section-white scroll-mt-24">
        <div className="shell">
          <div className="text-center">
            <span className="eyebrow justify-center">
              <FaListOl className="h-4 w-4" aria-hidden="true" />
              সহজ ৪টি ধাপ
            </span>
            <h2 className="section-title">কিভাবে ট্রাক বুকিং করবেন?</h2>
            <p className="section-lead mx-auto text-center">
              চারটি সহজ ধাপে আপনার পরিবহন কাজ সম্পন্ন — ফর্ম থেকে ডেলিভারি পর্যন্ত।
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card card-hover relative overflow-hidden p-6">
                  <span className="pointer-events-none absolute -right-1 -top-3 text-[68px] font-black leading-none text-[#FFF3EC]">
                    {index + 1}
                  </span>
                  <span className="icon-tile relative">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-4 text-[17px] font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="relative mt-2 text-[14px] leading-6 text-[#5B6672]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <ReviewSection />

      {/* ---------------- FAQ ---------------- */}
      <FaqSection />

      {/* ---------------- CTA BAND ---------------- */}
      <section className="relative z-20 px-4 sm:px-6">
        <div className="shell -mb-[80px]">
          <div className="rounded-[26px] bg-[linear-gradient(135deg,#f97a2f_0%,#eb601b_45%,#7a2d05_100%)] p-8 shadow-[0_28px_70px_rgba(235,96,27,0.30)] sm:p-12">
            <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-[24px] font-bold leading-tight text-white sm:text-[30px]">
                  এখনই আপনার ট্রাক বুকিং কনফার্ম করুন!
                </h2>
                <p className="mt-2 max-w-[560px] text-[15px] leading-7 text-white/85">
                  বুকিং ফর্মটি পূরণ করে সাথে সাথে আমাদের সাথে যোগাযোগ করুন — ভাড়া ও সময়
                  নিশ্চিত করে নিন।
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#booking-form" className="btn btn-white px-6 py-3 text-[15px]">
                  <FaTruck className="h-4 w-4" aria-hidden="true" />
                  ট্রাক বুকিং ফর্ম
                </a>
                <a
                  href={siteConfig.whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp px-6 py-3 text-[15px]"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  হোয়াটসঅ্যাপে চ্যাট
                </a>
                <a
                  href={`tel:${siteConfig.phoneDialNumber}`}
                  className="btn btn-outline-light px-6 py-3 text-[15px]"
                >
                  <FaHeadset className="h-4 w-4" aria-hidden="true" />
                  কল করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

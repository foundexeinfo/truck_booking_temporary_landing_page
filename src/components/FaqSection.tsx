import React from 'react';
import { FaChevronDown, FaHeadset, FaQuestionCircle } from 'react-icons/fa';
import { siteConfig } from '@/lib/siteConfig';

const FAQS = [
  {
    question: 'ট্রাক বুকিং করতে কী কী তথ্য লাগবে?',
    answer:
      'আপনার নাম, মোবাইল নম্বর, লোড ও আনলোড পয়েন্ট, মালামালের ধরণ, গাড়ির সাইজ এবং তারিখ। ফর্মটি পূরণ করে বাটনে চাপ দিলেই WhatsApp-এ আপনার বুকিং তথ্য সহ মেসেজ চলে যাবে।',
  },
  {
    question: 'ভাড়া কীভাবে নির্ধারিত হয়?',
    answer:
      'ভাড়া নির্ভর করে দূরত্ব, গাড়ির সাইজ ও ধারণক্ষমতা, মালামালের ধরণ এবং সময়ের উপর। আপনি ফর্মে বাজেট জানালে আমরা সেই অনুযায়ী ভাড়া নিশ্চিত করে জানাব।',
  },
  {
    question: 'খোলা আর কাভার্ড ট্রাকের মধ্যে কোনটি বেশি উপযোগী?',
    answer:
      'বাসাবাড়ির আসবাবপত্র ও হালকা মালামালের জন্য খোলা ট্রাক যথেষ্ট, আর ব্যবসায়িক পণ্য, নির্মাণসামগ্রী বা বৃষ্টির ঝুঁকি থাকলে কাভার্ড ট্রাক নিরাপদ।',
  },
  {
    question: 'বুকিং কনফার্ম করার পর কী হয়?',
    answer:
      'বুকিং কনফার্ম হওয়ার পর আমাদের টিম আপনার সাথে ফোনে যোগাযোগ করে সময় ও ভাড়া নিশ্চিত করে, এরপর ড্রাইভার আপনার ঠিকানায় পৌঁছে যায়।',
  },
  {
    question: 'কোন কোন ধরনের মালামাল পরিবহন করা হয়?',
    answer:
      'বাসাবাড়ির আসবাবপত্র, অফিসের আসবাবপত্র, ব্যবসায়িক পণ্য, নির্মাণসামগ্রী সহ প্রায় সব ধরনের মালামাল পরিবহন করা হয়।',
  },
  {
    question: 'পেমেন্ট কীভাবে করব?',
    answer:
      'ট্রিপ শুরুর আগে ড্রাইভারের সাথে সরাসরি পেমেন্ট নিয়ে ভাড়া পরিশোধ করতে পারবেন। কোনো hidden চার্জ নেই।',
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="section section-white scroll-mt-24">
      <div className="shell">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center">
              <FaQuestionCircle className="h-4 w-4" aria-hidden="true" />
              সচরাচর প্রশ্নাবলী
            </span>
            <h2 className="section-title">আপনার মনে কি কোনো প্রশ্ন আছে?</h2>
            <p className="section-lead mx-auto text-center">
              সাধারণ প্রশ্নগুলোর উত্তর একসাথে পেয়ে নিন — আরও কিছু জানতে চাইলে সরাসরি কল
              করুন।
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[#E5E9EF] bg-white transition hover:border-[#F8DCC6] hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-[#0F172A] sm:px-6 sm:py-[18px]">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF3EC] text-[#EB601B] transition group-open:rotate-180 group-open:bg-[#EB601B] group-open:text-white">
                    <FaChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="border-t border-[#EDF0F4] px-5 py-4 text-[15px] leading-7 text-[#5B6672] sm:px-6">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#FFF3EC] px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <FaHeadset className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[15px] font-bold text-[#0F172A]">আরও কোনো প্রশ্ন আছে?</p>
                <p className="text-[13px] text-[#6B7684]">
                  আমাদের টিম ২৪/৭ আপনার সেবায় প্রস্তুত।
                </p>
              </div>
            </div>
            <a
              href={`tel:${siteConfig.phoneDialNumber}`}
              className="btn btn-primary shrink-0 px-6 py-3 text-[15px]"
            >
              কল করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

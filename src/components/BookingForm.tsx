'use client';

import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { InputField } from './ui/InputField';
import { SelectField } from './ui/SelectField';
import { TRUCK_SIZES, GOODS_TYPES } from '@/data/vehicleData';

export interface BookingFormData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  vehicleType: string;
  size: string;
  tripType: string;
  goods: string;
  date: string;
  preferredTime?: string;
  budget?: string;
  details?: string;
  discussion?: string;
}

export const BookingForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [budgetType, setBudgetType] = useState('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormData>();

  const selectedVehicleType = useWatch({ control, name: 'vehicleType' });

  const sizeOptions = useMemo(() => {
    if (!selectedVehicleType) return [];
    return TRUCK_SIZES.map((item) => ({
      label: `${item.size} ${selectedVehicleType} — ${item.capacity}`,
      value: `${item.size} ${selectedVehicleType} ${item.capacity}`,
    }));
  }, [selectedVehicleType]);

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    const whatsappTab = window.open('about:blank', '_blank');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          budgetType,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          displayDate: data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-US') : undefined,
        }),
      });

      const result = await res.json();
      if (result.success && result.whatsappUrl) {
        if (whatsappTab) {
          whatsappTab.location.href = result.whatsappUrl;
        } else {
          window.open(result.whatsappUrl, '_self');
        }
      } else {
        whatsappTab?.close();
        alert(result.message || 'Form pathate somosha hoyeche');
      }
    } catch (error) {
      whatsappTab?.close();
      console.error('Booking request failed:', error);
      alert('Network somosha, abar chesta korun');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container relative w-full max-w-[760px] overflow-hidden rounded-[20px] border border-[#E8ECF1] bg-white text-[#0F172A] shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <span
        className="absolute inset-x-0 top-0 h-[5px] bg-[linear-gradient(90deg,#eb601b_0%,#f97a2f_100%)]"
        aria-hidden="true"
      />

      <div className="p-5 pt-6 sm:p-7 sm:pt-7">
        <div className="mb-5 flex items-center gap-3.5">
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#EB601B] text-white">
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 6h13v10H1z" />
              <path d="M14 9h4l3 3v4h-7z" />
              <circle cx="5.5" cy="17.5" r="1.8" />
              <circle cx="17.5" cy="17.5" r="1.8" />
            </svg>
          </span>
          <div>
            <h2 className="text-[22px] font-bold leading-tight">ট্রাক বুকিং করুন</h2>
            <p className="mt-1 text-sm leading-6 text-[#6B7684]">
              তথ্যগুলো দিন — সাথে সাথে আনুমানিক ভাড়া জেনে নিন।
            </p>
          </div>
        </div>

        <div className="mb-5 h-px w-full bg-[#EDF0F4]" aria-hidden="true" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 @md:col-span-6">
              <InputField
                label="আপনার নাম"
                name="name"
                placeholder="আপনার নাম লিখুন..."
                required
                registration={register('name', { required: 'নাম দেওয়া আবশ্যক' })}
                error={errors.name}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <InputField
                label="মোবাইল নাম্বার"
                name="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                required
                registration={register('phone', {
                  required: 'মোবাইল নম্বর আবশ্যক',
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন',
                  },
                })}
                error={errors.phone}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <SelectField
                label="গাড়ির ধরন"
                options={[
                  { label: 'খোলা', value: 'খোলা' },
                  { label: 'কাভার্ড', value: 'কাভার্ড' },
                ]}
                required
                registration={register('vehicleType', { required: 'গাড়ির ধরন নির্বাচন করুন' })}
                error={errors.vehicleType}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <SelectField
                label="গাড়ির সাইজ ও ধারণক্ষমতা"
                placeholder={selectedVehicleType ? 'সাইজ নির্বাচন করুন' : 'আগে গাড়ির ধরন নির্বাচন করুন'}
                disabled={!selectedVehicleType}
                options={sizeOptions}
                required
                registration={register('size', { required: 'সাইজ নির্বাচন করুন' })}
                error={errors.size}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <SelectField
                label="ট্রিপের ধরন"
                options={[
                  { label: 'একক ট্রিপ (একবার যাওয়া)', value: 'একক ট্রিপ' },
                  { label: 'আপ-ডাউন ট্রিপ (যাওয়া ও ফেরা)', value: 'আপ-ডাউন ট্রিপ' },
                ]}
                placeholder="ট্রিপের ধরন নির্বাচন করুন"
                required
                registration={register('tripType', { required: 'ট্রিপের ধরন নির্বাচন করুন' })}
                error={errors.tripType}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <InputField
                label="লোড পয়েন্ট"
                name="pickup"
                placeholder="লোড পয়েন্ট লিখুন..."
                required
                registration={register('pickup', { required: 'লোড পয়েন্ট আবশ্যক' })}
                error={errors.pickup}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <InputField
                label="আনলোড পয়েন্ট (ডাউন)"
                name="drop"
                placeholder="আনলোড পয়েন্ট লিখুন..."
                required
                registration={register('drop', { required: 'আনলোড পয়েন্ট আবশ্যক' })}
                error={errors.drop}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <SelectField
                label="মালামালের ধরণ"
                options={GOODS_TYPES}
                required
                registration={register('goods', { required: 'মালামাল নির্বাচন করুন' })}
                error={errors.goods}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <InputField
                label="তারিখ"
                name="date"
                type="date"
                required
                registration={register('date', { required: 'তারিখ নির্বাচন করুন' })}
                error={errors.date}
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <label htmlFor="preferredTime" className="field-label">
                পছন্দের সময় (বাংলাদেশ সময়)
              </label>
              <input
                id="preferredTime"
                required
                type="time"
                {...register('preferredTime')}
                className="form-control w-full"
              />
            </div>

            <div className="col-span-12 @md:col-span-6">
              <label
                htmlFor="budgetType"
                className="field-label"
              >
                আপনার বাজেটের ধরন
              </label>

              <select
                id="budgetType"
                value={budgetType}
                onChange={(e) => setBudgetType(e.target.value)}
                className="form-control w-full"
              >
                <option value="">বাজেট উল্লেখ করবো না</option>
                <option value="fixed">নির্দিষ্ট বাজেট</option>
                <option value="negotiable">আলোচনা সাপেক্ষে</option>
              </select>
            </div>

          
              <div className="col-span-12 @md:col-span-6">
                <label
                  htmlFor="customerBudget"
                  className="field-label"
                >
                  আপনার বাজেট (টাকা)
                </label>

                <input
                  id="customerBudget"
                  type="number"
                  
                  min="0"
                  {...register('budget')}
                  placeholder="যেমন: ৫০০০ টাকা"
                  className="form-control w-full"
                />
              </div>
          

            <div className="col-span-12">
              <label className="field-label" htmlFor="details">
                বিবরণ / আনুমানিক ওজন
              </label>
              <textarea
                id="details"
                {...register('details')}
                rows={3}
                placeholder="যেমন: খাট, আলমারি, ফ্রিজ; আনুমানিক ওজন ১ টন"
                className="form-control w-full resize-y"
                required
              />
            </div>

            <div className="col-span-12">
              <label className="field-label" htmlFor="discussion">
                আলোচনা
              </label>
              <textarea
                id="discussion"
                {...register('discussion')}
                rows={3}
                placeholder="আপনার অতিরিক্ত কথা বা বিশেষ নির্দেশনা লিখুন"
                className="form-control w-full resize-y"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-5 w-full px-5 py-3.5 text-base disabled:cursor-wait disabled:opacity-75"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            {loading ? 'তথ্য প্রস্তুত করা হচ্ছে...' : 'বুকিং করুন'}
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-[#7B8794]">
            বাটনে চাপ দিলে WhatsApp খুলবে এবং আপনার দেওয়া তথ্যসহ একটি বার্তা তৈরি হবে। পাঠানোর
            আগে তথ্য যাচাই করে Send চাপুন।
          </p>
        </form>
      </div>
    </div>
  );
};

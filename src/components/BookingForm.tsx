'use client';

import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
  goods: string;
  date: string;
  time?: string;
  details?: string;
  discussion?: string;
}

export const BookingForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
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
        body: JSON.stringify(data),
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
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgb(23_33_43_/_7%)] sm:p-8 lg:p-10">
      <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#d94e13]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f05a18]" />
            সহজে বুকিং করুন
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#17212b] sm:text-3xl">
            বুকিংয়ের তথ্য দিন
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            প্রয়োজনীয় তথ্য পূরণ করুন, আমরা দ্রুত যোগাযোগ করব।
          </p>
        </div>
        <p className="text-xs font-medium text-slate-400">
          <span className="text-red-500">*</span> চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
          <InputField
            label="আপনার নাম"
            name="name"
            placeholder="নাম লিখুন"
            required
            registration={register('name', { required: 'নাম দেওয়া আবশ্যক' })}
            error={errors.name}
          />

          <InputField
            label="মোবাইল নম্বর"
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

          <InputField
            label="লোড পয়েন্ট / যেখান থেকে নেবে"
            name="pickup"
            placeholder="এলাকা, জেলা"
            required
            registration={register('pickup', { required: 'লোড পয়েন্ট আবশ্যক' })}
            error={errors.pickup}
          />

          <InputField
            label="আনলোড পয়েন্ট / যেখানে যাবে"
            name="drop"
            placeholder="এলাকা, জেলা"
            required
            registration={register('drop', { required: 'আনলোড পয়েন্ট আবশ্যক' })}
            error={errors.drop}
          />

          <SelectField
            label="গাড়ির ধরন"
            options={[
              { label: 'খোলা', value: 'খোলা' },
              { label: 'কাভার্ড', value: 'কাভার্ড' },
            ]}
            required
            registration={register('vehicleType', { required: 'গাড়ির ধরন নির্বাচন করুন' })}
            error={errors.vehicleType}
          />

          <SelectField
            label="গাড়ির সাইজ ও ধারণক্ষমতা"
            placeholder={selectedVehicleType ? 'সাইজ নির্বাচন করুন' : 'আগে গাড়ির ধরন নির্বাচন করুন'}
            disabled={!selectedVehicleType}
            options={sizeOptions}
            required
            registration={register('size', { required: 'সাইজ নির্বাচন করুন' })}
            error={errors.size}
          />

          <SelectField
            label="মালামালের ধরন"
            options={GOODS_TYPES}
            required
            registration={register('goods', { required: 'মালামাল নির্বাচন করুন' })}
            error={errors.goods}
          />

          <InputField
            label="গাড়ি নেওয়ার তারিখ"
            name="date"
            type="date"
            required
            registration={register('date', { required: 'তারিখ নির্বাচন করুন' })}
            error={errors.date}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#182230]">
              মালামালের বিবরণ / আনুমানিক ওজন
            </label>
            <textarea
              {...register('details')}
              rows={4}
              placeholder="যেমন: খাট, আলমারি, ফ্রিজ; আনুমানিক ওজন ১ টন"
              className="form-control w-full resize-y rounded-xl p-3.5 text-sm text-[#182230] placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#182230]">
              আলোচনা
            </label>
            <textarea
              {...register('discussion')}
              rows={4}
              placeholder="আপনার অতিরিক্ত কথা বা বিশেষ নির্দেশনা লিখুন"
              className="form-control w-full resize-y rounded-xl p-3.5 text-sm text-[#182230] placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            label="পছন্দের সময়"
            name="time"
            type="time"
            registration={register('time')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#16834a] px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#116d3d] hover:shadow-xl disabled:translate-y-0 disabled:cursor-wait disabled:opacity-60 sm:text-lg"
        >
          <span aria-hidden="true">◉</span>
          {loading ? 'তথ্য প্রস্তুত করা হচ্ছে...' : 'WhatsApp-এ বুকিং পাঠান'}
          {!loading && <span aria-hidden="true">↗</span>}
        </button>

        <p className="text-center text-xs leading-5 text-slate-500">
          বাটনে চাপ দিলে WhatsApp খুলবে এবং আপনার দেওয়া তথ্যসহ একটি বার্তা তৈরি হবে। পাঠানোর আগে তথ্য যাচাই করে Send চাপুন।
        </p>
      </form>
    </section>
  );
};
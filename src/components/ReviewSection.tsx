'use client';

import React, { useEffect, useState } from 'react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}

interface ReviewsResponse {
  success: boolean;
  reviews?: Review[];
  stats?: ReviewStats;
  message?: string;
}

interface ReviewFormData {
  name: string;
  location: string;
  rating: number;
  comment: string;
}

const initialFormData: ReviewFormData = {
  name: '',
  location: '',
  rating: 5,
  comment: '',
};

const initialStats: ReviewStats = {
  averageRating: 0,
  totalReviews: 0,
};

export const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState(initialStats);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/reviews', {
          cache: 'no-store',
          signal: controller.signal,
        });
        const result = (await response.json()) as ReviewsResponse;

        if (!response.ok || !result.success || !result.reviews || !result.stats) {
          throw new Error(result.message || 'রিভিউ লোড করা যায়নি। পরে আবার চেষ্টা করুন।');
        }

        setReviews(result.reviews);
        setStats(result.stats);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(
            error instanceof Error ? error.message : 'রিভিউ লোড করা যায়নি। পরে আবার চেষ্টা করুন।'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadReviews();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as ReviewsResponse & {
        review?: Review;
      };

      if (!response.ok || !result.success || !result.review || !result.stats) {
        throw new Error(result.message || 'রিভিউ জমা দেওয়া যায়নি। পরে আবার চেষ্টা করুন।');
      }

      const newReview = result.review;
      setReviews((currentReviews) => [newReview, ...currentReviews].slice(0, 50));
      setStats(result.stats);
      setFormData(initialFormData);
      setSuccessMessage('আপনার রিভিউটি সফলভাবে জমা হয়েছে। ধন্যবাদ!');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'রিভিউ জমা দেওয়া যায়নি। পরে আবার চেষ্টা করুন।'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="mt-12 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgb(23_33_43_/_5%)] sm:mt-14 sm:p-8"
    >
      <div className="flex flex-col justify-between gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#f05a18]">কাস্টমার ফিডব্যাক</span>
          <h3 className="mt-1 text-xl font-extrabold text-[#17212b] sm:text-2xl">গ্রাহকদের মতামত ও আলোচনা</h3>
          <p className="mt-1 text-sm text-slate-500">আমাদের সার্ভিসের অভিজ্ঞতা জেনে নিন</p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-3 sm:self-auto">
          <div className="text-2xl font-black text-[#f05a18]">
            {stats.averageRating.toLocaleString('bn-BD', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            <span className="text-lg">★</span>
          </div>
          <div className="text-xs text-[#17212b]">
            <p className="font-bold">{stats.totalReviews.toLocaleString('bn-BD')} টি রিভিউ</p>
            <p className="mt-0.5 text-slate-500">গ্রাহকদের গড় রেটিং</p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p role="status" className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {loading ? (
          <p className="text-sm text-slate-500">রিভিউ লোড হচ্ছে...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-slate-500">এখনও কোনো রিভিউ নেই। আপনার অভিজ্ঞতা শেয়ার করুন।</p>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-[#fafbfc] p-5 transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-[#17212b]">{review.name}</span>
                  <span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600">
                    ★ {review.rating}
                  </span>
                </div>
                <p className="mb-3 text-xs font-medium text-slate-400">
                  {review.location} ·{' '}
                  {new Date(review.createdAt).toLocaleDateString('bn-BD', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm leading-6 text-slate-600">&ldquo;{review.comment}&rdquo;</p>
              </div>
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 border-t border-slate-100 pt-6">
        <h4 className="text-lg font-extrabold text-[#17212b]">আপনার রিভিউ লিখুন</h4>
        <p className="mt-1 text-sm text-slate-500">আপনার পরিবহন অভিজ্ঞতা অন্যদের সঙ্গে শেয়ার করুন।</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold text-[#182230]">
            আপনার নাম
            <input
              required
              minLength={2}
              maxLength={80}
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="form-control mt-2 w-full rounded-xl p-3.5 text-sm font-normal"
              placeholder="নাম লিখুন"
            />
          </label>
          <label className="text-sm font-bold text-[#182230]">
            এলাকা
            <input
              required
              minLength={2}
              maxLength={100}
              value={formData.location}
              onChange={(event) => setFormData({ ...formData, location: event.target.value })}
              className="form-control mt-2 w-full rounded-xl p-3.5 text-sm font-normal"
              placeholder="এলাকা, জেলা"
            />
          </label>
          <label className="text-sm font-bold text-[#182230]">
            রেটিং
            <select
              value={formData.rating}
              onChange={(event) => setFormData({ ...formData, rating: Number(event.target.value) })}
              className="form-control mt-2 w-full rounded-xl p-3.5 text-sm font-normal"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold text-[#182230] sm:col-span-2">
            আপনার মতামত
            <textarea
              required
              minLength={10}
              maxLength={1000}
              rows={4}
              value={formData.comment}
              onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
              className="form-control mt-2 w-full resize-y rounded-xl p-3.5 text-sm font-normal"
              placeholder="আপনার অভিজ্ঞতা লিখুন"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 rounded-xl bg-[#f05a18] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#d94e13] disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? 'জমা হচ্ছে...' : 'রিভিউ জমা দিন'}
        </button>
      </form>
    </section>
  );
};

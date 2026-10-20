'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaCommentDots, FaStar } from 'react-icons/fa';

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
          throw new Error(result.message || 'রিভিউ লোড করা যায়নি। পরে আবার চেষ্টা করুন।');
        }

        setReviews(result.reviews);
        setStats(result.stats);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(
            error instanceof Error ? error.message : 'রিভিউ লোড করা যায়নি। পরে আবার চেষ্টা করুন।'
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
        throw new Error(result.message || 'রিভিউ জমা দেওয়া যায়নি। পরে আবার চেষ্টা করুন।');
      }

      const newReview = result.review;
      setReviews((currentReviews) => [newReview, ...currentReviews].slice(0, 50));
      setStats(result.stats);
      setFormData(initialFormData);
      setSuccessMessage('আপনার রিভিউটি সফলভাবে জমা হয়েছে। ধন্যবাদ!');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'রিভিউ জমা দেওয়া যায়নি। পরে আবার চেষ্টা করুন।'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="section section-soft scroll-mt-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div>
            <span className="eyebrow">
              <FaCommentDots className="h-4 w-4" aria-hidden="true" />
              গ্রাহকদের মতামত
            </span>
            <h2 className="section-title">আমাদের সন্তুষ্ট গ্রাহকরা কি বলছেন?</h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-bold text-[#0F172A] ring-1 ring-[#E5E9EF]">
                <FaStar className="h-4 w-4 text-[#FFB800]" aria-hidden="true" />
                {stats.averageRating.toLocaleString('bn-BD', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}{' '}
                / ৫
              </span>
              <span className="text-[14px] text-[#6B7684]">
                মোট {stats.totalReviews.toLocaleString('bn-BD')} টি রিভিউ
              </span>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]"
              >
                {errorMessage}
              </p>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {loading ? (
                <p className="text-sm text-[#6B7684]">রিভিউ লোড হচ্ছে...</p>
              ) : reviews.length === 0 ? (
                <p className="text-sm text-[#6B7684]">
                  এখনও কোনো রিভিউ নেই। আপনার অভিজ্ঞতা শেয়ার করুন।
                </p>
              ) : (
                reviews.map((review) => (
                  <article
                    key={review.id}
                    className="card card-hover flex flex-col justify-between p-6"
                  >
                    <div>
                      <div className="mb-3 flex items-center gap-1 text-[#FFB800]">
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <FaStar key={index} className="h-4 w-4" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-[15px] leading-7 text-[#4A5563]">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-3 border-t border-[#EDF0F4] pt-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3EC] text-[16px] font-bold text-[#C14A0E]">
                        {review.name.trim().charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-[#0F172A]">{review.name}</p>
                        <p className="text-xs text-[#7B8794]">
                          {review.location} ·{' '}
                          {new Date(review.createdAt).toLocaleDateString('bn-BD', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-7">
              <h3 className="text-[20px] font-bold text-[#0F172A]">আপনার রিভিউ লিখুন</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#6B7684]">
                আপনার পরিবহন অভিজ্ঞতা অন্যদের সঙ্গে শেয়ার করুন।
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <label className="field-label">
                  আপনার নাম
                  <input
                    required
                    minLength={2}
                    maxLength={80}
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="form-control mt-1.5 w-full"
                    placeholder="আপনার নাম লিখুন"
                  />
                </label>
                <label className="field-label">
                  এলাকা
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.location}
                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    className="form-control mt-1.5 w-full"
                    placeholder="এলাকা, জেলা"
                  />
                </label>
                <label className="field-label">
                  রেটিং
                  <div className="relative mt-1.5">
                    <select
                      value={formData.rating}
                      onChange={(event) =>
                        setFormData({ ...formData, rating: Number(event.target.value) })
                      }
                      className="form-control w-full appearance-none pr-10"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} ★
                        </option>
                      ))}
                    </select>
                    <FaChevronDown
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                      aria-hidden="true"
                    />
                  </div>
                </label>
                <label className="field-label sm:col-span-2 lg:col-span-1">
                  আপনার মতামত
                  <textarea
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={4}
                    value={formData.comment}
                    onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
                    className="form-control mt-1.5 w-full resize-y"
                    placeholder="আপনার অভিজ্ঞতা লিখুন"
                  />
                </label>
              </div>

              {successMessage && (
                <p
                  role="status"
                  className="mt-4 rounded-xl border border-[#F8DCC6] bg-[#FFF3EC] px-4 py-3 text-sm text-[#7A2D05]"
                >
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary mt-5 w-full px-6 py-3 text-[15px] disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'জমা হচ্ছে...' : 'রিভিউ জমা দিন'}
              </button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
};

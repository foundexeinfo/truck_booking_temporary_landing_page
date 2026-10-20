import { NextResponse } from 'next/server';
import type { Collection, WithId } from 'mongodb';
import { getMongoClient } from '@/lib/mongodb';

interface ReviewFields {
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ReviewStatsDocument {
  _id: null;
  totalReviews: number;
  averageRating: number;
}

function toPublicReview(review: WithId<ReviewFields>) {
  return {
    id: review._id.toHexString(),
    name: review.name,
    location: review.location,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  };
}

async function getReviewStats(collection: Collection<ReviewFields>) {
  const result = await collection
    .aggregate<ReviewStatsDocument>([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
        },
      },
    ])
    .next();

  return {
    averageRating: result?.averageRating ?? 0,
    totalReviews: result?.totalReviews ?? 0,
  };
}

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { success: false, message: 'রিভিউ সেবা চালু করতে MONGODB_URI সেট করুন।' },
      { status: 503 }
    );
  }

  try {
    const client = await getMongoClient();
    const collection = client.db('truck_booking').collection<ReviewFields>('truck_booking_review');
    const [reviews, stats] = await Promise.all([
      collection.find().sort({ createdAt: -1 }).limit(50).toArray(),
      getReviewStats(collection),
    ]);

    return NextResponse.json({
      success: true,
      reviews: reviews.map(toPublicReview),
      stats,
    });
  } catch (error) {
    console.error('Failed to load reviews from MongoDB:', error);
    return NextResponse.json(
      { success: false, message: 'রিভিউ লোড করা যায়নি। পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'সঠিক রিভিউ তথ্য পাঠান।' },
      { status: 400 }
    );
  }

  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { success: false, message: 'রিভিউ সেবা চালু করতে MONGODB_URI সেট করুন।' },
      { status: 503 }
    );
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, message: 'সঠিক রিভিউ তথ্য পাঠান।' },
      { status: 400 }
    );
  }

  const fields = body as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const location = typeof fields.location === 'string' ? fields.location.trim() : '';
  const comment = typeof fields.comment === 'string' ? fields.comment.trim() : '';
  const rating = fields.rating;

  if (
    name.length < 2 ||
    name.length > 80 ||
    location.length < 2 ||
    location.length > 100 ||
    comment.length < 10 ||
    comment.length > 1000 ||
    typeof rating !== 'number' ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return NextResponse.json(
      { success: false, message: 'নাম, এলাকা, ১–৫ রেটিং এবং ১০–১০০০ অক্ষরের মতামত দিন।' },
      { status: 400 }
    );
  }

  try {
    const client = await getMongoClient();
    const collection = client.db('truck_booking').collection<ReviewFields>('truck_booking_review');
    const createdAt = new Date();
    const review = { name, location, rating, comment, createdAt };
    const { insertedId } = await collection.insertOne(review);
    const stats = await getReviewStats(collection);

    return NextResponse.json(
      {
        success: true,
        review: toPublicReview({ ...review, _id: insertedId }),
        stats,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to save review to MongoDB:', error);
    return NextResponse.json(
      { success: false, message: 'রিভিউ সংরক্ষণ করা যায়নি। পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

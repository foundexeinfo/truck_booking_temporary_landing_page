import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/siteConfig';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      pickup,
      drop,
      vehicleType,
      size,
      goods,
      date,
      time,
      budget,
      details,
      discussion,
    } = body;

    if (!name || !phone || !pickup || !drop || !size || !goods || !date) {
      return NextResponse.json(
        { success: false, message: 'Shob guruttopurno ghor puron korun' },
        { status: 400 }
      );
    }

    const messageLines = [
      'আসসালামু আলাইকুম, ঠিকানা লজিস্টিকস পিএলসি। আমি ট্রাক/পিকআপ বুকিং করতে চাই।',
      '',
      `👤 নাম: ${name}`,
      `📞 মোবাইল: ${phone}`,
      `📍 লোড পয়েন্ট: ${pickup}`,
      `📍 আনলোড পয়েন্ট: ${drop}`,
      `🚚 গাড়ি: ${size} (${vehicleType})`,
      `📦 মালামাল: ${goods}`,
      `📅 তারিখ: ${date}`,
      `🕒 সময়: ${time || 'উল্লেখ করা হয়নি'}`,
      `💰 বাজেট: ${budget ? `${budget} টাকা` : 'উল্লেখ করা হয়নি'}`,
      `📝 বিবরণ/ওজন: ${details || 'উল্লেখ করা হয়নি'}`,
      `💬 আলোচনা: ${discussion || 'উল্লেখ করা হয়নি'}`,
    ];

    if (!siteConfig.whatsappNumber) {
      return NextResponse.json(
        { success: false, message: 'Whatsapp number configure kora hoyeche' },
        { status: 500 }
      );
    }

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Failed to process booking request:', error);
    return NextResponse.json(
      { success: false, message: 'Server-e somosha hoyeche' },
      { status: 500 }
    );
  }
}
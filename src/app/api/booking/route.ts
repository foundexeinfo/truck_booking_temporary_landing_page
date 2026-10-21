import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/siteConfig';

const DHAKA_TIME_ZONE = 'Asia/Dhaka';

const getZoneOffsetMinutes = (date: Date, timeZone: string) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? '0');

  const asUtc = Date.UTC(
    read('year'),
    read('month') - 1,
    read('day'),
    read('hour') % 24,
    read('minute'),
    read('second')
  );

  return (asUtc - date.getTime()) / 60000;
};

const isValidTimeZone = (timeZone: string) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone }).format();
    return true;
  } catch {
    return false;
  }
};

const formatBangladeshTime = (time?: string, timeZone?: string) => {
  if (!time) return '';

  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return time;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return time;

  const sourceZone =
    timeZone && isValidTimeZone(timeZone) ? timeZone : DHAKA_TIME_ZONE;

  const now = new Date();
  const wallClock = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hour,
    minute
  );

  const guess = new Date(wallClock);
  const sourceOffset = getZoneOffsetMinutes(guess, sourceZone);
  const instant = new Date(wallClock - sourceOffset * 60000);

  return instant.toLocaleTimeString('en-US', {
    timeZone: DHAKA_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

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
      tripType,
      goods,
      date,
      time,
      timeZone,
      budget,
      details,
      discussion,
    } = body;

    if (!name || !phone || !pickup || !drop || !size || !tripType || !goods || !date) {
      return NextResponse.json(
        { success: false, message: 'Shob guruttopurno ghor puron korun' },
        { status: 400 }
      );
    }

    const bangladeshTime = formatBangladeshTime(time, timeZone);
    const isNumericBudget = /^[\d\u09E6-\u09EF,.\s\u2013-]+$/.test(budget ?? '');

    const messageLines = [
      'আসসালামু আলাইকুম। ঠিকানা লজিস্টিকস পিএলসি-এর মাধ্যমে আমি ট্রাক ও পিকআপ বুকিং করতে চাই।',
      '',
      `👤 নাম: ${name}`,
      `📞 মোবাইল: ${phone}`,
      `📍 লোড পয়েন্ট: ${pickup}`,
      `📍 আনলোড পয়েন্ট: ${drop}`,
      `🚚 গাড়ি: ${size || vehicleType}`,
      `🔄 ট্রিপের ধরন: ${tripType}`,
      `📦 মালামাল: ${goods}`,
      `📅 তারিখ: ${date}`,
      `🕒 সময়: ${bangladeshTime || 'উল্লেখ করা হয়নি'}`,
      `💰 বাজেট: ${
        budget ? (isNumericBudget ? `${budget} টাকা` : budget) : 'উল্লেখ করা হয়নি'
      }`,
      `📝 বিবরণ/ওজন: ${details || 'উল্লেখ করা হয়নি'}`,
      `💬 আলোচনা: ${discussion || 'উল্লেখ করা হয়নি'}`,
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

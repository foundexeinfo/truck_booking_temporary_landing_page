'use client';

import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

interface TimeFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

interface ParsedTime {
  hour: number;
  minute: number;
  meridiem: 'AM' | 'PM';
  value: string;
}

const pad = (value: number) => String(value).padStart(2, '0');

const toParts = (value?: string): { hour: number; minute: number; meridiem: 'AM' | 'PM' } => {
  const match = /^(\d{1,2}):(\d{2})$/.exec((value ?? '').trim());

  if (!match) {
    return { hour: 12, minute: 0, meridiem: 'AM' };
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  return {
    hour: hour % 12 === 0 ? 12 : hour % 12,
    minute,
    meridiem: hour >= 12 ? 'PM' : 'AM',
  };
};

const formatDisplay = (hour: number, minute: number, meridiem: 'AM' | 'PM') =>
  `${hour}:${pad(minute)} ${meridiem}`;

const parseTime = (raw: string, fallbackMeridiem: 'AM' | 'PM'): ParsedTime | null => {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, '');
  if (!cleaned) return null;

  const match = /^(\d{1,2})[:.]?(\d{2})?(AM|PM)?$/.exec(cleaned);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = match[2] ? Number(match[2]) : 0;
  const meridiem = match[3] as 'AM' | 'PM' | undefined;

  if (minute > 59) return null;

  if (meridiem) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const hour24 =
      meridiem === 'PM' ? (hour12 === 12 ? 12 : hour12 + 12) : hour12 === 12 ? 0 : hour12;

    return {
      hour: hour12,
      minute,
      meridiem,
      value: `${pad(hour24)}:${pad(minute)}`,
    };
  }

  if (hour > 23) return null;

  if (hour > 12) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const meridiem24: 'AM' | 'PM' = hour >= 12 ? 'PM' : 'AM';

    return {
      hour: hour12,
      minute,
      meridiem: meridiem24,
      value: `${pad(hour)}:${pad(minute)}`,
    };
  }

  const hour12 = hour === 0 ? 12 : hour;
  const hour24 = fallbackMeridiem === 'PM' ? (hour12 % 12) + 12 : hour12 % 12;

  return {
    hour: hour12,
    minute,
    meridiem: fallbackMeridiem,
    value: `${pad(hour24)}:${pad(minute)}`,
  };
};

export const TimeField: React.FC<TimeFieldProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  const initial = toParts(value);

  const [text, setText] = useState(() => (value ? formatDisplay(initial.hour, initial.minute, initial.meridiem) : ''));
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>(initial.meridiem);
  const [lastValid, setLastValid] = useState<ParsedTime | null>(
    value ? parseTime(value, initial.meridiem) : null
  );

  const handleTextChange = (raw: string) => {
    setText(raw);

    const parsed = parseTime(raw, meridiem);
    if (parsed) {
      setLastValid(parsed);
      onChange(parsed.value);
    }
  };

  const handleMeridiemChange = (next: 'AM' | 'PM') => {
    setMeridiem(next);

    const parsed = parseTime(text, next) ?? (text.trim() ? null : {
      hour: 12,
      minute: 0,
      meridiem: next,
      value: `${pad(next === 'PM' ? 12 : 0)}:00`,
    });

    if (parsed) {
      setLastValid(parsed);
      setText(formatDisplay(parsed.hour, parsed.minute, parsed.meridiem));
      onChange(parsed.value);
    }
  };

  const handleBlur = () => {
    if (lastValid) {
      setText(formatDisplay(lastValid.hour, lastValid.minute, lastValid.meridiem));
      return;
    }

    setText('');
  };

  return (
    <div className="w-full">
      <label className="field-label">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>

      <div className="relative">
        <FaClock
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
          aria-hidden="true"
        />

        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(event) => handleTextChange(event.target.value)}
          onBlur={handleBlur}
          placeholder="যেমন: 2:30 PM"
          aria-label={`${label} (12 ঘণ্টার ফরম্যাটে)`}
          className={`form-control w-full pl-10 pr-[104px] ${
            error ? 'border-[#EF4444]' : ''
          }`}
        />

        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 overflow-hidden rounded-[8px] border border-[#E5E9EF] bg-white">
          {(['AM', 'PM'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleMeridiemChange(option)}
              aria-pressed={meridiem === option}
              className={`px-2.5 py-1 text-[12px] font-bold transition ${
                meridiem === option
                  ? 'bg-[#EB601B] text-white'
                  : 'text-[#64748B] hover:text-[#C14A0E]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
};

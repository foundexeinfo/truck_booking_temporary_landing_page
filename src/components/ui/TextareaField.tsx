"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BookingFormData } from "@/types/booking";

interface TextareaFieldProps {
  label: string;
  name: keyof BookingFormData;
  placeholder?: string;
  rows?: number;
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export default function TextareaField({
  label,
  name,
  placeholder,
  rows = 4,
  register,
  errors,
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name]?.message as string}</span>
      )}
    </div>
  );
}
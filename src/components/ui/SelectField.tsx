import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface SelectFieldProps {
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  placeholder = 'নির্বাচন করুন',
  registration,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-bold text-[#182230]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        disabled={disabled}
        {...registration}
        className={`form-control w-full rounded-xl px-3.5 py-3 text-sm text-[#182230] ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : ''
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};
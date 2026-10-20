import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  registration,
  error,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-bold text-[#182230]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        className={`form-control w-full rounded-xl px-3.5 py-3 text-sm text-[#182230] placeholder:text-slate-400 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : ''
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};
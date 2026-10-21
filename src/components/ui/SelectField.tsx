import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa';

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
      <label className="field-label">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <div className="relative">
        <select
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          {...registration}
          className="form-control w-full appearance-none pr-10"
        >
          <option value="">{placeholder}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FaChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
          aria-hidden="true"
        />
      </div>
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error.message}</p>}
    </div>
  );
};

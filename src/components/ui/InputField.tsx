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
      <label className="field-label">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        {...registration}
        className="form-control w-full"
      />
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error.message}</p>}
    </div>
  );
};

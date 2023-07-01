import { cn } from '@/utils/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor="input" className="text-[#695846] font-semibold mb-2 text-sm">
          {label}
        </label>
      )}
      <input
        type="text"
        id="input"
        className={cn(
          'bg-[#FBFBFB] focus:outline-[#695846] rounded-md p-4 text-[#695846] text-sm',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;

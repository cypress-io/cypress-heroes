import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  expand?: 'inline-block' | 'full';
  errorMessage?: string;
}

export const InputField: React.FC<InputFieldProps> = React.forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ errorMessage, expand = 'inline-block', label, ...props }, ref) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-500">
        {label}
        <input
          {...props}
          ref={ref}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
            expand === 'full' ? 'w-full' : ''
          }`}
        />
      </label>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
});

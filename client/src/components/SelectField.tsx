import React from 'react';

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errorMessage?: string;
}

export const SelectField: React.FC<SelectFieldProps> = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(({ errorMessage, label, children, ...props }, ref) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-500">
        {label}
        <select
          {...props}
          ref={ref}
          data-cy={`${props.name}Select`}
          className={
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5'
          }
        >
          {children}
        </select>
      </label>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
});

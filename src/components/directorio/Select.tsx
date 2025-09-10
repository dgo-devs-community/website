import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
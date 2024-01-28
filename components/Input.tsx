import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input = ({ label, name, ...restProps }: InputProps) => {
  const { value } = restProps;
  const errorMessage = !value && 'Required field';

  return (
    <div className="box-border relative flex flex-col justify-between w-full min-w-0 gap-2">
      <label
        htmlFor={name}
        className="text-sm sm:text-xs text-pallette-green-light"
      >
        {label}
      </label>
      <input
        name={name}
        className={`box-border px-2 py-3 text-sm border-2 rounded-lg peer border-pallette-black bg-pallette-green-light 
                  focus:bg-pallette-green-light focus:ring-blue-200 ${
                    errorMessage && 'border-red-600 ring ring-red-300  bg-red-50'
                  }`}
        {...restProps}
      />
      {errorMessage && (
        <div className="absolute peer-focus-within:hidden -bottom-7">
          <div className="w-0 h-0 -mb-1 border-b-4 border-x-4 border-x-transparent border-b-pallette-green-light"></div>
          <p className="inline px-1 py-0.5 text-xs text-red-600 rounded-sm bg-pallette-green-light">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;

'use client';

import React from 'react';

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

const DurationToggle = ({ label, onChange, value }: ToggleProps) => {
  const monthlyActive = value;
  const yearlyActive = !value;
  return (
    <div className="">
      <p className="text-sm text-pallette-green-light">{label}</p>
      <div className="flex justify-center p-1 text-sm border-2 rounded-lg border-pallette-black bg-pallette-green-light">
        <button
          id="monthly"
          disabled={monthlyActive}
          className={`${monthlyActive && 'bg-pallette-green'} w-full px-1 py-2 rounded-md`}
          onClick={() => onChange()}
        >
          Monthly
        </button>
        <button
          id="yearly"
          disabled={yearlyActive}
          className={`${yearlyActive && 'bg-pallette-green'} w-full px-1 py-2 rounded-md`}
          onClick={() => onChange()}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};

export default DurationToggle;

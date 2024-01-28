import React, { PropsWithChildren } from 'react';
import PhoneTemplate from '@/public/phone_template_with_blank_frame_for_design.png';
import Image from 'next/image';

const PhoneMock = ({ children }: PropsWithChildren) => {
  return (
    <div
      id="body"
      className="relative w-full sm:p-3 sm:w-auto"
    >
      <div
        id="screen"
        className="w-full h-screen p-4 sm:h-auto sm:w-72 sm:aspect-iphone bg-calc sm:rounded-2xl"
      >
        {children}
      </div>
      <Image
        src={PhoneTemplate}
        alt="iphone mock body"
        fill
        className="absolute hidden pointer-events-none drop-shadow-xl sm:block"
      />
    </div>
  );
};

export default PhoneMock;

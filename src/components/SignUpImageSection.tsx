import React from 'react';
import { SignUpForm } from './SignUpForm';
import { Partner } from '../types/partner';

interface SignUpImageSectionProps {
  partner: Partner | null;
}

export const SignUpImageSection: React.FC<SignUpImageSectionProps> = ({ partner }) => {
  return (
    <div className="relative h-[400px] sm:h-[700px] lg:h-[800px]">
      {/* Lifestyle Image with Curved Mask */}
      <img
        src="https://clientslx.b-cdn.net/SalesLabX/Untitled%20(1152%20x%201000%20px).png"
        alt="Happy couple shopping"
        className="absolute inset-0 w-full h-full object-cover lg:block"
        style={{
          clipPath: window.innerWidth < 640 
            ? "polygon(0 0, 100% 0, 100% 85%, 75% 90%, 50% 95%, 25% 90%, 0 85%)"
            : "polygon(0 0, 100% 0, 100% 75%, 85% 85%, 70% 95%, 50% 100%, 30% 95%, 15% 85%, 0 75%)"
        }}
      />

      {/* Floating Form Card */}
      <SignUpForm partner={partner} />
    </div>
  );
};
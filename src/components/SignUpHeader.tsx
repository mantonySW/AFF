import React from 'react';
import { Partner } from '../types/partner';

interface SignUpHeaderProps {
  partner: Partner | null;
}

export const SignUpHeader: React.FC<SignUpHeaderProps> = ({ partner }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <img
          src="https://slxcloud.app/wp-content/uploads/2025/03/3@4x-2048x1092.png"
          alt="SalesLabX"
          className="h-6 sm:h-8 w-auto object-contain brightness-0 invert"
        />
        {partner && (
          <>
            <div className="w-px h-4 sm:h-6 bg-white/30"></div>
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-6 sm:h-8 w-auto object-contain brightness-0 invert"
            />
          </>
        )}
      </div>
    </header>
  );
};
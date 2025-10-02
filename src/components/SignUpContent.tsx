import React from 'react';

import { Partner } from '../types/partner';

interface SignUpContentProps {
  partner: Partner | null;
}

export const SignUpContent: React.FC<SignUpContentProps> = ({ partner }) => {
  const partnerName = partner?.name || 'Your Platform';
  
  return (
    <div className="text-white flex flex-col justify-start pt-8 lg:pt-16">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] mb-6 sm:mb-8 lg:mb-16 xl:mb-20 lg:-mt-24 xl:-mt-32">
        Unlock More Sales This Season with {partnerName} + Affirm
      </h1>
      <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90 mb-8 sm:mb-12 lg:mb-24 xl:mb-32 max-w-2xl">
        Transform your checkout experience and boost conversions with {partnerName} + Affirm's flexible payment options. Offer flexibility at checkout and turn more browsers into customers.
      </p>

      {/* Stats - Desktop */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-2xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/10">
          <div className="text-xs font-bold text-white/80 mb-2 lg:mb-3 tracking-wider">HIGH USAGE</div>
          <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-3 lg:mb-4">76%</div>
          <div className="text-sm lg:text-base text-white/80 leading-tight">
            of customers would've delayed or not purchased without Affirm
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/10">
          <div className="text-xs font-bold text-white/80 mb-2 lg:mb-3 tracking-wider">LARGER CART SIZES</div>
          <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-3 lg:mb-4">+70%</div>
          <div className="text-sm lg:text-base text-white/80 leading-tight">
            Lift in average order values
          </div>
        </div>
      </div>

    </div>
  );
};
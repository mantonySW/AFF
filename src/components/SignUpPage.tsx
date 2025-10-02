import React, { useState } from 'react';
import { Partner } from '../types/partner';
import { SignUpBackground } from './SignUpBackground';
import { SignUpHeader } from './SignUpHeader';
import { SignUpContent } from './SignUpContent';
import { SignUpImageSection } from './SignUpImageSection';
import { SignUpStats } from './SignUpStats';
import { SignUpFooter } from './SignUpFooter';
import { SignUpForm } from './SignUpForm';

interface SignUpPageProps {
  partner: Partner | null;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ partner }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    website: '',
    country: '',
    annualRevenue: '',
    ecommercePlatform: '',
    averageOrderValue: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const partnerName = partner?.name || 'our partner';

  return (
    <div>
      <SignUpBackground>
        <SignUpHeader partner={partner} />
        
        {/* Mobile Layout (below lg breakpoint) */}
        <div className="lg:hidden relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
          {/* Mobile Hero Content */}
          <div className="mb-8">
            <SignUpContent partner={partner} />
          </div>
          
          {/* Mobile Form - Full Width */}
          <div className="w-full max-w-md mx-auto">
            <SignUpForm partner={partner} />
          </div>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:block relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-40 xl:pt-48 pb-20 xl:pb-24">
          <div className="grid grid-cols-2 gap-24 xl:gap-32">
            {/* Left Side - Hero Content */}
            <div>
              <SignUpContent partner={partner} />
            </div>

            {/* Right Side - Image with Form */}
            <div>
              <SignUpImageSection partner={partner} />
            </div>
          </div>
        </div>
      </SignUpBackground>


      {/* Mobile Stats */}
      <section className="lg:hidden bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-[#7C59FF]/5 to-[#5D3FD6]/5 rounded-2xl p-4 sm:p-6 border border-[#7C59FF]/10">
              <div className="text-xs font-bold text-[#3B247E]/80 mb-2 sm:mb-3 tracking-wider">HIGH USAGE</div>
              <div className="text-xl sm:text-2xl font-black text-[#3B247E] mb-3 sm:mb-4">76%</div>
              <div className="text-sm text-gray-700 leading-tight">
                of customers would've delayed or not purchased without Affirm
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7C59FF]/5 to-[#5D3FD6]/5 rounded-2xl p-4 sm:p-6 border border-[#7C59FF]/10">
              <div className="text-xs font-bold text-[#3B247E]/80 mb-2 sm:mb-3 tracking-wider">LARGER CART SIZES</div>
              <div className="text-xl sm:text-2xl font-black text-[#3B247E] mb-3 sm:mb-4">+70%</div>
              <div className="text-sm text-gray-700 leading-tight">
                Lift in average order values
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SignUpFooter />
    </div>
  );
};
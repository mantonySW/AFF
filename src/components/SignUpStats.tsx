import React from 'react';

export const SignUpStats: React.FC = () => {
  return (
    <section className="lg:hidden bg-white py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-[#7C59FF]/5 to-[#5D3FD6]/5 rounded-2xl p-12 border border-[#7C59FF]/10">
            <div className="text-xs font-bold text-[#3B247E]/80 mb-4 tracking-wider">HIGH USAGE</div>
            <div className="text-3xl sm:text-4xl font-black text-[#3B247E] mb-8">76%</div>
            <div className="text-sm sm:text-base text-gray-700 leading-tight">
              of customers would've delayed or not purchased without Affirm
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#7C59FF]/5 to-[#5D3FD6]/5 rounded-2xl p-12 border border-[#7C59FF]/10">
            <div className="text-xs font-bold text-[#3B247E]/80 mb-4 tracking-wider">LARGER CART SIZES</div>
            <div className="text-3xl sm:text-4xl font-black text-[#3B247E] mb-8">+70%</div>
            <div className="text-sm sm:text-base text-gray-700 leading-tight">
              Lift in average order values
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
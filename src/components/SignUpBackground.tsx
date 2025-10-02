import React from 'react';

interface SignUpBackgroundProps {
  children: React.ReactNode;
}

export const SignUpBackground: React.FC<SignUpBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Adjusted min-height to prevent excessive empty space */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Purple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B247E] via-[#5D3FD6] to-[#7C59FF]"></div>
        
        {/* Geometric Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none">
            <path d="M0 0L800 0L600 400L0 300Z" fill="rgba(255,255,255,0.08)" />
            <path d="M1440 0L1440 500L900 600L1200 200Z" fill="rgba(0,0,0,0.12)" />
            <path d="M400 900L1000 900L800 500L300 700Z" fill="rgba(255,255,255,0.06)" />
          </svg>
        </div>

        {children}
      </section>
    </div>
  );
};
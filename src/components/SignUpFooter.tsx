import React from 'react';

export const SignUpFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#3B247E] to-[#5D3FD6] py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/80 font-calibre">
            © 2025 Affirm, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80 font-calibre">Powered by</span>
            <a
              href="https://www.saleslabx.com/?utm_source=affirm&utm_medium=partner_hub&utm_campaign=footer_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://slxcloud.app/wp-content/uploads/2024/03/SLX-logo-white.png"
                alt="SLX"
                className="h-4 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
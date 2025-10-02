import React, { useState } from 'react';
import { Partner } from '../types/partner';
import { Mail, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface NewsletterTemplateCardProps {
  partner: Partner;
  onCopy?: () => void;
}

export const NewsletterTemplateCard: React.FC<NewsletterTemplateCardProps> = ({ partner, onCopy }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const signupUrl = `https://afbushub.slxbox.com/signup?par=${partner.code}`;

  const emailTemplate = {
    subject: 'Amplify Black Friday sales with pay-over-time',
    preheader: 'Attract more customers with flexible payment options.',
    body: `Give your customers a flexible way to shop this Black Friday. With Affirm, shoppers can break up the total cost of their purchase over time—with no hidden or late fees.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    ctaUrl: signupUrl,
    disclosure: ``
  };

  const handleCopyTemplate = () => {
    const fullTemplate = `Subject: ${emailTemplate.subject}
Preheader: ${emailTemplate.preheader}

${emailTemplate.body}

${emailTemplate.cta}: ${emailTemplate.ctaUrl}

${emailTemplate.disclosure}`;

    navigator.clipboard.writeText(fullTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    });
  };

  return (
    <div className="group bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden hover:shadow-medium hover:border-brand-primary/20 transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <div className="w-full h-52 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300">
          <div className="text-center text-white">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <div className="text-xl font-axiforma">Newsletter Template</div>
            <div className="text-sm opacity-80 mt-1">Customer Feature</div>
          </div>
        </div>
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm text-purple-600 rounded-2xl text-xs font-axiforma border border-purple-600/20 shadow-card">
          NEWSLETTER
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-axiforma text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          Newsletter Feature Template
        </h3>

        {/* Template Details */}
        <div className="mb-6 space-y-2 text-xs font-calibre text-gray-600">
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">Subject:</span> {emailTemplate.subject}
          </div>
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">Type:</span> Newsletter Feature
          </div>
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">Partner:</span> {partner.name}
          </div>
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">CTA URL:</span> Partner Signup Page
          </div>
        </div>

        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex items-center justify-center gap-2 mb-6 py-3 bg-gray-50 text-gray-700 rounded-2xl font-calibre text-sm hover:bg-gray-100 transition-colors"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>

        {/* Email Preview */}
        {showPreview && (
          <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-sm font-calibre text-gray-800 max-h-48 overflow-y-auto">
            <div className="mb-2">
              <strong>Subject:</strong> {emailTemplate.subject}
            </div>
            <div className="mb-2">
              <strong>Preheader:</strong> {emailTemplate.preheader}
            </div>
            <div className="mb-3 border-t border-gray-200 pt-3">
              <div className="whitespace-pre-line">{emailTemplate.body}</div>
            </div>
            <div className="mb-2">
              <a 
                href={emailTemplate.ctaUrl} 
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors shadow-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                {emailTemplate.cta}
              </a>
            </div>
            <div className="text-xs text-gray-500 border-t border-gray-200 pt-3">
              <div className="whitespace-pre-line">{emailTemplate.disclosure}</div>
            </div>
          </div>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopyTemplate}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-6 rounded-2xl font-axiforma hover:bg-purple-700 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 mb-6 shadow-card hover:shadow-medium"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied Template!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Newsletter Template
            </>
          )}
        </button>

        {/* Usage Instructions */}
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs font-calibre text-gray-600">
            <strong>Usage:</strong> Use as newsletter content or customer communication. CTA links to your {partner.name} signup page.
          </p>
        </div>
      </div>
    </div>
  );
};
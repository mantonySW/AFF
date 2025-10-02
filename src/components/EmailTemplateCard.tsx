import React, { useState } from 'react';
import { Partner } from '../types/partner';
import { Mail, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface EmailTemplateCardProps {
  partner: Partner;
  onCopy?: () => void;
}

export const EmailTemplateCard: React.FC<EmailTemplateCardProps> = ({ partner, onCopy }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const signupUrl = `https://afbushub.slxbox.com/signup?par=${partner.code}`;

  const emailTemplate = {
    subject: 'Amplify Black Friday sales with pay-over-time',
    preheader: 'Attract more customers with flexible payment options.',
    body: `Hi %%first_name%%,

More customers than ever are looking for flexible ways to shop during the holiday season. With Affirm, you can offer a top-rated pay-over-time solution that lets shoppers get what they want now and pay over time—with no hidden or late fees.

Affirm is helping merchants across industries increase revenue, and drive loyalty. Merchants using Affirm see:
• Up to 70% higher average order values.¹
• Access to 50M+ high-intent shoppers in the Affirm network.²
• Happier customers who return thanks to transparent, flexible payments options.

This holiday, %%company%% can benefit from ${partner.name}'s simple integration with Affirm, making it easier than ever to add flexible payment options and boost holiday sales.

Ready to get started?`,
    cta: 'Learn More',
    ctaUrl: signupUrl,
    disclosure: `¹As reported by Affirm (2024)
²reported by Affirm (2024 shareholder letter)

Payment options through Affirm are subject to an eligibility check, may not be available everywhere, and are provided by these lending partners: affirm.com/lenders. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license.`
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
        <div className="w-full h-52 bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center group-hover:from-brand-dark group-hover:to-brand-primary transition-all duration-300">
          <div className="text-center text-white">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <div className="text-xl font-axiforma">Email Template</div>
            <div className="text-sm opacity-80 mt-1">Email One</div>
          </div>
        </div>
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm text-brand-primary rounded-2xl text-xs font-axiforma border border-brand-primary/20 shadow-card">
          TEMPLATE
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-axiforma text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
          Email One Template
        </h3>

        {/* Template Details */}
        <div className="mb-6 space-y-2 text-xs font-calibre text-gray-600">
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">Subject:</span> {emailTemplate.subject}
          </div>
          <div className="text-sm font-calibre text-gray-600">
            <span className="font-axiforma text-gray-800">Type:</span> Email One
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
                className="inline-block px-6 py-3 bg-brand-primary text-white rounded-2xl hover:bg-brand-dark transition-colors shadow-card"
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
          className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-4 px-6 rounded-2xl font-axiforma hover:bg-brand-dark transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 mb-6 shadow-card hover:shadow-medium"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied Template!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Email Template
            </>
          )}
        </button>

        {/* Usage Instructions */}
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs font-calibre text-gray-600">
            <strong>Usage:</strong> Replace %%first_name%% and %%company%% with recipient details. CTA links to your {partner.name} signup page.
          </p>
        </div>
      </div>
    </div>
  );
};
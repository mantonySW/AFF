import React, { useState } from 'react';
import { Asset, Partner } from '../types/partner';
import { X, Download, Copy, Check, Eye, Mail, Tag, Calendar } from 'lucide-react';

interface AssetViewerProps {
  asset: Asset | null;
  partner: Partner;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (asset: Asset) => void;
  onCopy?: (asset: Asset) => void;
}

// Email template content for copying
const emailTemplateContent = {
  'merchant-caption-option-1': {
    subject: 'Merchant Caption Option 1',
    preheader: '',
    body: `Help your customers navigate Black Friday spending with Affirm. Shoppers can spread out their purchases into simple payments, while you get paid upfront.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    disclosure: ''
  },
  'merchant-caption-option-2': {
    subject: 'Merchant Caption Option 2',
    preheader: '',
    body: `With Affirm, your customers can shop more confidently this holiday season—splitting purchases into simple payments while you get paid upfront. Available now with your [PARTNER_NAME] plan.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    disclosure: ''
  },
  'caption-option-1': {
    subject: 'Caption Option 1',
    preheader: '',
    body: `This Black Friday, grow your business with Affirm. Attract more customers, expand your reach, and offer a transparent way to pay over time.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    disclosure: ''
  },
  'caption-option-2': {
    subject: 'Caption Option 2',
    preheader: '',
    body: `This Black Friday, give shoppers the flexibility they want. With Affirm, you'll lift sales, attract more customers, and boost loyalty.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    disclosure: ''
  },
  'email-template-one': {
    subject: 'Amplify Black Friday sales with pay-over-time',
    preheader: 'Attract more customers with flexible payment options.',
    body: `Hi %%first_name%%,

More customers than ever are looking for flexible ways to shop during the holiday season. With Affirm, you can offer a top-rated pay-over-time solution that lets shoppers get what they want now and pay over time—with no hidden or late fees.

Affirm is helping merchants across industries increase revenue, and drive loyalty. Merchants using Affirm see:
• Up to 70% higher average order values.¹
• Access to 50M+ high-intent shoppers in the Affirm network.²
• Happier customers who return thanks to transparent, flexible payments options.

This holiday, %%company%% can benefit from [PARTNER_NAME]'s simple integration with Affirm, making it easier than ever to add flexible payment options and boost holiday sales.

Ready to get started?`,
    cta: 'Learn More',
    disclosure: `¹As reported by Affirm (2024)
²reported by Affirm (2024 shareholder letter)

Payment options through Affirm are subject to an eligibility check, may not be available everywhere, and are provided by these lending partners: affirm.com/lenders. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license.`
  },
  'email-template-newsletter': {
    subject: 'Amplify Black Friday sales with pay-over-time',
    preheader: 'Attract more customers with flexible payment options.',
    body: `Give your customers a flexible way to shop this Black Friday. With Affirm, shoppers can break up the total cost of their purchase over time—with no hidden or late fees.

*Subject to eligibility. See lending terms at affirm.com/disclosures`,
    cta: 'Learn More',
    disclosure: ``
  },
  'email-template-two': {
    subject: 'There\'s still time to get holiday ready with Affirm',
    preheader: 'Give shoppers more flexibility and increased spending power.',
    body: `Hi %%first_name%%,

Black Friday is around the corner, which brings more traffic but also more competition. Shoppers want flexibility at checkout, and without it, carts are more likely to be abandoned.

With Affirm, %%company%% can offer customers a transparent way to pay over time, with no hidden or late fees.

[PARTNER_NAME]'s integration with Affirm makes setup seamless, so you can be ready in time for peak shopping.

With Affirm, merchants can:

• Lift average order values by 70%¹
• Reduce cart abandonment compared to other BNPL solutions²
• 2x customer spend³ while enjoying repeat business⁴

There's still time to unlock more growth this holiday with Affirm.`,
    cta: 'Learn More',
    disclosure: `¹As reported by Affirm (2024)
² External study from Shopify
³ Emarketer report
⁴ Q4 FY 2024 Earnings Supplement


Payment options through Affirm are subject to an eligibility check, may not be available everywhere, and are provided by these lending partners: affirm.com/lenders. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license.`
  }
};

export const AssetViewer: React.FC<AssetViewerProps> = ({
  asset,
  partner,
  isOpen,
  onClose,
  onDownload,
  onCopy
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !asset) return null;

  const isEmailTemplate = asset.format === 'HTML';
  const isCaptionOption = asset.format === 'TEXT';
  const isTextContent = isEmailTemplate || isCaptionOption;

  const getTemplateColor = (assetId: string) => {
    switch (assetId) {
      case 'email-template-one': return 'from-brand-primary to-brand-dark';
      case 'email-template-newsletter': return 'from-purple-500 to-purple-700';
      case 'email-template-two': return 'from-emerald-500 to-emerald-700';
      default: return 'from-brand-primary to-brand-dark';
    }
  };

  const getTemplateSubtitle = (assetId: string) => {
    switch (assetId) {
      case 'email-template-one': return 'Email One';
      case 'email-template-newsletter': return 'Customer Feature';
      case 'email-template-two': return 'Email Two';
      default: return 'Template';
    }
  };

  const handleCopyTemplate = () => {
    const templateContent = emailTemplateContent[asset.id as keyof typeof emailTemplateContent];
    if (templateContent) {
      const signupUrl = `https://affirmpartnerhub.slxbox.com/signup?par=${partner.code}`;
      const partnerName = partner.name;
      
      // Replace placeholders in the body
      const bodyWithPartner = templateContent.body.replace(/\[PARTNER_NAME\]/g, partnerName);
      
      const fullTemplate = `Subject: ${templateContent.subject}
Preheader: ${templateContent.preheader}

${bodyWithPartner}

${templateContent.cta}: ${signupUrl}

${templateContent.disclosure}`;

      navigator.clipboard.writeText(fullTemplate).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (onCopy) {
          onCopy(asset);
        }
      });
    }
  };

  const handleDownload = () => {
    onDownload(asset);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-brand-primary/10 rounded-xl">
              {isEmailTemplate ? (
                <Mail className="w-6 h-6 text-brand-primary" />
              ) : (
                <Eye className="w-6 h-6 text-brand-primary" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-axiforma text-gray-900">{asset.title}</h2>
              <p className="text-sm font-calibre text-gray-600">{partner.name} Asset</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(95vh-80px)]">
          {/* Left Side - Asset Preview */}
          <div className="flex-1 p-8 overflow-y-auto">
            {isTextContent ? (
              <div className="space-y-6">
                {/* Template Content */}
                {(() => {
                  const templateContent = emailTemplateContent[asset.id as keyof typeof emailTemplateContent];
                  if (!templateContent) return null;

                  const signupUrl = `https://affirmpartnerhub.slxbox.com/signup?par=${partner.code}`;
                  const partnerName = partner.name;
                  const bodyWithPartner = templateContent.body.replace(/\[PARTNER_NAME\]/g, partnerName);

                  return (
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                      <h3 className="text-lg font-axiforma text-gray-900 mb-4">{isCaptionOption ? 'Caption Content' : 'Email Content Preview'}</h3>
                      
                      <div className="space-y-3 text-sm font-calibre">
                        {!isCaptionOption && <div>
                          <span className="font-axiforma text-gray-800">Subject:</span>
                          <div className="mt-1 p-3 bg-white rounded-xl border border-gray-200">
                            {templateContent.subject}
                          </div>
                        </div>}
                        
                        {!isCaptionOption && <div>
                          <span className="font-axiforma text-gray-800">Preheader:</span>
                          <div className="mt-1 p-3 bg-white rounded-xl border border-gray-200">
                            {templateContent.preheader}
                          </div>
                        </div>}
                        
                        <div>
                          <span className="font-axiforma text-gray-800">{isCaptionOption ? 'Caption:' : 'Body:'}</span>
                          <div className="mt-1 p-4 bg-white rounded-xl border border-gray-200 max-h-48 overflow-y-auto">
                            <div className="whitespace-pre-line text-gray-700">
                              {bodyWithPartner}
                            </div>
                          </div>
                        </div>
                        
                        {!isCaptionOption && <div>
                          <span className="font-axiforma text-gray-800">Call to Action:</span>
                          <div className="mt-1 p-3 bg-white rounded-xl border border-gray-200">
                            <a 
                              href={signupUrl} 
                              className="inline-block px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-dark transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {templateContent.cta}
                            </a>
                          </div>
                        </div>}
                        
                        {!isCaptionOption && templateContent.disclosure && <div>
                          <span className="font-axiforma text-gray-800">Disclosure:</span>
                          <div className="mt-1 p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 whitespace-pre-line">
                            {templateContent.disclosure}
                          </div>
                        </div>}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center min-h-96">
                  <img
                    src={asset.thumbnail}
                    alt={asset.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-medium"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Asset Details & Actions */}
          <div className="w-full lg:w-96 bg-gray-50 p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Asset Info */}
              <div>
                <h3 className="text-lg font-axiforma text-gray-900 mb-4">Asset Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-calibre">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900 capitalize">{asset.category}</span>
                  </div>
                  
                  {!isEmailTemplate && (
                    <>
                      <div className="flex items-center gap-3 text-sm font-calibre">
                        <span className="w-4 h-4 flex items-center justify-center">
                          <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                        </span>
                        <span className="text-gray-600">Dimensions:</span>
                        <span className="text-gray-900">{asset.dimensions}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm font-calibre">
                        <span className="w-4 h-4 flex items-center justify-center">
                          <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                        </span>
                        <span className="text-gray-600">Format:</span>
                        <span className="text-gray-900">{asset.format}</span>
                      </div>
                    </>
                  )}

                  {asset.platform && (
                    <div className="flex items-center gap-3 text-sm font-calibre">
                      <span className="w-4 h-4 flex items-center justify-center">
                        <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                      </span>
                      <span className="text-gray-600">Platform:</span>
                      <span className="text-gray-900">{asset.platform}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-axiforma text-gray-900 mb-3">Description</h3>
                <p className="text-sm font-calibre text-gray-700 leading-relaxed">
                  {asset.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                {isTextContent ? (
                  <button
                    onClick={handleCopyTemplate}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-4 px-6 rounded-2xl font-axiforma hover:bg-brand-dark transition-all duration-200 shadow-card hover:shadow-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied Template!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        {isCaptionOption ? 'Copy Caption' : 'Copy Email Template'}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-4 px-6 rounded-2xl font-axiforma hover:bg-brand-dark transition-all duration-200 shadow-card hover:shadow-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download Asset
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-calibre hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Usage Guidelines */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <h4 className="text-sm font-axiforma text-gray-900 mb-2">Usage Guidelines</h4>
                <p className="text-xs font-calibre text-gray-600 leading-relaxed">
                  {isCaptionOption
                    ? "Use this caption for your social media posts to promote Affirm's flexible payment options during Black Friday."
                    : isEmailTemplate 
                    ? "Replace %%first_name%% and %%company%% with recipient details. Use this pre-approved template without edits to drive partnership awareness."
                    : "Use this co-branded asset to promote Affirm's flexible payment options. Maintain brand guidelines and include required disclosures."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Asset, Partner } from '../types/partner';
import { Eye, Tag, Mail } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  partner: Partner;
  onView: (asset: Asset) => void;
  onView?: (asset: Asset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, partner, onView }) => {
  // Track view when component mounts (asset comes into view)
  React.useEffect(() => {
    // This effect can be used for analytics tracking if needed
  }, [asset]);

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

  return (
    <div className="group bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden hover:shadow-medium hover:border-brand-primary/20 transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        {isTextContent ? (
          <div className={`w-full h-52 bg-gradient-to-br ${getTemplateColor(asset.id)} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <div className="text-center text-white">
              {isCaptionOption ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 opacity-90 flex items-center justify-center bg-white/20 rounded-2xl">
                    <span className="text-2xl font-bold">Aa</span>
                  </div>
                  <div className="text-xl font-axiforma">Caption Option</div>
                </>
              ) : (
                <>
                  <Mail className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <div className="text-xl font-axiforma">Email Template</div>
                </>
              )}
              <div className="text-sm opacity-80 mt-1">{getTemplateSubtitle(asset.id)}</div>
            </div>
          </div>
        ) : (
          <img
            src={asset.thumbnail}
            alt={asset.title}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm text-brand-primary rounded-2xl text-xs font-axiforma border border-brand-primary/20 shadow-card">
          {isTextContent ? (isCaptionOption ? 'CAPTION' : 'TEMPLATE') : (asset.platform || asset.category.toUpperCase())}
        </div>
        
        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onView(asset)}
            className="bg-white text-brand-primary px-6 py-3 rounded-2xl font-axiforma shadow-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-primary hover:text-white"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-axiforma text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
          {asset.title}
        </h3>
        <p className="text-gray-600 font-calibre mb-6 text-sm leading-relaxed">
          {asset.description}
        </p>

        {/* Asset Details */}
        {!isTextContent && (
          <div className="mb-6 flex items-center gap-4 text-xs font-calibre text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              {asset.dimensions}
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              {asset.format}
            </div>
          </div>
        )}

        {isTextContent && (
          <div className="mb-6 flex items-center gap-4 text-xs font-calibre text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              {asset.format}
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              {isCaptionOption ? 'Social Media Caption' : 'Ready to Copy'}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {asset.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-calibre rounded-xl"
            >
              {tag}
            </span>
          ))}
          {asset.tags.length > 2 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-calibre rounded-xl">
              +{asset.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onView(asset)}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-4 px-6 rounded-2xl font-axiforma hover:bg-brand-dark transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 shadow-card hover:shadow-medium"
        >
          <Eye className="w-4 h-4" />
          View Asset
        </button>
      </div>
    </div>
  );
};
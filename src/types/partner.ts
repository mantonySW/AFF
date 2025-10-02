import React, { useState, useMemo } from 'react';
import { Asset, Partner, AssetCategory, AssetAnalytics } from '../types/partner';
import { AssetCard } from './AssetCard';
import { EmailTemplate } from './EmailTemplate';
import { Search, Filter, Grid, List, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface AssetGridProps {
  assets: Asset[];
  partner: Partner;
  categories: AssetCategory[];
  onDownload: (asset: Asset) => void;
  onAssetView?: (asset: Asset) => void;
  onAssetCopy?: (asset: Asset) => void;
}

export const AssetGrid: React.FC<AssetGridProps> = ({
  assets,
  partner,
  categories,
  onDownload,
  onAssetView,
  onAssetCopy
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['email', 'merchant-dashboard', 'social-media']));

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [assets, searchTerm, selectedCategory]);

  const handleCopySignupUrl = () => {
    const signupUrl = `${window.location.origin}/signup?par=${partner.code}`;
    navigator.clipboard.writeText(signupUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4 border border-gray-300 p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-300 pb-4">
        <div className="flex items-center gap-3">
          <img
            src={partner.logo}
            alt={partner.name}
            className="w-12 h-6 border border-gray-400 object-contain bg-white p-1"
          />
          <div>
            <h1 className="text-xl font-mono text-black border border-gray-400 inline-block px-2 py-1">
              {partner.name} Assets
            </h1>
            <p className="text-black text-sm mt-1">Co-branded marketing materials</p>
          </div>
        </div>

        <div className="flex items-center gap-1 border border-gray-400 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 border border-gray-400 ${
              viewMode === 'grid' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 border border-gray-400 ${
              viewMode === 'list' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Partner Signup CTA */}
      <div className="bg-white border-2 border-gray-400 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-mono text-black mb-2 border-b border-gray-300 pb-1">
              Share Your Partner Signup Page
            </h3>
            <p className="text-black text-sm">
              Get your co-branded signup page to share with potential merchants
            </p>
          </div>
          <button
            onClick={handleCopySignupUrl}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-mono hover:bg-black hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Partner Signup URL
              </>
            )}
          </button>
        </div>
      </div>

      {/* Email Template Section */}
      <div className="bg-white border-2 border-gray-400 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-mono text-black border-b border-gray-300 pb-1">
              Email Templates
            </h3>
            <p className="text-black text-sm mt-1">
              Ready-to-use email templates with dynamic partner branding
            </p>
          </div>
          <button
            onClick={() => setShowEmailTemplate(!showEmailTemplate)}
            className="px-4 py-2 bg-white border-2 border-black text-black font-mono hover:bg-black hover:text-white"
          >
            {showEmailTemplate ? 'Hide Template' : 'View Email Template'}
          </button>
        </div>
        
        {showEmailTemplate && (
          <div className="mt-6">
            <EmailTemplate partner={partner} />
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 border border-gray-300 p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-400 bg-white text-black font-mono focus:border-black focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 border border-gray-400 px-2">
          <Filter className="text-black w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-2 border-0 bg-white text-black font-mono focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <p className="text-black font-mono text-sm">
          {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Asset Grid */}
      {filteredAssets.length === 0 ? (
        <div className="text-center py-8 border border-gray-300">
          <div className="text-black mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-mono text-black mb-2">No assets found</h3>
          <p className="text-black text-sm">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              partner={partner}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
};
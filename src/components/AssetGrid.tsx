import React, { useState, useMemo, useCallback } from 'react';
import { Asset, Partner, AssetCategory } from '../types/partner';
import { AssetCard } from './AssetCard';
import { AssetViewer } from './AssetViewer';
import { Search, Mail, Monitor, Share2, ChevronDown, ChevronRight, Copy, Check, Filter, Grid2x2 as Grid, X } from 'lucide-react';

// Floating Usage Guidelines Component
const FloatingUsageGuidelines: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-dark px-4 py-3 text-left hover:from-brand-dark hover:to-brand-primary transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-axiforma text-white flex items-center gap-2">
              Important Usage Guidelines
            </h3>
            <div className="text-white">
              {isExpanded ? (
                <X className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          </div>
        </button>
        
        {/* Expandable Content */}
        {isExpanded && (
          <div className="p-4 bg-gray-50/50">
            <p className="font-calibre text-gray-800 leading-relaxed text-xs">
              Please use this pre-approved template, without edits, to drive awareness of the partnership and showcase the business benefits of adding Affirm as a pay-over-time option at checkout, prior to the holiday shopping rush.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface AssetGridProps {
  assets: Asset[];
  partner: Partner;
  categories: AssetCategory[];
  onDownload: (asset: Asset) => void;
  onAssetView?: (asset: Asset) => void;
  onAssetCopy?: (asset: Asset) => void;
}

// Email template content for copying
const emailTemplateContent = {
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['email', 'merchant-dashboard', 'social-media']));
  const [expandedSocialPlatforms, setExpandedSocialPlatforms] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Create virtual email template assets
  const emailTemplateAssets: Asset[] = useMemo(() => [
    {
      id: 'email-template-one',
      title: 'Email One Template',
      description: '',
      type: 'email',
      category: 'email',
      subcategory: 'email-templates',
      thumbnail: '',
      downloadUrl: '',
      tags: ['email', 'template', 'outreach', 'holiday'],
      dimensions: '',
      format: 'HTML'
    },
    {
      id: 'email-template-newsletter',
      title: 'Newsletter Feature Template',
      description: '',
      type: 'email',
      category: 'email',
      subcategory: 'email-templates',
      thumbnail: '',
      downloadUrl: '',
      tags: ['email', 'template', 'newsletter', 'black-friday'],
      dimensions: '',
      format: 'HTML'
    },
    {
      id: 'email-template-two',
      title: 'Email Two Template',
      description: '',
      type: 'email',
      category: 'email',
      subcategory: 'email-templates',
      thumbnail: '',
      downloadUrl: '',
      tags: ['email', 'template', 'follow-up', 'cart-abandonment', 'black-friday'],
      dimensions: '',
      format: 'HTML'
    }
  ], []);

  // Combine all assets (regular assets + email templates)
  const allAvailableAssets = useMemo(() => {
    return [...assets, ...emailTemplateAssets];
  }, [assets, emailTemplateAssets]);

  // First filter: Apply search term only (used for category counts)
  const searchMatchedAssets = useMemo(() => {
    return allAvailableAssets.filter((asset) => {
      const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }, [allAvailableAssets, searchTerm]);

  // Track asset views when they come into viewport
  const handleAssetInView = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
    setIsViewerOpen(true);
  }, []);

  // Track asset views for analytics
  const handleAssetAnalyticsView = useCallback((asset: Asset) => {
    if (onAssetView) {
      onAssetView(asset);
    }
  }, [onAssetView]);

  // Handle opening asset viewer
  const handleViewAsset = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
    setIsViewerOpen(true);
    handleAssetAnalyticsView(asset);
  }, [handleAssetAnalyticsView]);

  // Handle closing asset viewer
  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
    setSelectedAsset(null);
  }, []);

  // Second filter: Apply both search term and category filter (used for display)
  const filteredAssets = useMemo(() => {
    return searchMatchedAssets.filter((asset) => {
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      return matchesCategory;
    });
  }, [searchMatchedAssets, selectedCategory]);

  const groupedAssets = useMemo(() => {
    const groups = filteredAssets.reduce((acc, asset) => {
      if (!acc[asset.category]) {
        acc[asset.category] = [];
      }
      acc[asset.category].push(asset);
      return acc;
    }, {} as Record<string, Asset[]>);

    return groups;
  }, [filteredAssets]);

  // Calculate accurate counts for categories and subcategories
  const getCategoryCount = useCallback((categoryId: string) => {
    if (categoryId === 'all') {
      return searchMatchedAssets.length;
    }
    return searchMatchedAssets.filter(asset => asset.category === categoryId).length;
  }, [searchMatchedAssets]);

  const getPlatformCount = useCallback((platform: string) => {
    return searchMatchedAssets.filter(asset => 
      asset.category === 'social-media' && 
      asset.platform === platform
    ).length;
  }, [searchMatchedAssets]);

  const getSubcategoryCount = useCallback((categoryId: string, subcategory: string) => {
    return searchMatchedAssets.filter(asset => 
      asset.category === categoryId && 
      asset.subcategory === subcategory
    ).length;
  }, [searchMatchedAssets]);
  // Handle email template copying
  const handleEmailTemplateCopy = useCallback((asset: Asset) => {
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
        console.log(`Copied ${asset.title} template`);
        if (onAssetCopy) {
          onAssetCopy(asset);
        }
      });
    }
  }, [partner, onAssetCopy]);

  const handleCopySignupUrl = () => {
    const signupUrl = `https://affirmpartnerhub.slxbox.com/signup?par=${partner.code}`;
    navigator.clipboard.writeText(signupUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSocialPlatform = (platform: string) => {
    const newExpanded = new Set(expandedSocialPlatforms);
    if (newExpanded.has(platform)) {
      newExpanded.delete(platform);
    } else {
      newExpanded.add(platform);
    }
    setExpandedSocialPlatforms(newExpanded);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'email': return Mail;
      case 'merchant-dashboard': return Monitor;
      case 'social-media': return Share2;
      default: return Mail;
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case 'email': return 'Email Marketing';
      case 'merchant-dashboard': return 'Merchant Dashboard';
      case 'social-media': return 'Social Media';
      default: return categoryId;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <img
                  src="https://slxcloud.app/wp-content/uploads/2025/03/3@4x-2048x1092.png"
                  alt="SalesLabX"
                  className="h-8 w-auto object-contain"
                />
                <div className="w-px h-6 bg-gray-300"></div>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto object-contain"
                />
              </div>
              
              <div className="border-l border-gray-200 pl-8">
                <h1 className="text-2xl font-axiforma text-gray-900">
                  {partner.name} Asset Library
                </h1>
                <p className="text-sm text-gray-500 font-calibre">Co-branded marketing resources</p>
              </div>
            </div>

            <button
              onClick={handleCopySignupUrl}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl font-axiforma hover:bg-brand-dark transition-all duration-200 shadow-card hover:shadow-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Signup URL
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8 p-8">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-soft p-8 sticky top-32">
            {/* Search */}
            <div className="mb-8">
              <label className="block text-sm font-axiforma text-gray-700 mb-4">
                Search Assets
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50 text-gray-900 font-calibre focus:border-brand-primary focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-axiforma text-gray-700 mb-4">
                Categories
              </label>
              
              {/* All Categories Option */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl mb-3 transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-brand-primary text-white shadow-medium'
                    : 'hover:bg-gray-50 text-gray-700 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Grid className="w-5 h-5" />
                  <span className="font-calibre">All Assets</span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  selectedCategory === 'all' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getCategoryCount('all')}
                </span>
              </button>

              {/* Individual Categories */}
              <div className="space-y-2">
                {categories.map((category) => {
                  const CategoryIcon = getCategoryIcon(category.id);
                  const isSelected = selectedCategory === category.id;
                  const isExpanded = expandedCategories.has(category.id);
                  const categoryCount = getCategoryCount(category.id);
                  
                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          toggleCategory(category.id);
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                          isSelected
                            ? 'bg-brand-primary text-white shadow-medium'
                            : 'hover:bg-gray-50 text-gray-700 border border-gray-100'
                        }`}
                      >
                        <CategoryIcon className="w-5 h-5" />
                        <span className="font-calibre flex-1 text-left">
                          {getCategoryTitle(category.id)}
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full mr-2 ${
                          isSelected 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {categoryCount}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {/* Subcategories for Social Media */}
                      {isExpanded && category.id === 'social-media' && (
                        <div className="ml-6 mt-3 space-y-2">
                          {['LinkedIn', 'Instagram', 'Twitter', 'Facebook', 'Captions'].map(platform => {
                            const platformCount = getPlatformCount(platform);
                            
                            if (platformCount === 0) return null;
                            
                            return (
                              <div
                                key={platform}
                                className="flex items-center justify-between p-3 text-sm text-gray-600 font-calibre bg-gray-50 rounded-xl"
                              >
                                <span>{platform}</span>
                                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                                  {platformCount}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-axiforma text-gray-700 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('email')}
                  className="w-full text-left p-3 text-sm font-calibre text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-all duration-200"
                >
                  View Email Templates
                </button>
                <button
                  onClick={() => setSelectedCategory('social-media')}
                  className="w-full text-left p-3 text-sm font-calibre text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-all duration-200"
                >
                  Browse Social Media Assets
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {filteredAssets.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-soft p-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-axiforma text-gray-900 mb-4">No assets found</h3>
              <p className="text-gray-600 font-calibre text-center max-w-md mx-auto">
                Try adjusting your search terms or browse different categories to find the assets you need.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedAssets).map(([categoryId, categoryAssets]) => {
                const CategoryIcon = getCategoryIcon(categoryId);
                
                return (
                  <div key={categoryId} className="bg-white rounded-3xl shadow-soft p-8">
                    {/* Category Header */}
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                      <div className="p-4 bg-brand-primary/10 rounded-2xl">
                        <CategoryIcon className="w-8 h-8 text-brand-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-axiforma text-gray-900">
                          {getCategoryTitle(categoryId)}
                        </h2>
                        <p className="text-gray-600 font-calibre mt-1">
                          {categoryAssets.length} asset{categoryAssets.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                    </div>

                    {/* Assets Grid */}
                    {categoryId === 'email' ? (
                      // Group email by subcategory
                      <div className="space-y-10">
                        {['Email Banners', 'Email Templates'].map(subcategoryName => {
                          const subcategoryId = subcategoryName === 'Email Banners' ? 'email-banners' : 'email-templates';
                          const subcategoryAssets = categoryAssets.filter(asset => 
                            asset.subcategory === subcategoryId
                          );
                          
                          if (subcategoryAssets.length === 0) return null;
                          
                          const isExpanded = expandedSocialPlatforms.has(`email-${subcategoryId}`);
                          
                          return (
                            <div key={subcategoryId}>
                              <button
                                onClick={() => toggleSocialPlatform(`email-${subcategoryId}`)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200 mb-6"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-3 h-3 bg-brand-primary rounded-full"></span>
                                  <h3 className="text-xl font-axiforma text-gray-800">{subcategoryName}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-full font-calibre">
                                    {subcategoryAssets.length} asset{subcategoryAssets.length !== 1 ? 's' : ''}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                  )}
                                </div>
                              </button>
                              
                              {isExpanded && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
                                  {subcategoryAssets.map((asset) => (
                                    <AssetCard
                                      key={asset.id}
                                      asset={asset}
                                      partner={partner}
                                      onDownload={onDownload}
                                      onView={handleViewAsset}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : categoryId === 'social-media' ? (
                      // Group social media by platform
                      <div className="space-y-10">
                        {['LinkedIn', 'Instagram', 'Twitter', 'Facebook', 'Captions'].map(platform => {
                          const platformAssets = categoryAssets.filter(asset => 
                            asset.platform === platform
                          );
                          
                          if (platformAssets.length === 0) return null;
                          
                          const isExpanded = expandedSocialPlatforms.has(platform);
                          
                          return (
                            <div key={platform}>
                              <button
                                onClick={() => toggleSocialPlatform(platform)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200 mb-6"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-3 h-3 bg-brand-primary rounded-full"></span>
                                  <h3 className="text-xl font-axiforma text-gray-800">{platform}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-full font-calibre">
                                    {platformAssets.length} asset{platformAssets.length !== 1 ? 's' : ''}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                  )}
                                </div>
                              </button>
                              
                              {isExpanded && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
                                  {platformAssets.map((asset) => (
                                    <AssetCard
                                      key={asset.id}
                                      asset={asset}
                                      partner={partner}
                                      onDownload={onDownload}
                                      onView={handleViewAsset}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : categoryId === 'merchant-dashboard' ? (
                      // Group merchant dashboard by type
                      <div className="space-y-10">
                        {['Banners', 'Captions'].map(type => {
                          const typeAssets = categoryAssets.filter(asset => 
                            type === 'Banners' ? asset.subcategory === 'banners' : asset.platform === 'Captions'
                          );
                          
                          if (typeAssets.length === 0) return null;
                          
                          const isExpanded = expandedSocialPlatforms.has(`merchant-${type}`);
                          
                          return (
                            <div key={type}>
                              <button
                                onClick={() => toggleSocialPlatform(`merchant-${type}`)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200 mb-6"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-3 h-3 bg-brand-primary rounded-full"></span>
                                  <h3 className="text-xl font-axiforma text-gray-800">{type}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-full font-calibre">
                                    {typeAssets.length} asset{typeAssets.length !== 1 ? 's' : ''}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                  )}
                                </div>
                              </button>
                              
                              {isExpanded && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
                                  {typeAssets.map((asset) => (
                                    <AssetCard
                                      key={asset.id}
                                      asset={asset}
                                      partner={partner}
                                      onDownload={onDownload}
                                      onView={handleViewAsset}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // Regular grid for other categories
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryAssets.map((asset) => (
                          <AssetCard
                            key={asset.id}
                            asset={asset}
                            partner={partner}
                            onDownload={onDownload}
                            onView={handleViewAsset}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Usage Guidelines */}
      <FloatingUsageGuidelines />

      {/* Asset Viewer Modal */}
      <AssetViewer
        asset={selectedAsset}
        partner={partner}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        onDownload={onDownload}
        onCopy={onAssetCopy}
      />
    </div>
  );
};
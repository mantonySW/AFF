import React, { useState } from 'react';
import { Partner } from '../types/partner';

interface SignUpFormProps {
  partner: Partner | null;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ partner }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Determine redirect URL based on revenue selection
      const smallBusinessRevenue = ['pre-launch', '<2m', '2m-5m'];
      const isSmallBusiness = smallBusinessRevenue.includes(formData.annualRevenue);

      // Get current UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = new URLSearchParams();

      // Preserve all UTM parameters
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          utmParams.append(param, value);
        }
      });

      // Create a hidden iframe for form submission
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'hidden-form-target';
      document.body.appendChild(iframe);

      // Create a form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://info.affirm.com/l/778433/2025-09-10/2ss8ct5';
      form.target = 'hidden-form-target';

      // Add form fields
      const fields = {
        'firstName': formData.firstName,
        'lastName': formData.lastName,
        'email': formData.businessEmail,
        'company': '', // Can be derived from website or left empty
        'website': formData.website,
        'country': formData.country,
        'annualRevenue': formData.annualRevenue,
        'ecommercePlatform': formData.ecommercePlatform,
        'averageOrderValue': formData.averageOrderValue,
        'partnerName': partner?.name || '',
        'partnerCode': partner?.code || '',
        'source': 'Partner Hub',
        'campaign': 'Black Friday 2024'
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Submit the form
      document.body.appendChild(form);
      form.submit();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      // Redirect based on revenue selection
      setTimeout(() => {
        if (isSmallBusiness) {
          // Redirect to create account page with UTM parameters
          const redirectUrl = `https://www.affirm.com/dashboard/create-account/${utmParams.toString() ? '?' + utmParams.toString() : ''}`;
          window.location.href = redirectUrl;
        } else {
          // Redirect to success page
          window.location.href = 'https://www.affirm.com/lp/business/form-success';
        }
      }, 500);

    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const partnerName = partner?.name || 'Your Platform';

  if (submitSuccess) {
    return (
      <div className="w-full bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#7C59FF]/15 p-6 lg:absolute lg:-top-10 lg:bottom-4 lg:right-8 xl:right-12 2xl:right-16 lg:max-w-[440px] lg:p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl lg:text-2xl font-black text-gray-900 mb-3 lg:mb-4">
            Thank You!
          </h2>
          <p className="text-gray-700 text-sm lg:text-base">
            Someone from our team will be reaching out to you shortly.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#7C59FF]/15 p-6 lg:absolute lg:-top-10 lg:bottom-4 lg:right-8 xl:right-12 2xl:right-16 lg:max-w-[440px] lg:p-8">
      <div className="text-center mb-6">
        <div className="mb-4 lg:mb-6">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold uppercase tracking-wide">
            Trusted by leading businesses
          </span>
        </div>
        <h2 className="text-xl lg:text-2xl font-black text-gray-900 mb-3 lg:mb-4">
          Maximize Holiday Sales this Season
        </h2>
        <p className="text-gray-700 text-sm lg:text-base mb-4">
          Join 377,000+ merchants already boosting sales with Affirm
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
        {/* Name Fields - Two Columns */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Business Email */}
        <div>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleInputChange}
            placeholder="Business Email"
            required
            className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
          />
        </div>

        {/* Website */}
        <div>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Website"
            required
            className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
          />
        </div>

        {/* Business Details - Two Columns */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            >
              <option value="">Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <select
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleInputChange}
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            >
              <option value="">Revenue</option>
              <option value="pre-launch">Pre-Launch</option>
              <option value="<2m">&lt;$2M</option>
              <option value="2m-5m">$2M-5M</option>
              <option value="5m-20m">$5M-20M</option>
              <option value="20m-50m">$20M-50M</option>
              <option value="50m-100m">$50M-100M</option>
              <option value=">100m">&gt;$100M</option>
            </select>
          </div>
        </div>

        {/* Platform and AOV - Two Columns */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              name="ecommercePlatform"
              value={formData.ecommercePlatform}
              onChange={handleInputChange}
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            >
              <option value="">Platform</option>
              <option value="shopify">Shopify</option>
              <option value="woocommerce">WooCommerce</option>
              <option value="bigcommerce">BigCommerce</option>
              <option value="magento">Magento</option>
              <option value="prestashop">PrestaShop</option>
              <option value="custom">Custom</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <select
              name="averageOrderValue"
              value={formData.averageOrderValue}
              onChange={handleInputChange}
              required
              className="w-full h-11 lg:h-12 px-3 lg:px-4 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-[#7C59FF] focus:outline-none focus:ring-2 focus:ring-[#7C59FF]/25 transition-all duration-200 text-sm"
            >
              <option value="">Avg Order Value</option>
              <option value="<50">&lt;$50</option>
              <option value="50-100">$50-$100</option>
              <option value="100-150">$100-$150</option>
              <option value="150-250">$150-$250</option>
              <option value="250-500">$250-$500</option>
              <option value="500-1000">$500-$1000</option>
              <option value=">1000">&gt;$1000</option>
            </select>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-[#7C59FF] border-2 border-gray-300 rounded focus:ring-[#7C59FF] focus:ring-2"
          />
          <label className="text-sm text-gray-600 leading-relaxed">
            I agree to receive communications from Affirm and {partnerName} about partnership 
            opportunities, product updates, and marketing materials. I understand I can 
            unsubscribe at any time and my information will be handled according to 
            Affirm's privacy policy.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.agreeToTerms || isSubmitting}
          className="w-full h-12 bg-[#5D3FD6] text-white rounded-xl font-bold hover:bg-[#3B247E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            'Get Affirm Live on My Store →'
          )}
        </button>
      </form>
    </div>
  );
};
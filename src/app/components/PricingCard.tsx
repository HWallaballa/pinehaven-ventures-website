'use client';

import CheckoutButton from './CheckoutButton';

type PricingCardProps = {
  name: string;
  price: number;
  interval: 'month' | 'year';
  priceId: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  mode?: 'subscription' | 'payment';
};

export default function PricingCard({
  name,
  price,
  interval,
  priceId,
  features,
  highlighted = false,
  badge,
  mode = 'subscription',
}: PricingCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
        highlighted
          ? 'bg-blue-600 text-white ring-2 ring-blue-600 shadow-xl'
          : 'bg-white text-gray-900 border border-gray-200'
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex px-3 py-1 rounded-full text-xs font-bold ${
            highlighted ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {badge}
        </span>
      )}

      <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>

      <div className="mb-6">
        <span className="text-4xl font-bold">{formattedPrice}</span>
        <span className={`text-sm ${highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
          /{interval === 'month' ? 'mo' : 'yr'}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <svg
              className={`w-5 h-5 shrink-0 mt-0.5 ${highlighted ? 'text-blue-200' : 'text-green-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>

      <CheckoutButton
        priceId={priceId}
        mode={mode}
        label="Subscribe Now"
        className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          highlighted
            ? 'bg-white text-blue-700 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      />
    </div>
  );
}

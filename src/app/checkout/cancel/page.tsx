import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Payment Cancelled | Pinehaven Ventures',
  description: 'Your payment was cancelled. No charges were made.',
};

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your checkout was cancelled and no charges were made. If this was unintentional,
            you can return to the product page and try again.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Need help deciding?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">-</span>
                <span>Review our product pages to compare features and pricing across all plans.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">-</span>
                <span>Contact our team to discuss which plan is the best fit for your needs.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">-</span>
                <span>Try the Crypto Transaction Log demo for free to see our product quality firsthand.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ventures"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

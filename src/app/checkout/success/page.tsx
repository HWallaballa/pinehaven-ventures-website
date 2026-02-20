import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Payment Successful | Pinehaven Ventures',
  description: 'Your payment was processed successfully. Welcome to Pinehaven Ventures.',
};

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Thank you for your purchase. Your subscription is now active and you have full access
            to your product. A confirmation email has been sent to your email address.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold shrink-0">1.</span>
                <span>You will receive a confirmation email with your subscription details and invoice.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold shrink-0">2.</span>
                <span>Our team will reach out within 24 hours to help you get started with onboarding.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold shrink-0">3.</span>
                <span>You can manage your subscription, update payment methods, or download invoices from your billing portal.</span>
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
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

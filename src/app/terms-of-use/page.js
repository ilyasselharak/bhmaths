import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | BHMaths',
  description: 'Terms and conditions for using BHMaths educational platform',
};

export default function TermsOfUsePage() {
  return (
    <main className="py-12">
      <div className="bg-gradient-to-r from-orange-200 to-orange-400 text-black rounded-2xl py-16 mb-12 mx-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Terms of Use
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Terms and conditions for using BHMaths platform
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to BHMaths educational platform. By accessing and using our website, you agree to be bound 
              by these Terms of Use. If you do not agree to these terms, please do not use our site.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By using BHMaths platform, you acknowledge and agree that you have read and understood these 
              terms and conditions, and that you agree to be bound by them. We reserve the right to modify 
              these terms at any time, and you will be notified of any material changes.
            </p>
          </section>

          {/* Use of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Use of Service</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">3.1 Permitted Use</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may use BHMaths platform for personal educational purposes only. You are permitted to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access available educational content</li>
              <li>Download educational materials for personal use</li>
              <li>Share links to our pages with others</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">3.2 Prohibited Use</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are prohibited from:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Copying or redistributing content for commercial purposes</li>
              <li>Attempting unauthorized access to our systems</li>
              <li>Using the site in any way that may harm or disrupt the service</li>
              <li>Posting illegal or offensive content</li>
              <li>Impersonating another person</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Account Registration</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When creating an account on BHMaths, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account and password</li>
              <li>Immediately report any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
          </section>

          {/* Subscription and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Subscriptions and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you choose to subscribe to one of our paid plans:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>You agree to pay the fees stated</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You may cancel your subscription at any time</li>
              <li>No refunds are provided for the current period</li>
              <li>We reserve the right to change prices with prior notice</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on BHMaths platform, including texts, images, videos, and designs, is protected 
              by copyright and intellectual property rights. You may not copy, reproduce, or distribute any 
              part of the content without our written permission.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. User Content</h2>
            <p className="text-gray-600 leading-relaxed">
              If you upload or post any content on our platform, you grant us a non-exclusive license to use 
              this content. You warrant that you have the right to publish this content and that it does not 
              infringe on any third party's rights.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              BHMaths shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Any direct or indirect damages resulting from use of the platform</li>
              <li>Service interruptions or technical errors</li>
              <li>Loss of data or information</li>
              <li>Users' academic results</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to the platform at any time, without 
              prior notice, if you violate these terms or for any other reason we deem appropriate.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page 
              with an updated "Last Updated" date. You are advised to review this page regularly for any changes.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Last Updated :</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Use, you can contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p className="text-gray-700">
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@bhmaths.com" className="text-orange-500 hover:text-orange-600">
                  contact@bhmaths.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone :</strong>{' '}
                <a href="tel:+212629504107" className="text-orange-500 hover:text-orange-600">
                  +212 629-504107
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Address :</strong> Morocco
              </p>
            </div>
          </section>

          {/* Back Link */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}



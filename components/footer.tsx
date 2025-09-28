import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">REACH</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for digital transactions, cryptocurrency trading, and gift card services.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/gift-cards" className="text-gray-300 hover:text-white transition-colors">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/services/cryptocurrency" className="text-gray-300 hover:text-white transition-colors">
                  Cryptocurrency
                </Link>
              </li>
              <li>
                <Link href="/services/money-transfer" className="text-gray-300 hover:text-white transition-colors">
                  Money Transfer
                </Link>
              </li>
              <li>
                <Link href="/services/digital-wallet" className="text-gray-300 hover:text-white transition-colors">
                  Digital Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-300 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-300 hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 REACH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

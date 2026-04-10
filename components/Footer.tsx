'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <>
      {/* Contact Us Strip */}
      <div className="bg-gray-200 border-b border-gray-300">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="font-semibold text-black">Contact Us</span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-black" />
                <span className="text-black">United States: <strong>+1-252-477-1362</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-black" />
                <span className="text-black">United Kingdom: <strong>+44-203-957-8553 / +44-203-949-5508</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-black" />
                <span className="text-black">Australia: <strong>+61-8-7924-7805</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-black" />
                <span className="text-black">India: <strong>+91-848-285-0837</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Left Column - Contact and Office Information */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <p className="text-white font-semibold mb-2">For Business Enquiry :</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:sales@coherentmarketinsights.com" className="text-gray-300 hover:text-white">
                    sales@coherentmarketinsights.com
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-white font-semibold mb-2">Sales Office (U.S.) :</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    Coherent Market Insights Pvt Ltd, 533 Airport Boulevard, Suite 400, Burlingame, CA 94010, United States
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-white font-semibold mb-2">Asia Pacific Intelligence Center (India) :</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    Coherent Market Insights Pvt Ltd, 401-402, Bremen Business Center, University Road, Aundh, Pune - 411007, India.
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Menu</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Industries</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Reader Club Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Reader Club</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Latest Insights</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">COVID-19 Tracker</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press Release</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Infographics</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blogs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">News</a></li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become Reseller</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How To Order?</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sitemap</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Feeds</a></li>
              </ul>
            </div>
          </div>

          {/* Right Section - HR, Social Media, Payment */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* HR Contact */}
              <div>
                <p className="text-white font-semibold mb-2">HR Contact :</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-gray-300">+91-7262891127</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-white font-semibold mb-3">Connect With Us :</p>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-black rounded flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition-colors font-bold"
                    aria-label="Pinterest"
                  >
                    <span className="text-sm">P</span>
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="text-white font-semibold mb-3">Secure Payment By :</p>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="px-3 py-2 bg-white rounded text-blue-600 font-bold text-xs">VISA</div>
                  <div className="px-3 py-2 bg-white rounded text-orange-600 font-bold text-xs">DISCOVER</div>
                  <div className="px-3 py-2 bg-white rounded text-red-600 font-bold text-xs">MasterCard</div>
                  <div className="px-3 py-2 bg-white rounded text-blue-600 font-bold text-xs">AMERICAN EXPRESS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Coherent Market Insights Pvt Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}


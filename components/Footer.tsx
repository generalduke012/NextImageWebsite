import React from 'react';
import { Logo } from './Logo';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Logo className="mb-6" useRaster variant="full" />
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Next Image Studio is Rourkela's premier creative agency, merging traditional artistry with AI-powered innovation. We don't just capture moments; we engineer memories.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Wedding Films</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Client Portal</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Book a Session</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
              <Mail size={16} />
              <span>hello@nextimage.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2025 Next Image Lipu Photography. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
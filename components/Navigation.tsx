
import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { ThemeColor } from '../App';

interface NavigationProps {
  currentTheme: ThemeColor;
  isTransparent: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTheme, isTransparent }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Photography', href: '#photography' },
    { name: 'Videography', href: '#videography' },
    { name: 'Editing', href: '#editing' },
    { name: 'Services', href: '#services' },
  ];

  // Dynamic styles based on theme
  const getThemeColorClass = () => {
    switch (currentTheme) {
      case 'teal': return 'text-teal-400 border-teal-400 hover:bg-teal-400';
      case 'orange': return 'text-orange-500 border-orange-500 hover:bg-orange-500';
      case 'purple': return 'text-purple-500 border-purple-500 hover:bg-purple-500';
      default: return 'text-white border-white hover:bg-white';
    }
  };

  const themeColorHex = () => {
    switch (currentTheme) {
      case 'teal': return 'text-teal-400';
      case 'orange': return 'text-orange-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-white';
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 py-6">
      {/* Background Layers for Smooth Transition */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Layer 1: Transparent Scrim (Visible on Hero) */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-700 ease-in-out ${isTransparent ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Layer 2: Darker Background (Visible on Detail) */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent transition-opacity duration-700 ease-in-out ${!isTransparent ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          <a href="#" className="hover:opacity-80 transition-opacity duration-300">
            <Logo theme={currentTheme} useRaster variant="full" />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm uppercase tracking-widest transition-colors duration-300 text-white/80 hover:text-white ${currentTheme === 'white' ? 'hover:text-gray-300' : `hover:${themeColorHex()}`}`}
              >
                {link.name}
              </a>
            ))}

            <button className={`bg-transparent border px-6 py-2 rounded-none hover:text-black transition-all duration-500 text-sm uppercase font-bold tracking-widest ${getThemeColorClass()}`}>
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black absolute w-full h-screen top-full left-0 p-8 flex flex-col gap-8 z-50 border-t border-gray-800">
           <div className="flex justify-end">
             <button onClick={() => setMobileOpen(false)} className="text-white p-2">
               <X size={28} />
             </button>
           </div>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-2xl font-display text-white" onClick={() => setMobileOpen(false)}>
              {link.name}
            </a>
          ))}
          <button className={`w-full py-4 font-bold uppercase tracking-widest mt-4 border ${getThemeColorClass()} text-white hover:text-black`}>
             Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

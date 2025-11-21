
import React from 'react';
import { ThemeColor } from '../App';
// Local raster logo assets
import fullLogo from '../data/logo/full_logo.png';
import shortLogo from '../data/logo/short_logo.png';
import fullLogoBlack from '../data/logo/full_logo_black.png';

interface LogoProps {
  className?: string;
  theme?: ThemeColor;
  useRaster?: boolean; // when true show imported PNG logo instead of dynamic SVG
  variant?: 'full' | 'short' | 'full-black';
}

export const Logo: React.FC<LogoProps> = ({ className, theme = 'teal', useRaster = false, variant = 'short' }) => {
  
  const getPrimaryColor = () => {
    switch (theme) {
      case 'teal': return '#2EC4B6';
      case 'orange': return '#FF9F1C';
      case 'purple': return '#9D4EDD';
      default: return '#FFFFFF';
    }
  };

  const getSecondaryColor = () => {
    switch (theme) {
      case 'teal': return '#FF9F1C'; // Orange accent
      case 'orange': return '#2EC4B6'; // Teal accent
      case 'purple': return '#F72585'; // Pink accent
      default: return '#CCCCCC';
    }
  };

  const primaryColor = getPrimaryColor();
  const secondaryColor = getSecondaryColor();

  if (useRaster) {
    const selected = variant === 'full' ? fullLogo : variant === 'full-black' ? fullLogoBlack : shortLogo;
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img src={selected} alt="Next Image Lipu Photography Logo" className="h-12 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none transition-all duration-500 ${className}`}>
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <path 
          d="M20 80 C 10 70, 10 30, 30 20 L 70 20 C 90 30, 90 70, 80 80 Z" 
          fill={`url(#grad-${theme})`} 
          opacity="0.9" 
          className="transition-all duration-500"
        />
        <circle cx="50" cy="50" r="25" fill="#000000" stroke={primaryColor} strokeWidth="2" className="transition-colors duration-500" />
        <text x="38" y="58" fontFamily="monospace" fontWeight="bold" fontSize="24" fill={primaryColor} className="transition-colors duration-500">ni</text>
        <circle cx="65" cy="45" r="4" fill={secondaryColor} className="transition-colors duration-500" />
        <defs>
          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2EC4B6" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9F1C" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9D4EDD" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="grad-white" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col justify-center leading-none">
        <div className="text-2xl font-sans font-bold tracking-wide flex">
          <span style={{ color: primaryColor }} className="transition-colors duration-500">NEXT</span>
          <span style={{ color: secondaryColor }} className="ml-1 transition-colors duration-500">IMAGE</span>
        </div>
        <div className="text-[10px] text-white/60 tracking-[0.3em] font-light uppercase mt-1">Lipu Photography</div>
      </div>
    </div>
  );
};

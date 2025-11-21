
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ThemeColor } from '../App';

interface DetailSectionProps {
  theme: ThemeColor;
  title: string;
  description: string;
  images: string[]; // may include .mp4 sources
}

export const DetailSection: React.FC<DetailSectionProps> = ({ theme, title, description, images }) => {
  
  const getButtonClasses = () => {
    switch (theme) {
      case 'teal': return 'hover:bg-teal-400 hover:text-black border-white text-black bg-white';
      case 'orange': return 'hover:bg-orange-500 hover:text-black border-white text-black bg-white';
      case 'purple': return 'hover:bg-purple-500 hover:text-white border-purple-500 text-white bg-purple-900/50';
      default: return 'bg-white text-black hover:bg-gray-200';
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case 'teal': return 'text-teal-400';
      case 'orange': return 'text-orange-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-white';
    }
  };

  // Normalize gallery sources to always have 4 items; repeat if fewer
  const safeImages: string[] = Array.from({ length: 4 }, (_, i) => {
    const list = (images || []).filter(Boolean);
    if (list.length === 0) return '';
    return list[i % list.length];
  });
  const fallbackImage = safeImages.find((s) => s && !s.endsWith('.mp4')) || '';

  return (
    <section className="min-h-screen w-full bg-gunmetal py-24 px-4 relative flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className={`text-4xl md:text-6xl font-display font-bold text-white leading-tight`}>
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? getAccentColor() : 'text-white'}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
            
            <button className={`flex items-center justify-center gap-2 px-10 py-4 font-bold uppercase tracking-wider transition-all duration-300 group ${getButtonClasses()}`}>
              Explore Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {safeImages[0]?.endsWith('.mp4') ? (
                  <video src={safeImages[0]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={safeImages[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" onError={(e) => { if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } }} />
                )}
              </div>
              <div className="h-48 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {safeImages[1]?.endsWith('.mp4') ? (
                  <video src={safeImages[1]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={safeImages[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" onError={(e) => { if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } }} />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {safeImages[2]?.endsWith('.mp4') ? (
                  <video src={safeImages[2]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={safeImages[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" onError={(e) => { if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } }} />
                )}
              </div>
              <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {safeImages[3]?.endsWith('.mp4') ? (
                  <video src={safeImages[3]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={safeImages[3]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" onError={(e) => { if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } }} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { SERVICES } from '../constants';
import { Camera, Film, Aperture, Monitor, Heart, Sliders } from 'lucide-react';
import { ThemeColor } from '../App';

const IconMap: Record<string, React.ReactNode> = {
  'camera': <Camera className="w-8 h-8" />,
  'film': <Film className="w-8 h-8" />,
  'ring': <Heart className="w-8 h-8" />,
  'monitor': <Monitor className="w-8 h-8" />,
  'sliders': <Sliders className="w-8 h-8" />,
  'aperture': <Aperture className="w-8 h-8" />
};

interface ServicesProps {
  theme?: ThemeColor;
  padding?: 'none' | 'compact' | 'normal';
}

export const Services: React.FC<ServicesProps> = ({ theme = 'white', padding = 'normal' }) => {
  const paddingClass = padding === 'none' ? 'py-0' : padding === 'compact' ? 'py-12' : 'py-24';
  return (
    <section className={`${paddingClass} bg-gunmetal relative overflow-hidden flex-grow`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white/20 via-white to-white/20 mx-auto"></div>
          <p className="mt-4 text-gray-400">From capture to delivery, we handle every pixel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-black/50 border border-gray-800 p-8 hover:border-white/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="mb-6 text-gray-400 group-hover:text-white transition-colors duration-500">
                {IconMap[service.icon] || <Aperture className="w-8 h-8" />}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider group-hover:text-teal-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

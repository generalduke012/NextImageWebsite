
import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { ThemeColor } from '../App';

interface HeroProps {
  id?: string;
  subtitle: string;
  title: string;
  description: string;
  theme: ThemeColor;
  bgImage: string;
  bgVideo?: string;
  bgVideoRotate?: number; // degrees (e.g., -90, 90, 180)
  overlay: string;
  showReelButton?: boolean;
  align?: 'center' | 'left';
  animatedHeadline?: boolean;
  headlineWords?: string[]; // explicit segmentation when title has no spaces
  hideContent?: boolean; // when true, do not render textual content
}

export const Hero: React.FC<HeroProps> = ({ 
  id, 
  subtitle, 
  title, 
  description, 
  theme, 
  bgImage, 
  bgVideo,
  bgVideoRotate,
  overlay, 
  showReelButton = false,
  align = 'center',
  animatedHeadline = true,
  headlineWords,
  hideContent = false,
}) => {
  // Scroll-triggered animation state
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!animatedHeadline || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of hero is visible
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animatedHeadline, hasAnimated]);

  // Calculate total word count for timing when animating
  const wordCount = headlineWords && headlineWords.length > 0 
    ? headlineWords.length 
    : title.replace(/\n/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  // Base initial delay before headline animation starts
  const headlineBaseDelaySeconds = 0.2; // Small delay after scroll trigger
  // Slower word-by-word animation
  const wordStaggerSeconds = 1.0; // time between words
  const wordDurationSeconds = 0.9; // each word fade-in duration
  // Time when the last word finishes appearing
  const lastWordFinishSeconds = headlineBaseDelaySeconds + ((Math.max(wordCount - 1, 0)) * wordStaggerSeconds) + wordDurationSeconds;
  // Description/subtitle delay after headline completes
  const descriptionDelaySeconds = lastWordFinishSeconds + 0.4;

  // Helper to determine text color classes based on theme
  const getThemeTextColor = () => {
    switch (theme) {
      case 'teal': return 'text-teal-400';
      case 'orange': return 'text-orange-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-white';
    }
  };

  return (
    <section ref={sectionRef} id={id} className="relative h-screen-dvh w-full overflow-hidden flex items-center justify-center bg-black">
      {animatedHeadline && (
        <style>{`
          @keyframes wordFadeIn {
            0% { opacity:0; transform:translateY(0.25em); }
            100% { opacity:1; transform:translateY(0); }
          }
          @keyframes descriptionLateFade {
            0% { opacity:0; }
            100% { opacity:1; }
          }
        `}</style>
      )}
      {/* Background Layer (Image or Video) */}
      <div className="absolute inset-0 z-0">
        {bgVideo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              src={bgVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                objectFit: 'cover',
                transform: bgVideoRotate ? `rotate(${bgVideoRotate}deg)` : undefined,
                width: (bgVideoRotate === 90 || bgVideoRotate === -90) ? '100vh' : '100%',
                height: (bgVideoRotate === 90 || bgVideoRotate === -90) ? '100vw' : '100%',
              }}
            />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className={`absolute inset-0 transition-colors duration-1000 ${overlay}`} />
        
        {/* Theme Tint Overlay */}
        <div className={`absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none transition-colors duration-1000 ${
           theme === 'teal' ? 'bg-teal-900' : 
           theme === 'orange' ? 'bg-orange-900' : 
           theme === 'purple' ? 'bg-purple-900' : 'bg-black'
        }`}></div>
      </div>

      {/* Content Layer */}
      {!hideContent && (
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:text-left w-full pt-20 sm:pt-0">
        <div className="overflow-hidden">
          <p
            className={`text-sm md:text-lg font-bold tracking-[0.5em] uppercase mb-4 transition-colors duration-500 ${getThemeTextColor()} ${align === 'center' ? 'text-center' : 'text-left'} font-poppins`}
            style={animatedHeadline && hasAnimated ? {
              opacity: 0,
              animation: 'descriptionLateFade 0.8s ease forwards',
              animationDelay: `${lastWordFinishSeconds}s`,
            } : animatedHeadline ? { opacity: 0 } : undefined}
          >
            {subtitle}
          </p>
        </div>

        <h1
          className={`font-bold text-white mb-6 leading-tight tracking-tighter drop-shadow-2xl uppercase font-montserrat ${align === 'center' ? 'text-center' : 'text-left'}`}
          style={{
            fontSize: animatedHeadline ? 'clamp(3.5em, 8vw, 5em)' : 'clamp(6em, 10vw, 10em)',
            letterSpacing: '0.03em',
            fontFamily: 'Montserrat, Bebas Neue, Arial, sans-serif',
            fontWeight: 900,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          {animatedHeadline ? (
            // If explicit headlineWords provided, animate them sequentially; else fallback to space/newline splitting
            (headlineWords && headlineWords.length > 0 ? (
              <span style={{ display:'block' }}>
                {headlineWords.map((word, idx) => (
                  <span
                    key={idx}
                    style={{
                      display:'inline-block',
                      opacity:0,
                      animation: hasAnimated ? `wordFadeIn ${wordDurationSeconds}s ease forwards` : 'none',
                      animationDelay: hasAnimated ? `${headlineBaseDelaySeconds + idx * wordStaggerSeconds}s` : '0s',
                      marginRight: idx === headlineWords.length - 1 ? 0 : '0.35em'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ) : (
              title.split('\n').map((line, lineIdx) => (
                <span key={lineIdx} style={{ display:'block' }}>
                  {line.split(/\s+/).map((word, idx) => (
                    <span
                      key={idx}
                      style={{
                        display:'inline-block',
                        opacity:0,
                        animation: hasAnimated ? `wordFadeIn ${wordDurationSeconds}s ease forwards` : 'none',
                        animationDelay: hasAnimated ? `${headlineBaseDelaySeconds + (lineIdx * line.split(/\s+/).length + idx) * wordStaggerSeconds}s` : '0s',
                        marginRight:'0.25em'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))
            ))
          ) : title}
        </h1>

        {animatedHeadline ? null : (
          <p
            className={`mb-12 font-light leading-relaxed font-poppins ${align === 'center' ? 'text-center' : 'text-left'}`}
            style={{
              fontSize: '1.1em',
              color: '#fff',
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              maxWidth: '40em',
              marginLeft: align === 'center' ? 'auto' : undefined,
              marginRight: align === 'center' ? 'auto' : undefined,
            }}
          >
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start">
          {showReelButton && (
            <button className={`flex items-center justify-center gap-2 px-10 py-4 border border-white/30 backdrop-blur-sm text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors ${theme === 'orange' ? 'hover:border-orange-500 hover:text-orange-400' : ''}`}>
              <Play className="w-5 h-5 fill-current" />
              Watch Reel
            </button>
          )}
        </div>
      </div>
      )}
      {animatedHeadline && (
        <div className="absolute bottom-6 left-0 w-full px-6 z-20">
          <p
            className="font-light leading-relaxed font-poppins text-center"
            style={{
              fontSize: '1.1em',
              color: '#fff',
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              maxWidth: '60em',
              margin: '0 auto',
              opacity: 0,
              animation: hasAnimated ? 'descriptionLateFade 0.8s ease forwards' : 'none',
              animationDelay: hasAnimated ? `${descriptionDelaySeconds}s` : '0s'
            }}
          >
            {description}
          </p>
        </div>
      )}
    </section>
  );
};
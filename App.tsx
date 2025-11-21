import React, { useState, useEffect, useRef, Fragment } from 'react';
// Local hero background assets (mapped from data/Photos)
import { heroImages } from './data/assets';

// Stable hero assets sourced from centralized mapping
const photoHeroImg = heroImages.photography;
const videoHeroImg = heroImages.videography;
const editingHeroImg = heroImages.editing;
const servicesHeroImg = heroImages.services;
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { DetailSection } from './components/DetailSection';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import ringCeremonyVideo from './data/Video/Ring ceremony.mp4';
import editingBgVideo from './data/Photos/editing/e82d3cb1-8ae3-4327-b4ba-4d4710cf00c9.mp4';
import editingImg1 from './data/Photos/editing/Gemini_Generated_Image_dbh77dbh77dbh77d.png';
import editingImg2 from './data/Photos/editing/Gemini_Generated_Image_dbh77dbh77dbh77d(1).png';
import editingImg3 from './data/Photos/editing/edius-9-premier-video-editing-setup.jpeg';

export type ThemeColor = 'teal' | 'orange' | 'purple' | 'white';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('teal');
  const [isNavTransparent, setIsNavTransparent] = useState(true);
  
  // Refs for theme observation
  const photoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  // Random local photography detail images (selected once)
  const randomPhotoImagesRef = useRef<string[]>([]);
  // Random local videography clips (selected once)
  const randomVideoClipsRef = useRef<string[]>([]);

  useEffect(() => {
    // Generate random local images for photography detail section once
    if (randomPhotoImagesRef.current.length === 0) {
      try {
        const modules = import.meta.glob('./data/Photos/*.{jpg,jpeg,png,webp}', { eager: true });
        const paths = Object.values(modules)
          .map((m: any) => m?.default)
          .filter((p: any) => typeof p === 'string');
        // Shuffle paths
        for (let i = paths.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [paths[i], paths[j]] = [paths[j], paths[i]];
        }
        randomPhotoImagesRef.current = paths.slice(0, 8); // take first 8
      } catch (e) {
        console.warn('Failed to load local photography images', e);
      }
    }
    // Generate random local video clips for videography detail section once
    if (randomVideoClipsRef.current.length === 0) {
      try {
        const videoModules = import.meta.glob('./data/Video/*.mp4', { eager: true });
        const vpaths = Object.values(videoModules)
          .map((m: any) => m?.default)
          .filter((p: any) => typeof p === 'string');
        for (let i = vpaths.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [vpaths[i], vpaths[j]] = [vpaths[j], vpaths[i]];
        }
        randomVideoClipsRef.current = vpaths.slice(0, 4);
      } catch (e) {
        console.warn('Failed to load local video clips', e);
      }
    }
    // 1. Theme Observer (Detects which main section is active)
    const themeObserverOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', 
      threshold: 0
    };

    const themeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'photography') setCurrentTheme('teal');
          if (entry.target.id === 'videography') setCurrentTheme('orange');
          if (entry.target.id === 'editing') setCurrentTheme('purple');
          if (entry.target.id === 'services') setCurrentTheme('white');
        }
      });
    }, themeObserverOptions);

    if (photoRef.current) themeObserver.observe(photoRef.current);
    if (videoRef.current) themeObserver.observe(videoRef.current);
    if (editRef.current) themeObserver.observe(editRef.current);
    if (servicesRef.current) themeObserver.observe(servicesRef.current);

    // 2. Transparency Observer (Detects if we are on a Hero page or Detail page)
    const transparencyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If a Hero section is intersecting (>50%), Nav is transparent
          if (entry.target.getAttribute('data-type') === 'hero') {
            setIsNavTransparent(true);
          } 
          // If a Detail or Services section is intersecting (>50%), Nav is dark
          else if (entry.target.getAttribute('data-type') === 'detail' || entry.target.id === 'services-content') {
            setIsNavTransparent(false);
          }
        }
      });
    }, { threshold: 0.5 }); // Threshold ensures we switch when the section consumes most of the view

    // Observe all sections with data-type
    const sections = document.querySelectorAll('[data-type]');
    sections.forEach(el => transparencyObserver.observe(el));

    return () => {
      themeObserver.disconnect();
      transparencyObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-carbon text-white selection:bg-white/30 selection:text-white">
      <Navigation currentTheme={currentTheme} isTransparent={isNavTransparent} />
      
      <main className="flex flex-col w-full">

        {/* Photography Section (Hero + Detail) */}
        <div ref={photoRef} id="photography" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="photography-hero"
              subtitle="Fine Art Photography"
              title={"CAPTURING LIFE'S MASTERPIECE"}
              description="Award-winning photography services for weddings, portraits, and commercial projects. Every shot is a work of art."
              theme="teal"
              bgImage={photoHeroImg}
              overlay="bg-gradient-to-b from-black/80 via-black/20 to-black"
              align="center"
              animatedHeadline
              headlineWords={["CAPTURING", "LIFE'S", "MASTERPIECE"]}
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="teal"
              title="Timeless Moments"
              description="Our photography philosophy is rooted in capturing the unscripted, raw emotions that define your special day. We combine traditional techniques with modern artistry to create images that you will cherish for generations."
              images={randomPhotoImagesRef.current.length ? randomPhotoImagesRef.current : [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
                'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
                'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=800&q=80',
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80'
              ]}
            />
          </div>
        </div>

        {/* Videography Section (Hero + Detail) */}
        <div ref={videoRef} id="videography" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="videography-hero"
              subtitle="Cinematic Storytelling"
              title="MOTION THAT MOVES SOULS"
              description="From 4K wedding films to high-energy event coverage. We don't just record; we create cinema."
              theme="orange"
              bgImage={videoHeroImg}
              bgVideo={ringCeremonyVideo}
              bgVideoRotate={-90}
              overlay="bg-gradient-to-r from-black via-black/50 to-transparent"
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="orange"
              title="Visual Narratives"
              description="We approach videography with a filmmaker's eye. Using high-end cinema cameras, drone technology, and professional audio equipment, we weave together the sights and sounds of your event into a compelling story."
              images={randomVideoClipsRef.current.length === 4 ? randomVideoClipsRef.current : [
                "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=800&q=80",
                "https://images.unsplash.com/photo-1601506521937-0512c3114016?w=800&q=80",
                "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&q=80",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
              ]}
            />
          </div>
        </div>

        {/* Editing Section (Hero + Detail) */}
        <div ref={editRef} id="editing" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="editing-hero"
              subtitle="Post-Production Suite"
              title="PERFECTION IN EVERY PIXEL"
              description="Advanced AI retouching, color grading, and album design. Where raw footage becomes art."
              theme="purple"
              bgImage={editingHeroImg}
              bgVideo={editingBgVideo}
              overlay="bg-purple-900/30 mix-blend-multiply"
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="purple"
              title="Magic Touch"
              description="Our editing process is where the magic truly happens. We meticulously color grade every frame, remove distractions, and enhance the natural beauty of every shot, ensuring a consistent, high-end look."
              images={[editingImg1, editingImg2, editingImg3, "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=800&q=80"]}
            />
          </div>
        </div>
        
        {/* Services Section (2x-height Hero, no image background) */}
        <div ref={servicesRef} id="services" className="w-full relative">
          <div
            className="w-full bg-gunmetal flex flex-col"
            data-type="hero"
            style={{ minHeight: '200dvh' }}
          >
            <Services theme={currentTheme} padding="compact" />
            <WhyChooseUs />
          </div>
          <div className="w-full bg-carbon">
            <Footer />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
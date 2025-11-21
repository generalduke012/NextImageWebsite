/// <reference types="vite/client" />
// Centralized asset exports for logos, photos, and videos.
// This leverages Vite's import.meta.glob for scalable bulk importing.

// Explicit logo imports (stable, few files)
import fullLogo from './logo/full_logo.png';
import fullLogoBlack from './logo/full_logo_black.png';
import shortLogo from './logo/short_logo.png';
import pngBlack from './logo/png black.png';
// Explicit hero photo import for photography primary background
import photographyPrimaryHero from './Photos/2021-06-11.jpg';

export const logos = {
  full: fullLogo,
  fullBlack: fullLogoBlack,
  short: shortLogo,
  altBlack: pngBlack,
};
export type LogoKey = keyof typeof logos;

// Bulk photo imports (eager so we get resolved URLs at build time)
// Using a pattern to catch common raster formats; adjust if new types added.
const photoModules = import.meta.glob('./Photos/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default'
});
export const photos: string[] = Object.values(photoModules) as string[];

// Bulk video imports (MP4 collection)
const videoModules = import.meta.glob('./Video/*.mp4', {
  eager: true,
  import: 'default'
});
export const videos: string[] = Object.values(videoModules) as string[];

// Helper accessors (optional)
export const getLogo = (key: LogoKey): string => logos[key];
export const allLogos = (): string[] => Object.values(logos);

// Pre-selected hero images (stable identifiers for sections)
export const heroImages = {
  photography: photographyPrimaryHero, // fixed primary hero image
  videography: photos.find(p => p.includes('538717162_18072926039041691')) || '',
  editing: photos.find(p => p.includes('539845125_18072926048041691')) || '',
  services: photos.find(p => p.includes('542241122_18073520282041691')) || ''
} as const;
export type HeroImageKey = keyof typeof heroImages;
export const getHeroImage = (key: HeroImageKey): string => heroImages[key];

// Example structured export if future metadata is desired
// interface MediaAsset { url: string; type: 'photo' | 'video'; }
// export const mediaLibrary: MediaAsset[] = [
//   ...photos.map(p => ({ url: p, type: 'photo' })),
//   ...videos.map(v => ({ url: v, type: 'video' }))
// ];

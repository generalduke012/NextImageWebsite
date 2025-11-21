import { RoadmapSection, ServiceItem } from './types';

export const ROADMAP_DATA: RoadmapSection[] = [
  {
    id: 'foundation',
    title: 'Phase 1: Foundation',
    status: 'completed',
    items: [
      'High-res Sony A7 IV & Canon R6 setup',
      'Brand Identity (Next Image)',
      'Cloud Infrastructure (AWS/GCP)',
      'Core Team Assembly'
    ]
  },
  {
    id: 'core',
    title: 'Phase 2: Core Systems',
    status: 'in-progress',
    items: [
      'Client Portal & CRM',
      'Media Management (NAS + Cloud)',
      'Basic Editing Workflow',
      'Booking & Calendar System'
    ]
  },
  {
    id: 'advanced',
    title: 'Phase 3: Advanced Editing',
    status: 'planned',
    items: [
      'AI Face Retouching',
      'Cinematic LUTs Library',
      'Album Designer Tool',
      'Mobile App for Clients'
    ]
  },
  {
    id: 'automation',
    title: 'Phase 4: AI Automation',
    status: 'planned',
    items: [
      'Auto-Culling (Smiling Faces)',
      'Video Highlight Generation',
      'Marketing Automation',
      'Drone Integration'
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capturing the eternal bond with artistic flair and raw emotion.',
    icon: 'ring',
    tags: ['Candid', 'Traditional', 'Pre-Wedding']
  },
  {
    id: 'cinema',
    title: 'Cinematic Films',
    description: 'Storytelling through motion. 4K production with cinematic grading.',
    icon: 'film',
    tags: ['Teasers', 'Highlights', 'Documentary']
  },
  {
    id: 'studio',
    title: 'Studio & Fashion',
    description: 'High-end editorial shoots and portfolio building.',
    icon: 'camera',
    tags: ['Lighting', 'Retouching', 'Fashion']
  },
  {
    id: 'birthday-anniversary',
    title: 'Birthday & Anniversary',
    description: 'Joyful celebrations captured with vibrant, candid storytelling.',
    icon: 'aperture',
    tags: ['Birthday', 'Anniversary', 'Events']
  },
  {
    id: 'ekoisiya',
    title: 'Ekoisiya Photography',
    description: 'Culturally rich ceremony coverage with attention to tradition and detail.',
    icon: 'camera',
    tags: ['Ceremony', 'Family', 'Rituals']
  },
  {
    id: 'custom',
    title: 'Custom Photography',
    description: 'Tailored shoots for brands, families, and personal projects.',
    icon: 'sliders',
    tags: ['Concept', 'Location', 'On-Demand']
  }
];

export const COLORS = {
  teal: '#2EC4B6',
  orange: '#FF9F1C',
  purple: '#9D4EDD',
  black: '#000000'
};
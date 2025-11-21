export interface RoadmapSection {
  id: string;
  title: string;
  items: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface GeminiCaptionRequest {
  imageContext: string;
  tone: 'professional' | 'fun' | 'cinematic' | 'romantic';
}
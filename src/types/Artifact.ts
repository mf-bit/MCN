export interface Artifact {
  id: string;
  name: string;
  description: string;
  origin: string;
  period: string;
  category: string;
  image_url: any; // Required by React Native's Image source prop
  created_at: string;
}

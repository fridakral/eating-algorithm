export interface FoodItem {
  isAvailable: boolean;
  seasons: string[];
  imageUrl: string;
  en: { name: string; description: string };
  hu: { name: string; description: string };
}

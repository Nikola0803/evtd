export interface Goal {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  goalId: string;
  goalLabel: string;
  purpose: string;
  format: string;
  formatGroup: string;
  priceFrom: number | null;
  priceLabel: string;
  badge: string;
  featured: boolean;
  description: string;
  image: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  reviewer: string;
  updated: string;
  excerpt: string;
  image: string;
}

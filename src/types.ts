export interface ServicePortfolioCase {
  id: string;
  title: string;
  client: string;
  duration: string;
  result: string;
  summary: string;
  tags?: string[];
  deliverable: string;
  image: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  categoryCode: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
  colorClass: string;
  detailedTasks: string[];
  turnaroundTime: string;
  deliverableSample: string;
  previewImage?: string;
  previewImageAlt?: string;
  portfolioExample?: ServicePortfolioCase;
  portfolioCases?: ServicePortfolioCase[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  tag: string;
  badge: string;
  badgeBg: string;
  scope: string;
  image: string;
  bio: string;
}

export interface PortfolioItem {
  id: string;
  clientType: string;
  duration: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  category: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  title: string;
  rating: number;
  content: string;
  image: string;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number | null;
  annualPricePerMonth: number | null;
  priceDisplay?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaAction: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LeadFormData {
  company: string;
  name: string;
  phone: string;
  email?: string;
  taskType: string;
  selectedPlan?: string;
  memo?: string;
  contactMethod?: 'phone' | 'email' | 'kakao' | 'slack';
}

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
  galleryImages?: {
    url: string;
    title: string;
    pageLabel: string;
  }[];
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

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  price: number;
  originalPrice?: number;
  description: string;
  discountRate?: string;
  isPopular?: boolean;
  features: string[];
}

export type PaymentMethodType = 'card' | 'transfer' | 'kakaopay' | 'naverpay' | 'tosspay';

export interface PaymentItemSelection {
  type: 'plan' | 'credit';
  id: string;
  name: string;
  price: number;
  billingCycle?: 'monthly' | 'annual';
  credits?: number;
}

export interface PaymentReceipt {
  orderId: string;
  paidAt: string;
  itemTitle: string;
  amount: number;
  paymentMethod: PaymentMethodType;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany?: string;
  depositorName?: string;
  bankAccountInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  taxInvoiceRequested: boolean;
  taxBusinessNumber?: string;
  creditsAdded?: number;
  activatedPlanId?: string;
}

export type TaskStatusType = 'received' | 'reviewing' | 'completed'; // 접수 | 검토중 | 완료

export interface ClientTaskItem {
  id: string;
  createdAt: string;
  company: string;
  requesterName: string;
  phone: string;
  email?: string;
  taskType: string;
  taskTypeName: string;
  title: string;
  memo: string;
  status: TaskStatusType;
  priority: 'normal' | 'urgent' | 'high';
  assignedManager: string;
  progressPercent: number;
  estimatedCompletion: string;
  reviewNotes?: string;
  deliverableName?: string;
  deliverableUrl?: string;
  contactMethod?: 'phone' | 'email' | 'kakao' | 'slack';
  selectedPlan?: string;
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ExpertTeamSection } from './components/ExpertTeamSection';
import { HowItWorks } from './components/HowItWorks';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ClientReviewsSection } from './components/ClientReviewsSection';
import { PricingPlans } from './components/PricingPlans';
import { FAQSection } from './components/FAQSection';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServicePortfolioModal } from './components/ServicePortfolioModal';
import { ServiceItem, PaymentItemSelection } from './types';
import { SERVICES_DATA } from './data';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage, PaymentFailPage } from './pages/PaymentResultPage';
import { PolicyPage, PolicyKind } from './pages/PolicyPage';
import { planItemId } from './payments/catalog';

// 업무영역 레퍼런스는 /services/:id 별도 페이지 (예: /services/ppt?case=사례id)
const servicePageMatch = typeof window !== 'undefined'
  ? window.location.pathname.match(/^\/services\/([a-z]+)\/?$/)
  : null;
const servicePageItem = servicePageMatch
  ? SERVICES_DATA.find((s) => s.id === servicePageMatch[1]) || null
  : null;
const servicePageCaseId = typeof window !== 'undefined'
  ? new URLSearchParams(window.location.search).get('case') || undefined
  : undefined;

// 결제·약관 페이지 (주소로 구분하는 한 페이지 앱)
const currentPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
const policyKind = (['refund', 'terms', 'privacy'] as PolicyKind[]).find((k) => currentPath === `/${k}`);
const isCheckout = currentPath === '/checkout';
const isPaymentSuccess = currentPath === '/payment/success';
const isPaymentFail = currentPath === '/payment/fail';
const checkoutItemId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('item') : null;

// 실제 결제는 환경변수로 켠다. 꺼져 있으면 결제 버튼은 상담 신청으로 감
const PAYMENTS_ENABLED = import.meta.env.VITE_PAYMENTS_ENABLED === 'true';

export const goToServicePage = (service: ServiceItem, caseId?: string) => {
  const query = caseId ? `?case=${encodeURIComponent(caseId)}` : '';
  window.location.href = `/services/${service.id}${query}`;
};

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPortfolioService, setSelectedPortfolioService] = useState<ServiceItem | null>(null);
  const [selectedPortfolioCaseId, setSelectedPortfolioCaseId] = useState<string | undefined>(undefined);
  const [prefilledTaskType, setPrefilledTaskType] = useState<string>(servicePageItem?.id || 'ppt');

  // 레퍼런스 페이지 제목 + 다른 페이지에서 /#섹션 으로 왔을 때 그 위치로 이동
  useEffect(() => {
    if (servicePageItem) {
      document.title = `${servicePageItem.name} 레퍼런스 | AI비서`;
      window.scrollTo(0, 0);
      return;
    }
    const hash = window.location.hash.slice(1);
    if (hash) {
      // 위쪽 사진이 늦게 뜨면 위치가 밀리므로 몇 번 다시 맞춘다
      const timers = [100, 600, 1500].map((ms) =>
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: 'instant' });
        }, ms)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, []);

  const handleSelectService = (service: ServiceItem, initialCaseId?: string) => {
    goToServicePage(service, initialCaseId);
  };

  const handleOpenPortfolioGallery = (service: ServiceItem, initialCaseId?: string) => {
    goToServicePage(service, initialCaseId);
  };

  const handleApplyServiceFromModal = (serviceName: string) => {
    if (serviceName.includes('PPT') || serviceName.includes('사업계획서') || serviceName.includes('투자제안서')) {
      setPrefilledTaskType('ppt');
    } else if (serviceName.includes('계약서') || serviceName.includes('용역') || serviceName.includes('납품')) {
      setPrefilledTaskType('contract');
    } else if (serviceName.includes('디자인') || serviceName.includes('상세페이지') || serviceName.includes('배너') || serviceName.includes('포스터')) {
      setPrefilledTaskType('design');
    } else if (serviceName.includes('마케팅') || serviceName.includes('보도자료') || serviceName.includes('SNS') || serviceName.includes('블로그')) {
      setPrefilledTaskType('marketing');
    } else if (serviceName.includes('사이트') || serviceName.includes('홈페이지') || serviceName.includes('쇼핑')) {
      setPrefilledTaskType('website');
    } else if (serviceName.includes('영상') || serviceName.includes('숏폼') || serviceName.includes('릴스')) {
      setPrefilledTaskType('video');
    } else if (serviceName.includes('문서')) {
      setPrefilledTaskType('ppt');
    } else if (serviceName.includes('콘텐츠')) {
      setPrefilledTaskType('marketing');
    } else {
      setPrefilledTaskType('other');
    }

    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (_planId: string) => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConsultation = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 결제가 켜져 있으면 결제 페이지로, 아니면 상담 신청으로
  const handleOpenPayment = (selection?: PaymentItemSelection) => {
    if (!PAYMENTS_ENABLED || !selection) return handleOpenConsultation();
    const itemId = selection.type === 'plan' ? planItemId(selection.id, selection.billingCycle || 'monthly') : selection.id;
    window.location.href = `/checkout?item=${itemId}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a202c] relative flex flex-col font-sans overflow-x-clip">
      {/* Sticky / Fixed Header */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Sections with top offset for fixed header */}
      <main className="flex-1 pt-14 sm:pt-16">
        {isCheckout ? (
          <CheckoutPage itemId={checkoutItemId} />
        ) : isPaymentSuccess ? (
          <PaymentSuccessPage />
        ) : isPaymentFail ? (
          <PaymentFailPage />
        ) : policyKind ? (
          <PolicyPage kind={policyKind} />
        ) : servicePageItem ? (
          <>
            <ServicePortfolioModal
              variant="page"
              service={servicePageItem}
              initialCaseId={servicePageCaseId}
              onClose={() => {}}
              onApplyService={handleApplyServiceFromModal}
            />
            <LeadCaptureForm prefilledTaskType={servicePageItem.id} />
          </>
        ) : (
        <>
        {/* 1. Hero Section with Live Simulator */}
        <HeroSection onSelectService={(id) => setPrefilledTaskType(id)} />

        {/* 2. Services Section (8 Core Business Offerings) */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenPortfolioCase={handleOpenPortfolioGallery}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 3. Expert Team Section (Human-In-The-Loop with Real Photos) */}
        <ExpertTeamSection />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Portfolio Showcase (Case Studies Slider) */}
        <PortfolioShowcase />

        {/* 6. Client Reviews (Verified Quotes & Photos) */}
        <ClientReviewsSection />

        {/* 7. Transparent Pricing Plans & Credit Purchases */}
        <PricingPlans
          onSelectPlan={handleSelectPlan}
          onOpenPayment={handleOpenPayment}
        />

        {/* 8. FAQ Section */}
        <FAQSection />

        {/* 9. Interactive Lead Capture Form */}
        <LeadCaptureForm
          prefilledTaskType={prefilledTaskType}
        />
        </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button & Interactive AI Chatbot */}
      <FloatingCTA onOpenConsultation={handleOpenConsultation} />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onApplyService={handleApplyServiceFromModal}
        onOpenPortfolioGallery={handleOpenPortfolioGallery}
      />

      {/* Service 3~5 Multi-Portfolio Gallery Modal */}
      <ServicePortfolioModal
        service={selectedPortfolioService}
        initialCaseId={selectedPortfolioCaseId}
        onClose={() => {
          setSelectedPortfolioService(null);
          setSelectedPortfolioCaseId(undefined);
        }}
        onApplyService={handleApplyServiceFromModal}
      />

    </div>
  );
}

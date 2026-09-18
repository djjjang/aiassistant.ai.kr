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
import { PaymentModal } from './components/PaymentModal';
import { MyDashboardModal } from './components/MyDashboardModal';
import { ServiceItem, PaymentItemSelection, PaymentReceipt } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPortfolioService, setSelectedPortfolioService] = useState<ServiceItem | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('business_pro');
  const [prefilledTaskType, setPrefilledTaskType] = useState<string>('document');

  // Payment & Dashboard state
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<'tasks' | 'payments'>('tasks');
  const [paymentSelection, setPaymentSelection] = useState<PaymentItemSelection | null>(null);
  const [userCredits, setUserCredits] = useState<number>(0);

  const handleOpenDashboard = (tab: 'tasks' | 'payments' = 'tasks') => {
    setDashboardInitialTab(tab);
    setIsDashboardOpen(true);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user_credits');
      if (stored) {
        setUserCredits(parseInt(stored, 10));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleOpenPortfolioGallery = (service: ServiceItem) => {
    // Close detail modal if open, open the 3~5 case studies gallery modal
    setSelectedService(null);
    setSelectedPortfolioService(service);
  };

  const handleApplyServiceFromModal = (serviceName: string) => {
    if (serviceName.includes('문서')) setPrefilledTaskType('document');
    else if (serviceName.includes('콘텐츠')) setPrefilledTaskType('content');
    else if (serviceName.includes('리서치')) setPrefilledTaskType('research');
    else if (serviceName.includes('데이터')) setPrefilledTaskType('data');
    else if (serviceName.includes('맞춤형')) setPrefilledTaskType('custom');
    else setPrefilledTaskType('other');

    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConsultation = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPayment = (selection?: PaymentItemSelection) => {
    setPaymentSelection(selection || {
      type: 'plan',
      id: selectedPlanId,
      name: '비즈니스 프로',
      price: 590000,
      billingCycle: 'monthly'
    });
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (receipt: PaymentReceipt) => {
    if (receipt.creditsAdded) {
      setUserCredits((prev) => prev + (receipt.creditsAdded || 0));
    }
    if (receipt.activatedPlanId) {
      setSelectedPlanId(receipt.activatedPlanId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a202c] relative flex flex-col font-sans overflow-x-clip">
      {/* Sticky / Fixed Header */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenPayment={() => handleOpenPayment()}
        onOpenDashboard={handleOpenDashboard}
        userCredits={userCredits}
      />

      {/* Main Content Sections with top offset for fixed header */}
      <main className="flex-1 pt-14 sm:pt-16">
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

        {/* 4. How It Works (4-step, 48h turnaround) */}
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
          selectedPlanId={selectedPlanId}
          prefilledTaskType={prefilledTaskType}
          onOpenPayment={() => handleOpenPayment()}
          userCredits={userCredits}
        />
      </main>

      {/* Footer */}
      <Footer onOpenDashboard={handleOpenDashboard} />

      {/* Floating Action Button */}
      <FloatingCTA />

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
        onClose={() => setSelectedPortfolioService(null)}
        onApplyService={handleApplyServiceFromModal}
      />

      {/* Payment & Credit Recharge Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        initialSelection={paymentSelection}
        onPaymentSuccess={handlePaymentSuccess}
        onOpenDashboard={() => handleOpenDashboard('payments')}
      />

      {/* MyPage / Payment History Dashboard Modal */}
      <MyDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        userCredits={userCredits}
        selectedPlanId={selectedPlanId}
        initialTab={dashboardInitialTab}
        onOpenPayment={(selection) => {
          setIsDashboardOpen(false);
          handleOpenPayment(selection);
        }}
        onOpenConsultation={() => {
          setIsDashboardOpen(false);
          handleOpenConsultation();
        }}
      />
    </div>
  );
}

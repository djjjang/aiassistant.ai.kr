import React, { useState } from 'react';
import {
  Presentation,
  FileCheck,
  Palette,
  Megaphone,
  Globe,
  Video,
  FileText,
  ArrowRight,
  Sparkles,
  Briefcase,
  MessageCircle,
  ExternalLink,
  Layers,
  History,
  RotateCcw,
  Play
} from 'lucide-react';
import { SERVICES_DATA, SERVICES_DATA_LEGACY } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenPortfolioCase?: (service: ServiceItem, initialCaseId?: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenPortfolioCase,
  onOpenConsultation
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ppt' | 'contract' | 'design' | 'marketing' | 'website' | 'video'>('all');
  const [isLegacyView, setIsLegacyView] = useState<boolean>(false);
  const [pptPreviewIdx, setPptPreviewIdx] = useState<number>(0);
  const [contractPreviewIdx, setContractPreviewIdx] = useState<number>(0);
  const [designPreviewIdx, setDesignPreviewIdx] = useState<number>(0);
  const [websitePreviewIdx, setWebsitePreviewIdx] = useState<number>(0);
  const [videoPreviewIdx, setVideoPreviewIdx] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation':
        return <Presentation className="w-4 h-4" />;
      case 'FileCheck':
        return <FileCheck className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Video':
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const activeServicesList = isLegacyView ? SERVICES_DATA_LEGACY : SERVICES_DATA;

  const filteredServices = activeServicesList.filter((s) => {
    if (selectedFilter === 'all') return true;
    return s.id === selectedFilter;
  });

  return (
    <section
      id="services-section"
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#eae6df]"
      data-purpose="services-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Title with Version Status */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#f05a22] tracking-wider uppercase">
                AI BUSINESS WORK POOL
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#f05a22]">
                {isLegacyView ? '이전 7대 업무 버전' : '신규 6대 핵심 업무 영역'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2439] leading-snug">
              기업의 모든 실무 업무,<br />
              6개 핵심 영역으로 완벽 대행합니다
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-lg md:text-right">
              각 영역별 <strong>실제 납품 포트폴리오와 산출물 예시</strong>를 바로 확인하실 수 있습니다.
            </p>
            {/* Version Memory & Rollback Notice Button */}
            <button
              type="button"
              onClick={() => setIsLegacyView(!isLegacyView)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 transition cursor-pointer"
              title="언제든 이전 7개 업무 버전으로 전환 가능"
            >
              <RotateCcw className="w-3 h-3 text-[#f05a22]" />
              <span>{isLegacyView ? '신규 6대 영역으로 복귀' : '이전 7대 업무 버전 확인/롤백'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체 보기
          </button>
          <button
            onClick={() => setSelectedFilter('ppt')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'ppt'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            1. PPT제작 (사업계획서·투자제안서)
          </button>
          <button
            onClick={() => setSelectedFilter('contract')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'contract'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            2. 계약서 업무 (작성·검토)
          </button>
          <button
            onClick={() => setSelectedFilter('design')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'design'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            3. 디자인 업무 (상세페이지·배너)
          </button>
          <button
            onClick={() => setSelectedFilter('marketing')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'marketing'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            4. 마케팅 업무 (SNS·보도자료)
          </button>
          <button
            onClick={() => setSelectedFilter('website')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'website'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            5. 사이트 제작 (홈페이지·쇼핑몰)
          </button>
          <button
            onClick={() => setSelectedFilter('video')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'video'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            6. 영상 제작 (숏폼·영상편집)
          </button>
        </div>

        {/* 6 Services Grid (3 cols on desktop, responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="service-list">
          {filteredServices.map((service, index) => {
            const caseCount = service.portfolioCases?.length || (service.portfolioExample ? 1 : 0);

            // Icon Background Colors
            let iconBgClass = 'bg-[#0f2439]/10 text-[#0f2439]';
            if (service.id === 'ppt') iconBgClass = 'bg-orange-50 text-[#f05a22]';
            else if (service.id === 'contract') iconBgClass = 'bg-blue-50 text-blue-700';
            else if (service.id === 'design') iconBgClass = 'bg-indigo-50 text-indigo-600';
            else if (service.id === 'marketing') iconBgClass = 'bg-amber-50 text-amber-700';
            else if (service.id === 'website') iconBgClass = 'bg-emerald-50 text-emerald-700';
            else if (service.id === 'video') iconBgClass = 'bg-rose-50 text-rose-600';

            return (
              <div
                key={service.id}
                onClick={() => {
                  const activeCaseId =
                    service.id === 'ppt' && service.portfolioCases?.[pptPreviewIdx]
                      ? service.portfolioCases[pptPreviewIdx].id
                      : service.id === 'contract' && service.portfolioCases?.[contractPreviewIdx]
                        ? service.portfolioCases[contractPreviewIdx].id
                        : service.id === 'design' && service.portfolioCases?.[designPreviewIdx]
                          ? service.portfolioCases[designPreviewIdx].id
                          : service.id === 'website' && service.portfolioCases?.[websitePreviewIdx]
                            ? service.portfolioCases[websitePreviewIdx].id
                            : service.id === 'video' && service.portfolioCases?.[videoPreviewIdx]
                              ? service.portfolioCases[videoPreviewIdx].id
                              : undefined;
                  if (onOpenPortfolioCase) onOpenPortfolioCase(service, activeCaseId);
                  else onSelectService(service);
                }}
                className="rounded-2xl bg-[#fbf9f5] border border-[#eae6df] hover:border-[#f05a22] hover:shadow-lg transition-all cursor-pointer group hover:bg-white flex flex-col justify-between overflow-hidden"
                title={`${service.name} 클릭 시 실제 납품 포트폴리오 및 산출물 갤러리 바로 열기`}
              >
                {/* Card Top: Preview Thumbnail or Visual Header */}
                {(service.previewImage || (service.portfolioCases && service.portfolioCases.length > 0)) && (
                  <div className="relative aspect-16/9 bg-slate-100 overflow-hidden border-b border-[#eae6df]">
                    <img
                      src={
                        service.id === 'ppt' && service.portfolioCases && service.portfolioCases[pptPreviewIdx]
                          ? service.portfolioCases[pptPreviewIdx].image
                          : service.id === 'contract' && service.portfolioCases && service.portfolioCases[contractPreviewIdx]
                            ? service.portfolioCases[contractPreviewIdx].image
                            : service.id === 'design' && service.portfolioCases && service.portfolioCases[designPreviewIdx]
                              ? service.portfolioCases[designPreviewIdx].image
                              : service.id === 'website' && service.portfolioCases && service.portfolioCases[websitePreviewIdx]
                                ? service.portfolioCases[websitePreviewIdx].image
                                : service.id === 'video' && service.portfolioCases && service.portfolioCases[videoPreviewIdx]
                                  ? service.portfolioCases[videoPreviewIdx].image
                                  : service.previewImage || service.portfolioCases?.[0]?.image
                      }
                      alt={service.previewImageAlt || service.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                        {service.number}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f05a22] text-white">
                        {service.turnaroundTime}
                      </span>
                    </div>

                    {/* Quick Preview Switcher for PPT */}
                    {service.id === 'ppt' && service.portfolioCases && service.portfolioCases.length > 1 && (
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setPptPreviewIdx(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            pptPreviewIdx === 0
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          1. 사업계획서(8장)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPptPreviewIdx(1)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            pptPreviewIdx === 1
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          2. 투자제안서(7장)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPptPreviewIdx(2)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            pptPreviewIdx === 2
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          3. 정부지원사업(7장)
                        </button>
                      </div>
                    )}

                    {/* Quick Preview Switcher for Contract */}
                    {service.id === 'contract' && service.portfolioCases && service.portfolioCases.length > 1 && (
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setContractPreviewIdx(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            contractPreviewIdx === 0
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          1. 용역계약서(4장)
                        </button>
                        <button
                          type="button"
                          onClick={() => setContractPreviewIdx(1)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            contractPreviewIdx === 1
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          2. 납품계약서(5장)
                        </button>
                        <button
                          type="button"
                          onClick={() => setContractPreviewIdx(2)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            contractPreviewIdx === 2
                              ? 'bg-[#f05a22] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          3. 투자계약서(6장)
                        </button>
                      </div>
                    )}

                    {/* Quick Preview Switcher for Design */}
                    {service.id === 'design' && service.portfolioCases && service.portfolioCases.length > 1 && (
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setDesignPreviewIdx(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            designPreviewIdx === 0
                              ? 'bg-[#00796B] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          1. 상세페이지 제작
                        </button>
                        <button
                          type="button"
                          onClick={() => setDesignPreviewIdx(1)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            designPreviewIdx === 1
                              ? 'bg-[#00796B] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          2. 배너·팝업
                        </button>
                        <button
                          type="button"
                          onClick={() => setDesignPreviewIdx(2)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            designPreviewIdx === 2
                              ? 'bg-[#00796B] text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          3. 포스터·카드뉴스
                        </button>
                      </div>
                    )}

                    {/* Quick Preview Switcher for Website */}
                    {service.id === 'website' && service.portfolioCases && service.portfolioCases.length > 1 && (
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setWebsitePreviewIdx(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            websitePreviewIdx === 0
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          1. 스템블리스(공식홈)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWebsitePreviewIdx(1)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            websitePreviewIdx === 1
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          2. BT24(스마트스토어)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWebsitePreviewIdx(2)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            websitePreviewIdx === 2
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          3. AI비서(원페이지)
                        </button>
                      </div>
                    )}

                    {/* Quick Preview Switcher for Video */}
                    {service.id === 'video' && service.portfolioCases && service.portfolioCases.length > 1 && (
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setVideoPreviewIdx(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            videoPreviewIdx === 0
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          1. 뷰티BJ시상식(쇼츠)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoPreviewIdx(1)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            videoPreviewIdx === 1
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          2. AI비서 튜토리얼
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoPreviewIdx(2)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            videoPreviewIdx === 2
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          3. 브랜드 필름
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                      <span className="text-[11px] font-semibold text-gray-200 truncate pr-2">
                        {service.id === 'ppt' && service.portfolioCases && service.portfolioCases[pptPreviewIdx]
                          ? service.portfolioCases[pptPreviewIdx].title
                          : service.id === 'contract' && service.portfolioCases && service.portfolioCases[contractPreviewIdx]
                            ? service.portfolioCases[contractPreviewIdx].title
                            : service.id === 'design' && service.portfolioCases && service.portfolioCases[designPreviewIdx]
                              ? service.portfolioCases[designPreviewIdx].title
                              : service.id === 'website' && service.portfolioCases && service.portfolioCases[websitePreviewIdx]
                                ? `${service.portfolioCases[websitePreviewIdx].client} • ${service.portfolioCases[websitePreviewIdx].title}`
                                : service.id === 'video' && service.portfolioCases && service.portfolioCases[videoPreviewIdx]
                                  ? `${service.portfolioCases[videoPreviewIdx].client} • ${service.portfolioCases[videoPreviewIdx].title}`
                                  : (service.portfolioExample?.client || '대표 고객사 납품 사례')}
                      </span>
                      <span className={`text-[10px] ${service.id === 'video' ? 'bg-rose-600' : 'bg-[#f05a22]'} text-white px-2 py-0.5 rounded-full flex items-center gap-1 font-bold shadow-xs shrink-0`}>
                        {service.id === 'video' ? (
                          <>
                            <Play className="w-3 h-3 text-white fill-white" />
                            실제 영상 시청 ({caseCount}종)
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-3 h-3 text-white" />
                            {service.id === 'ppt'
                              ? `슬라이드 전체 보기`
                              : service.id === 'contract' && service.portfolioCases && service.portfolioCases[contractPreviewIdx]?.galleryImages
                                ? `계약서 ${service.portfolioCases[contractPreviewIdx].galleryImages?.length}장 전체 보기`
                                : service.id === 'website' && service.portfolioCases && service.portfolioCases[websitePreviewIdx]?.galleryImages
                                  ? `슬라이드 ${service.portfolioCases[websitePreviewIdx].galleryImages?.length}종 전체 보기`
                                : (service.portfolioCases?.[0]?.galleryImages && service.portfolioCases[0].galleryImages.length > 1)
                                  ? `슬라이드 ${service.portfolioCases[0].galleryImages.length}종 보기`
                                  : `포트폴리오 ${caseCount}종 보기`}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className={`w-9 h-9 rounded-xl ${iconBgClass} flex items-center justify-center font-bold shadow-2xs`}>
                        {getIcon(service.icon)}
                      </div>
                      <span className="text-[10px] tracking-wider text-gray-400 font-bold uppercase">
                        {service.categoryCode}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#0f2439] mb-1.5 group-hover:text-[#f05a22] transition-colors flex items-center justify-between">
                      <span>{service.name}</span>
                      <span className="text-xs font-normal text-gray-400 font-sans">
                        납기: {service.turnaroundTime}
                      </span>
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white text-gray-700 border border-gray-200/80 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenPortfolioCase) onOpenPortfolioCase(service);
                        else onSelectService(service);
                      }}
                      className="text-xs bg-[#0f2439] hover:bg-[#f05a22] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#f05a22] group-hover:text-white" />
                      <span>포트폴리오 사례 보기</span>
                    </button>

                    <a
                      href="http://pf.kakao.com/_xnSxeiT/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-gray-600 hover:text-black font-semibold flex items-center gap-1 py-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#f05a22]" />
                      <span>견적 문의</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Consultation CTA Banner Under Services */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0f2439] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
              <span>실무 맞춤형 원스톱 대행 서비스</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-1">
              우리 기업에 필요한 작업이 맞는지 궁금하신가요?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              샘플 작업 1건 무상 테스트 및 전담 매니저의 1:1 맞춤 견적을 카카오톡으로 실시간 안내해 드립니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              id="services-kakao-cta"
              href="http://pf.kakao.com/_xnSxeiT/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#f05a22] text-white font-bold text-sm shadow-md hover:bg-[#d94e1c] active:scale-[0.98] transition cursor-pointer gap-2 select-none"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>카카오톡 1:1 즉시 상담</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition cursor-pointer"
            >
              <span>무료 업무 견적 신청</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

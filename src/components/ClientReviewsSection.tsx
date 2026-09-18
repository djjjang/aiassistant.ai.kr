import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export const ClientReviewsSection: React.FC = () => {
  return (
    <section
      id="customer-reviews"
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      data-purpose="customer-reviews"
    >
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider block mb-1">
          CLIENT REVIEWS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2439]">
          실무자들이 이야기하는<br />
          AI비서의 진가
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
          <span className="font-bold text-gray-800">실무자 만족도 4.9 / 5.0</span>
          <span>•</span>
          <span className="text-[#f05a22] font-bold">재구독률 92%</span>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {REVIEWS_DATA.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 lg:p-8 rounded-2xl border border-[#eae6df] shadow-2xs hover:border-[#0f2439]/30 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400 text-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex gap-1">
                  {review.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium mb-4">
                {review.content}
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden shrink-0 border border-gray-200 shadow-2xs">
                <img
                  src={review.image}
                  alt={review.author}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#0f2439] flex items-center gap-1">
                  <span>{review.author}</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                </div>
                <div className="text-[10px] text-gray-400 truncate">{review.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

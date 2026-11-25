import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSparkles, IconArrowRight, IconTruck, IconShieldCheck } from '../common/Icons';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSmartDashboardTab } = useApp();

  const slides = [
    {
      title: 'Fresho Farm Vegetables & Fruits',
      subtitle: 'Har Din Sasta! Nashik Onions, Winter Carrots & Ripe Bananas',
      badge: 'FLAT 25% - 40% OFF',
      cta: 'Shop Fresh Produce',
      category: 'fruits-veg',
      bgGradient: 'from-emerald-900 via-green-800 to-teal-950',
      accentColor: 'text-emerald-300',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'SmartBasket Meal Planner',
      subtitle: 'Scale ingredients for Paneer Butter Masala, Biryani & Dal Tadka in 1-tap',
      badge: 'NOVEL AI FEATURE',
      cta: 'Launch Meal Planner',
      action: 'smart-dashboard',
      bgGradient: 'from-amber-950 via-orange-900 to-red-950',
      accentColor: 'text-amber-300',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'bb Royal Organic & Daily Staples',
      subtitle: '100% MP Sharbati Atta, Unpolished Toor Dal & Pure Desi Cow Ghee',
      badge: 'MEGA SAVINGS WEEK',
      cta: 'Explore Staples',
      category: 'staples',
      bgGradient: 'from-blue-950 via-indigo-900 to-slate-900',
      accentColor: 'text-sky-300',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-900 text-white min-h-[320px] sm:min-h-[360px] flex items-center">
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-all duration-700`} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Copy */}
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20 mb-3">
            <IconSparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className={slide.accentColor}>{slide.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 mt-2.5 leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => {
                if (slide.action === 'smart-dashboard') {
                  setActiveView('smart-dashboard');
                  setSmartDashboardTab('meal-planner');
                } else if (slide.category) {
                  setSelectedCategory(slide.category as any);
                  setActiveView('catalogue');
                } else {
                  setActiveView('catalogue');
                }
              }}
              className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <span>{slide.cta}</span>
              <IconArrowRight className="w-4 h-4 text-green-700" />
            </button>

            <button
              onClick={() => {
                setActiveView('smart-dashboard');
                setSmartDashboardTab('budget-guardian');
              }}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
            >
              Budget Guardian
            </button>
          </div>

          {/* Quick Perks Row */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/15 text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <IconTruck className="w-4 h-4 text-green-400" />
              <span>Free Delivery on ₹499+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconShieldCheck className="w-4 h-4 text-green-400" />
              <span>Contactless Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="hidden md:block w-72 lg:w-96 h-56 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


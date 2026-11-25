import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { CategoryTiles } from './CategoryTiles';
import { ProductCard } from '../product/ProductCard';
import { IconChefHat, IconShieldCheck, IconLeaf, IconArrowRight, IconSparkles, IconClock } from '../common/Icons';
import { formatINR } from '../../utils/formatters';

export const HomeView: React.FC = () => {
  const {
    products,
    setActiveView,
    setSelectedCategory,
    setSmartDashboardTab,
    budgetRemaining,
    budgetLimit,
  } = useApp();

  const bestsellers = products.filter(p => p.rating >= 4.6).slice(0, 5);
  const clearanceDeals = products.filter(p => p.isClearance).slice(0, 5);
  const seasonalPicks = products.filter(p => p.isSeasonal).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* 1. Hero Promo Banner */}
      <HeroBanner />

      {/* 2. Three Novel Features Interactive Showcase Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-gray-900 flex items-center gap-1.5">
              <IconSparkles className="w-4 h-4 text-emerald-600" />
              <span>Smart Grocery Features</span>
            </span>
            <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Exclusive to FreshBasket
            </span>
          </div>
          <button
            onClick={() => {
              setActiveView('smart-dashboard');
              setSmartDashboardTab('meal-planner');
            }}
            className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            <span>Open All Tools</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Meal Planner */}
          <div
            onClick={() => {
              setActiveView('smart-dashboard');
              setSmartDashboardTab('meal-planner');
            }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 hover:border-amber-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                  <IconChefHat className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
                  5 Indian Recipes
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">
                SmartBasket Meal Planner
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Choose Paneer Butter Masala, Dum Biryani or Dal Tadka. Scale servings dynamically and add all ingredients to your cart in 1-click.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Try Recipe Planner</span>
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Budget Guardian */}
          <div
            onClick={() => {
              setActiveView('smart-dashboard');
              setSmartDashboardTab('budget-guardian');
            }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 border border-green-200/80 hover:border-green-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2.5 rounded-xl bg-green-600 text-white shadow-xs">
                  <IconShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold bg-green-200/70 text-green-900 px-2 py-0.5 rounded-full">
                  Limit: {formatINR(budgetLimit)}
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">
                Budget Guardian
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Set weekly grocery budgets with live spending warnings. Get smart 1-click "Swap & Save" suggestions for cheaper comparable items.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-green-200/60 flex items-center justify-between text-xs font-bold text-green-800">
              <span>{formatINR(budgetRemaining)} remaining</span>
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Freshness & Waste Saver */}
          <div
            onClick={() => {
              setActiveView('smart-dashboard');
              setSmartDashboardTab('waste-saver');
            }}
            className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200/80 hover:border-teal-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2.5 rounded-xl bg-teal-600 text-white shadow-xs">
                  <IconLeaf className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold bg-teal-200/70 text-teal-900 px-2 py-0.5 rounded-full">
                  Up to 45% OFF
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">
                Freshness & Waste Saver
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Shop near-date clearance bargains and seasonal farm harvests. Reduce food waste and save big with chef-crafted zero-waste bundles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center justify-between text-xs font-bold text-teal-800">
              <span>Rescue Fresh Deals</span>
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Shop by Category */}
      <CategoryTiles />

      {/* 4. Section: Bestsellers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-1.5">
              <span>Top Bestsellers in Your City</span>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                ★ 4.6+ Rated
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              Most loved daily groceries ordered by over 50,000 households
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('catalogue');
            }}
            className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            <span>View All</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 5. Section: Simulated Clearance & Flash Deals */}
      <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-200/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500 text-white">
                <IconClock className="w-3.5 h-3.5" />
              </span>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">
                Simulated Flash Clearance Deals
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                Save Up to 45%
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              Short-dated dairy, bakery, and produce batches. Perfectly safe, high quality, and ready to cook!
            </p>
          </div>

          <button
            onClick={() => {
              setActiveView('smart-dashboard');
              setSmartDashboardTab('waste-saver');
            }}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <span>All Waste-Saver Deals</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {clearanceDeals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              customDiscountBadge={`CLEARANCE ${product.clearanceDiscount}% OFF`}
            />
          ))}
        </div>
      </div>

      {/* 6. Section: Winter Seasonal Picks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-1.5">
              <IconLeaf className="w-4 h-4 text-emerald-600" />
              <span>Seasonal Harvest Special Picks</span>
            </h3>
            <p className="text-xs text-gray-500">
              Crisp winter carrots, ripe tomatoes, and farm-fresh greens harvested this morning
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('fruits-veg');
              setActiveView('catalogue');
            }}
            className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            <span>Explore Produce</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {seasonalPicks.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};


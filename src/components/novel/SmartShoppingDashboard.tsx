import React from 'react';
import { useApp } from '../../context/AppContext';
import { SmartBasketPlanner } from './SmartBasketPlanner';
import { BudgetGuardian } from './BudgetGuardian';
import { FreshnessWasteSaver } from './FreshnessWasteSaver';
import { IconChefHat, IconShieldCheck, IconLeaf, IconSparkles } from '../common/Icons';
import { formatINR } from '../../utils/formatters';

export const SmartShoppingDashboard: React.FC = () => {
  const {
    smartDashboardTab,
    setSmartDashboardTab,
    budgetRemaining,
    budgetStatus,
    products,
  } = useApp();

  const clearanceDealsCount = products.filter(p => p.isClearance).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-bold border border-white/20 mb-3">
            <IconSparkles className="w-4 h-4 text-emerald-300" />
            <span>AI-Powered Grocery Intelligence Suite</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            FreshBasket Smart Shopping Hub
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            Eliminate grocery guesswork. Plan authentic Indian dinners with auto-scaled ingredients, protect your weekly household budget, and rescue fresh near-date produce with steep clearance markdowns.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">
                Recipes Available
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                5 Regional Meals
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">
                Budget Remaining
              </span>
              <span className={`text-base sm:text-lg font-black ${
                budgetStatus === 'exceeded' ? 'text-red-300' : 'text-emerald-300'
              }`}>
                {formatINR(budgetRemaining)}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">
                Rescue Deals
              </span>
              <span className="text-base sm:text-lg font-black text-amber-300">
                {clearanceDealsCount} Flash Markdowns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-xs border border-gray-200 flex flex-wrap gap-2">
        <button
          onClick={() => setSmartDashboardTab('meal-planner')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
            smartDashboardTab === 'meal-planner'
              ? 'bg-green-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <IconChefHat className="w-5 h-5" />
          <span>1. SmartBasket Meal Planner</span>
        </button>

        <button
          onClick={() => setSmartDashboardTab('budget-guardian')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
            smartDashboardTab === 'budget-guardian'
              ? 'bg-green-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <IconShieldCheck className="w-5 h-5" />
          <span>2. Budget Guardian</span>
        </button>

        <button
          onClick={() => setSmartDashboardTab('waste-saver')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
            smartDashboardTab === 'waste-saver'
              ? 'bg-green-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <IconLeaf className="w-5 h-5" />
          <span>3. Freshness & Waste Saver</span>
        </button>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-300">
        {smartDashboardTab === 'meal-planner' && <SmartBasketPlanner />}
        {smartDashboardTab === 'budget-guardian' && <BudgetGuardian />}
        {smartDashboardTab === 'waste-saver' && <FreshnessWasteSaver />}
      </div>
    </div>
  );
};


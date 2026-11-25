import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';
import { IconShieldCheck, IconTruck, IconRefreshCw, IconSparkles } from './Icons';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSmartDashboardTab } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-12 pb-8 border-t border-gray-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top 4 Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-gray-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
              <IconTruck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">15-30 Mins Express</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Delivered right to your doorstep from hyper-local dark stores.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
              <IconShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">100% Quality Assured</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Directly sourced from trusted farmers and certified food brands.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
              <IconRefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">No-Questions Return</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Instant refund or replacement if you are not 100% satisfied.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
              <IconSparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">AI Smart Shopping</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Meal planning, budget guard rails, and sustainable rescue deals.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌱</span>
              <span className="font-black text-white text-lg tracking-tight">freshbasket</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
              India's smart online grocery supermarket. Delivering farm-fresh vegetables, dairy, grains, and kitchen essentials in minutes.
            </p>
            <div className="text-[11px] text-gray-500">
              Customer Support: <span className="text-gray-300">support@freshbasket.demo</span>
            </div>
          </div>

          <div>
            <h6 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Grocery Categories
            </h6>
            <ul className="space-y-2 text-[11px]">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveView('catalogue');
                    }}
                    className="hover:text-green-400 transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Smart Shopping Suite
            </h6>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => {
                    setActiveView('smart-dashboard');
                    setSmartDashboardTab('meal-planner');
                  }}
                  className="hover:text-green-400 transition-colors text-left"
                >
                  🍳 SmartBasket Meal Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('smart-dashboard');
                    setSmartDashboardTab('budget-guardian');
                  }}
                  className="hover:text-green-400 transition-colors text-left"
                >
                  🛡️ Budget Guardian (Live Meter)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('smart-dashboard');
                    setSmartDashboardTab('waste-saver');
                  }}
                  className="hover:text-green-400 transition-colors text-left"
                >
                  🌱 Freshness & Waste Saver (Clearance)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('orders')}
                  className="hover:text-green-400 transition-colors text-left"
                >
                  📦 Order History & Re-ordering
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Accepted Payment Modes
            </h6>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">UPI (GPay / PhonePe)</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">RuPay / Visa / Master</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Net Banking</span>
              <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Cash on Delivery</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 leading-tight">
              🔒 256-bit SSL encrypted checkout simulation.
            </p>
          </div>
        </div>

        {/* Bottom Educational Disclosure Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-[10px] gap-3">
          <p>© 2026 FreshBasket Inc. All rights reserved.</p>
          <p className="text-center md:text-right text-gray-400 max-w-xl">
            <strong>Educational Showcase Disclosure:</strong> FreshBasket is an independent, non-commercial grocery e-commerce showcase featuring novel UI/UX patterns. Not affiliated with, sponsored by, or endorsed by BigBasket / Supermarket Grocery Supplies Pvt Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};


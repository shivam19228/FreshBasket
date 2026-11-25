import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, calculateSavings } from '../../utils/formatters';
import { IconLeaf, IconClock, IconSparkles, IconCart, IconPlus, IconCheck, IconShieldCheck } from '../common/Icons';

export const FreshnessWasteSaver: React.FC = () => {
  const { products, addToCart, showToast } = useApp();

  // Filter products by metadata
  const clearanceDeals = products.filter(p => p.isClearance && p.clearanceDiscount);
  const seasonalPicks = products.filter(p => p.isSeasonal);

  // Bundle 3 items for a quick Zero-Waste Palak Paneer dinner bundle
  const bundleProductIds = ['db-paneer-1', 'fv-palak-1', 'fv-tomato-1'];
  const bundleItems = bundleProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  const bundleOriginalTotal = bundleItems.reduce((sum, p) => sum + p.price, 0);
  const bundleClearanceTotal = bundleItems.reduce((sum, p) => {
    const discounted = p.isClearance && p.clearanceDiscount 
      ? Math.round(p.price * (1 - p.clearanceDiscount / 100))
      : p.price;
    return sum + discounted;
  }, 0);
  const bundleSavings = bundleOriginalTotal - bundleClearanceTotal;

  const handleAddBundleToCart = () => {
    bundleItems.forEach(item => {
      const discountedPrice = item.isClearance && item.clearanceDiscount 
        ? Math.round(item.price * (1 - item.clearanceDiscount / 100))
        : item.price;
      addToCart(item, 1, discountedPrice);
    });

    showToast(`Added Zero-Waste Palak-Paneer Bundle to cart! Saved extra ${formatINR(bundleSavings)} 🌱`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
      {/* Header with Transparency Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <IconLeaf className="w-6 h-6" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                Freshness & Waste Saver
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Eco-Friendly Savings
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Save up to 45% on short-dated dairy and peak seasonal farm produce. Prevents food waste while reducing your grocery budget.
            </p>
          </div>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-xl text-xs max-w-sm">
          <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-800">
            <IconClock className="w-3.5 h-3.5 text-amber-600" />
            Simulated Demo Notice
          </span>
          <p className="text-[11px] text-amber-800/90 mt-0.5">
            Near-expiry dates and clearance batches are local simulation data showcasing algorithmic markdown and sustainable grocery routing.
          </p>
        </div>
      </div>

      {/* Featured Zero-Waste Use-Soon Bundle Card */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 text-white relative overflow-hidden shadow-md">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Chef's Zero-Waste Cook Basket</span>
            </div>
            <h3 className="text-lg font-black text-white">
              Tonight's Quick "Palak-Paneer & Fresh Rotis" Kit
            </h3>
            <p className="text-xs text-emerald-100 max-w-xl mt-1 leading-relaxed">
              Crafted from farm-harvested spinach and short-dated artisanal malai paneer. Perfectly safe, extra fresh, and ready to cook today!
            </p>

            {/* Bundle Items Mini Thumbnails */}
            <div className="flex items-center gap-3 mt-4">
              {bundleItems.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/15">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <div className="text-[11px]">
                    <span className="font-semibold block text-white truncate max-w-[120px]">
                      {item.name}
                    </span>
                    <span className="text-emerald-300 text-[10px]">
                      {item.isClearance ? `${item.clearanceDiscount}% OFF` : item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle CTA */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center shrink-0 w-full lg:w-auto">
            <span className="text-[11px] text-emerald-200 block uppercase font-bold">
              Zero-Waste Bundle Price
            </span>
            <div className="flex items-baseline justify-center gap-2 my-1">
              <span className="text-2xl font-black text-white">
                {formatINR(bundleClearanceTotal)}
              </span>
              <span className="text-xs text-emerald-300 line-through">
                {formatINR(bundleOriginalTotal)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 font-bold block mb-3">
              You Save Extra {formatINR(bundleSavings)}
            </span>

            <button
              onClick={handleAddBundleToCart}
              className="w-full px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <IconCart className="w-4 h-4 text-emerald-800" />
              <span>Add Bundle to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 1. Near-Expiry Clearance Deals & 2. Seasonal Harvest Picks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Section 1: Near-Expiry Clearance Deals */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <IconClock className="w-4 h-4 text-amber-600" />
                <span>Near-Date Clearance (35% - 45% OFF)</span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Safe, high-quality batches best consumed within 24-48 hours.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {clearanceDeals.length} Flash Deals
            </span>
          </div>

          <div className="space-y-3">
            {clearanceDeals.map(product => {
              const discountedPrice = Math.round(product.price * (1 - (product.clearanceDiscount || 0) / 100));
              const savings = calculateSavings(product.mrp, discountedPrice);

              return (
                <div
                  key={product.id}
                  className="p-3.5 rounded-xl bg-gray-50 hover:bg-amber-50/40 border border-gray-200 hover:border-amber-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                      />
                      <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                        {product.clearanceDiscount}% OFF
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded shrink-0">
                          ⏱ {product.expiryDays}d left
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">
                        💡 {product.wasteExplanation}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-black text-gray-900">
                          {formatINR(discountedPrice)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatINR(product.mrp)}
                        </span>
                        <span className="text-[10px] text-green-700 font-bold">
                          Save {formatINR(savings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1, discountedPrice)}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all shrink-0 flex items-center gap-1 active:scale-95"
                    title="Add Clearance Deal to Cart"
                  >
                    <IconPlus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Peak Seasonal Farm Harvest Picks */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <IconLeaf className="w-4 h-4 text-emerald-600" />
                <span>Seasonal Farm Harvest Picks</span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Peak flavour, high nutritional value, directly from regional farms.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Farm Fresh
            </span>
          </div>

          <div className="space-y-3">
            {seasonalPicks.map(product => {
              const savings = calculateSavings(product.mrp, product.price);

              return (
                <div
                  key={product.id}
                  className="p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50/40 border border-gray-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                      />
                      <span className="absolute -top-1.5 -left-1.5 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                        {product.seasonName?.split(' ')[0] || 'Seasonal'}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-gray-500 bg-gray-200 px-1.5 py-0.2 rounded shrink-0">
                          {product.unit}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">
                        🌿 {product.wasteExplanation || product.description}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-black text-gray-900">
                          {formatINR(product.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatINR(product.mrp)}
                        </span>
                        <span className="text-[10px] text-green-700 font-bold">
                          Save {formatINR(savings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs shadow-sm transition-all shrink-0 flex items-center gap-1 active:scale-95"
                    title="Add Seasonal Pick to Cart"
                  >
                    <IconPlus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


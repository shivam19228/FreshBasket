import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { IconShieldCheck, IconAlertTriangle, IconCheck, IconSwap, IconPlus, IconSparkles } from '../common/Icons';

export const BudgetGuardian: React.FC = () => {
  const {
    products,
    cart,
    budgetLimit,
    setBudgetLimit,
    isBudgetEnabled,
    toggleBudget,
    budgetSpent,
    budgetRemaining,
    budgetPercentage,
    budgetStatus,
    replaceWithAlternative,
    addToCart,
    showToast,
  } = useApp();

  const [customInput, setCustomInput] = useState<string>(budgetLimit.toString());
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const presets = [1500, 2500, 3500, 5000];

  const handleSaveBudget = (amount: number) => {
    if (amount > 0) {
      setBudgetLimit(amount);
      setCustomInput(amount.toString());
      setIsEditing(false);
    }
  };

  // Find all items currently in cart that have a cheaper alternative available in catalogue
  const cartSwappableOpportunities = cart.map(item => {
    // Find all products in the same comparableGroupId that are cheaper
    if (!item.product.comparableGroupId) return null;

    const alternatives = products.filter(p => 
      p.comparableGroupId === item.product.comparableGroupId && 
      p.id !== item.product.id &&
      p.price < item.selectedPrice &&
      p.inStock
    );

    if (alternatives.length === 0) return null;

    // Pick the most affordable alternative
    const bestAlternative = alternatives.sort((a, b) => a.price - b.price)[0];
    const totalPotentialSavings = (item.selectedPrice - bestAlternative.price) * item.quantity;

    return {
      cartItem: item,
      bestAlternative,
      totalPotentialSavings,
    };
  }).filter(Boolean) as {
    cartItem: typeof cart[0];
    bestAlternative: typeof products[0];
    totalPotentialSavings: number;
  }[];

  // Catalogue-wide budget hero swaps for discovery
  const catalogueBudgetHeroes = products.filter(p => p.isBudgetAlternative);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className={`p-2.5 rounded-2xl ${
            budgetStatus === 'exceeded'
              ? 'bg-red-100 text-red-700'
              : budgetStatus === 'warning'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}>
            <IconShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                Budget Guardian
              </h2>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                budgetStatus === 'exceeded'
                  ? 'bg-red-100 text-red-800'
                  : budgetStatus === 'warning'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {budgetStatus === 'exceeded' ? 'Budget Exceeded' : budgetStatus === 'warning' ? 'Approaching Limit' : 'Within Safe Range'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Track your weekly grocery spend, monitor limits in real time, and swap cart items with cheaper comparable staples in one click.
            </p>
          </div>
        </div>

        {/* Enable / Disable Switch */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
          <span className="text-xs font-semibold text-gray-700">Guardian Status:</span>
          <button
            onClick={() => toggleBudget(!isBudgetEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isBudgetEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isBudgetEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Budget Visual Meter & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Spending Meter & Presets */}
        <div className="lg:col-span-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Weekly Budget Target
              </span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-green-700 hover:text-green-800 underline"
              >
                {isEditing ? 'Cancel' : 'Edit Target'}
              </button>
            </div>

            {/* Target Display or Edit Form */}
            {isEditing ? (
              <div className="space-y-3 p-3 bg-white rounded-xl border border-gray-200">
                <label className="text-xs font-bold text-gray-700 block">
                  Set Custom Weekly Limit (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full text-sm font-bold border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-green-600"
                    placeholder="e.g. 3000"
                  />
                  <button
                    onClick={() => handleSaveBudget(Number(customInput))}
                    className="px-4 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-black text-gray-900">
                  {formatINR(budgetLimit)}
                </span>
                <span className="text-xs text-gray-500">Per Week</span>
              </div>
            )}

            {/* Quick Presets */}
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
                Quick Presets:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {presets.map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleSaveBudget(amount)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                      budgetLimit === amount
                        ? 'bg-green-700 text-white border-green-700 shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-green-500'
                    }`}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-gray-600">Current Cart Spend</span>
                <span className={`${
                  budgetStatus === 'exceeded'
                    ? 'text-red-600'
                    : budgetStatus === 'warning'
                    ? 'text-amber-600'
                    : 'text-green-700'
                }`}>
                  {budgetPercentage}% Spent
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetStatus === 'exceeded'
                      ? 'bg-red-600'
                      : budgetStatus === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(100, budgetPercentage)}%` }}
                />
              </div>

              {/* Status details pill row */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">
                    Cart Total
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {formatINR(budgetSpent)}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">
                    {budgetSpent > budgetLimit ? 'Over Budget' : 'Remaining'}
                  </span>
                  <span className={`text-base font-extrabold ${
                    budgetSpent > budgetLimit ? 'text-red-600' : 'text-green-700'
                  }`}>
                    {budgetSpent > budgetLimit
                      ? `+${formatINR(budgetSpent - budgetLimit)}`
                      : formatINR(budgetRemaining)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning / Advice Card */}
          <div className="mt-4">
            {budgetStatus === 'exceeded' ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2">
                <IconAlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Budget Exceeded by {formatINR(budgetSpent - budgetLimit)}! </span>
                  Consider swapping the premium items on the right for budget-smart alternatives.
                </div>
              </div>
            ) : budgetStatus === 'warning' ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <IconAlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Approaching Weekly Limit: </span>
                  You have only {formatINR(budgetRemaining)} left before crossing your budget.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Safe Spending Zone! </span>
                  You have {formatINR(budgetRemaining)} headroom remaining this week.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Columns: Smart "Swap & Save" Opportunities */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <IconSwap className="w-4 h-4 text-green-700" />
                  <span>Smart "Swap & Save" Recommendations</span>
                </h4>
                <p className="text-[11px] text-gray-500">
                  Real-time suggestions comparing price-per-unit for items currently in your cart.
                </p>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                {cartSwappableOpportunities.length} Available Swaps in Cart
              </span>
            </div>

            {/* List of Swappable Items Currently in Cart */}
            {cartSwappableOpportunities.length > 0 ? (
              <div className="space-y-3">
                {cartSwappableOpportunities.map(({ cartItem, bestAlternative, totalPotentialSavings }, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-green-400 transition-all flex flex-col md:flex-row items-center justify-between gap-4"
                  >
                    {/* Current Cart Item */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          Current in Cart ({cartItem.quantity}x)
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 truncate">
                          {cartItem.product.name}
                        </h5>
                        <span className="text-xs font-extrabold text-gray-700">
                          {formatINR(cartItem.selectedPrice)} <span className="text-[10px] text-gray-400 font-normal">({cartItem.product.unit})</span>
                        </span>
                      </div>
                    </div>

                    {/* Arrow / Swap Icon */}
                    <div className="p-2 rounded-full bg-white shadow-xs border border-gray-200 text-green-700 shrink-0">
                      <IconSwap className="w-4 h-4" />
                    </div>

                    {/* Recommended Cheaper Alternative */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={bestAlternative.image}
                        alt={bestAlternative.name}
                        className="w-14 h-14 rounded-xl object-cover border border-green-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded">
                          Budget Alternative
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                          {bestAlternative.name}
                        </h5>
                        <span className="text-xs font-black text-green-800">
                          {formatINR(bestAlternative.price)} <span className="text-[10px] text-gray-500 font-normal">({bestAlternative.unit})</span>
                        </span>
                      </div>
                    </div>

                    {/* Swap Action Button */}
                    <div className="shrink-0 text-right w-full md:w-auto">
                      <span className="text-[11px] font-bold text-green-700 block mb-1">
                        Save {formatINR(totalPotentialSavings)}!
                      </span>
                      <button
                        onClick={() => replaceWithAlternative(cartItem.product.id, bestAlternative.id)}
                        className="w-full md:w-auto px-4 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <IconSwap className="w-3.5 h-3.5" />
                        <span>Swap & Save</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gray-50 border border-dashed border-gray-300 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-2">
                  <IconCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h5 className="text-sm font-bold text-gray-800">
                  Your cart is already highly cost-optimized!
                </h5>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                  No swappable premium items detected in your active cart. Check out these popular budget heroes below to keep your grocery bill low:
                </p>
              </div>
            )}

            {/* Popular Budget Staple Recommendations */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <IconSparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Everyday Smart Value Staples</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catalogueBudgetHeroes.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h6 className="text-xs font-bold text-gray-900 truncate">
                          {item.name}
                        </h6>
                        <span className="text-xs font-black text-gray-800">
                          {formatINR(item.price)}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-1">
                          ({item.unit})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                    >
                      <IconPlus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


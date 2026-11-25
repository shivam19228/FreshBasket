import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RECIPES } from '../../data/recipes';
import { Recipe } from '../../types';
import { formatINR } from '../../utils/formatters';
import { IconChefHat, IconPlus, IconMinus, IconCheck, IconSparkles, IconAlertTriangle, IconCart, IconSwap } from '../common/Icons';

export const SmartBasketPlanner: React.FC = () => {
  const { products, getProductById, addToCart, showToast } = useApp();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(RECIPES[0].id);
  const [servings, setServings] = useState<number>(4);
  const [customMealBudget, setCustomMealBudget] = useState<number>(350);
  const [useSubstitutions, setUseSubstitutions] = useState<Record<string, boolean>>({});

  const selectedRecipe: Recipe = RECIPES.find(r => r.id === selectedRecipeId) || RECIPES[0];

  // Ratio based on selected servings vs recipe base servings
  const servingRatio = servings / selectedRecipe.baseServings;

  // Toggle substitution for an ingredient
  const toggleSubstitution = (ingredientProductId: string) => {
    setUseSubstitutions(prev => ({
      ...prev,
      [ingredientProductId]: !prev[ingredientProductId],
    }));
  };

  // Calculate itemized ingredients, scaled quantities, and matched products
  const computedIngredients = selectedRecipe.ingredients.map(ing => {
    const isSubstituted = !!useSubstitutions[ing.productId] && !!ing.substitutionProductId;
    const targetProductId = isSubstituted ? ing.substitutionProductId! : ing.productId;
    const matchedProduct = getProductById(targetProductId);
    const originalProduct = getProductById(ing.productId);
    const subProduct = ing.substitutionProductId ? getProductById(ing.substitutionProductId) : undefined;

    // Scaled quantity needed for recipe
    const scaledQty = Math.round(ing.baseQuantity * servingRatio);
    // How many full retail packs needed for this recipe (at least 1 pack to cook)
    const packsNeeded = Math.max(1, Math.ceil(ing.productUnitMultiplier * servingRatio));
    const estimatedCost = matchedProduct ? matchedProduct.price * packsNeeded : 0;

    return {
      ...ing,
      scaledQty,
      packsNeeded,
      matchedProduct,
      originalProduct,
      subProduct,
      isSubstituted,
      estimatedCost,
    };
  });

  // Total estimated recipe cost
  const totalRecipeCost = computedIngredients.reduce((sum, item) => sum + item.estimatedCost, 0);
  const costPerServing = Math.round(totalRecipeCost / servings);
  const isOverBudget = customMealBudget > 0 && totalRecipeCost > customMealBudget;
  const budgetDifference = Math.abs(totalRecipeCost - customMealBudget);

  // Add all recipe ingredients to shared cart
  const handleAddAllToCart = () => {
    let addedCount = 0;
    computedIngredients.forEach(item => {
      if (item.matchedProduct && item.matchedProduct.inStock) {
        addToCart(item.matchedProduct, item.packsNeeded);
        addedCount++;
      }
    });

    showToast(`Added all ${addedCount} ingredients for "${selectedRecipe.title}" to cart! 🍳`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-green-100 text-green-700">
              <IconChefHat className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                SmartBasket Meal Planner
              </h2>
              <p className="text-xs text-gray-500">
                Interactive Indian recipe planner: auto-scales ingredient weights, matches real FreshBasket items, and adds everything to your cart in 1-click.
              </p>
            </div>
          </div>
        </div>

        {/* Recipe Quick Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {RECIPES.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => {
                setSelectedRecipeId(recipe.id);
                setServings(recipe.baseServings);
                setCustomMealBudget(recipe.targetBudgetPerServing * recipe.baseServings);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRecipeId === recipe.id
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {recipe.title.split(' ')[0]} {recipe.cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Details & Interactive Servings Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left: Recipe Hero Card */}
        <div className="lg:col-span-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="relative h-44 rounded-xl overflow-hidden mb-4 shadow-xs">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                ⏱ {selectedRecipe.prepTime} • {selectedRecipe.difficulty}
              </span>
            </div>

            <h3 className="text-base font-bold text-gray-900 leading-snug">
              {selectedRecipe.title}
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {selectedRecipe.description}
            </p>

            {/* Dynamic Servings Adjuster */}
            <div className="mt-5 p-3.5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700">
                  Select Servings (People)
                </span>
                <span className="text-xs font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  {servings} Servings
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setServings(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 active:scale-95 font-bold text-gray-700"
                >
                  <IconMinus className="w-4 h-4" />
                </button>
                <div className="flex-1 flex justify-center gap-1.5">
                  {[2, 4, 6, 8].map(num => (
                    <button
                      key={num}
                      onClick={() => setServings(num)}
                      className={`text-xs font-bold w-7 h-7 rounded-md transition-all ${
                        servings === num
                          ? 'bg-green-700 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setServings(prev => Math.min(12, prev + 1))}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 active:scale-95 font-bold text-gray-700"
                >
                  <IconPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Meal Budget Target Slider/Input */}
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-gray-700">Meal Budget Target</span>
                <span className="font-black text-gray-900">{formatINR(customMealBudget)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="25"
                value={customMealBudget}
                onChange={(e) => setCustomMealBudget(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹100 (Budget)</span>
                <span>₹450 (Standard)</span>
                <span>₹800 (Feast)</span>
              </div>
            </div>
          </div>

          {/* Budget Status Alert */}
          <div className="mt-4">
            {isOverBudget ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <IconAlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Over Budget by {formatINR(budgetDifference)}: </span>
                  Try toggling the smart substitutions on the right to save!
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Within Budget! </span>
                  {formatINR(totalRecipeCost)} estimated vs {formatINR(customMealBudget)} limit.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 cols: Itemized Ingredients & One-Click Add All */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Itemized Ingredients for {servings} Servings
                </h4>
                <p className="text-[11px] text-gray-500">
                  Quantities recalculated deterministically from base recipes.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block">Estimated Cost</span>
                <span className="text-lg font-black text-gray-900">
                  {formatINR(totalRecipeCost)}
                </span>
                <span className="text-[10px] text-green-700 block font-semibold">
                  (~{formatINR(costPerServing)} / serving)
                </span>
              </div>
            </div>

            {/* Ingredients Table/List */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {computedIngredients.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-green-50/50 border border-gray-200 transition-colors gap-3"
                >
                  {/* Product thumbnail & Recipe Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.matchedProduct?.image || 'https://images.unsplash.com/photo-1546470427-227c7369a941?auto=format&fit=crop&w=150&q=80'}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">
                          {item.scaledQty} {item.baseUnit}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        Matched: <span className="font-semibold text-gray-700">{item.matchedProduct?.name}</span> ({item.matchedProduct?.unit})
                      </p>

                      {/* Substitution suggestion pill if available */}
                      {item.subProduct && (
                        <button
                          onClick={() => toggleSubstitution(item.productId)}
                          className="mt-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-emerald-300 shadow-xs"
                        >
                          <IconSwap className="w-3 h-3 text-emerald-600" />
                          <span>
                            {item.isSubstituted 
                              ? `Revert to Premium (${item.originalProduct?.brand})` 
                              : `Swap with ${item.subProduct.name} (Save ${formatINR((item.originalProduct?.price || 0) - item.subProduct.price)})`}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Add Single Item */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-gray-900 block">
                        {formatINR(item.estimatedCost)}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        {item.packsNeeded} pack{item.packsNeeded > 1 ? 's' : ''}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (item.matchedProduct) {
                          addToCart(item.matchedProduct, item.packsNeeded);
                        }
                      }}
                      className="p-2 rounded-lg bg-white border border-gray-300 hover:border-green-600 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-all shadow-xs"
                      title="Add this ingredient only"
                    >
                      <IconPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add All Ingredients to Cart CTA Bar */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
            <div className="text-left">
              <span className="text-xs text-emerald-900 font-bold block">
                Total for all {computedIngredients.length} ingredients ({servings} servings)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900">
                  {formatINR(totalRecipeCost)}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  (Estimated fresh grocery basket)
                </span>
              </div>
            </div>

            <button
              onClick={handleAddAllToCart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <IconCart className="w-5 h-5" />
              <span>Add All Ingredients to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


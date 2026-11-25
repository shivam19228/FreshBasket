import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../../types';
import { IconSliders, IconSearch, IconX, IconStar } from '../common/Icons';

export const ProductGridView: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  } = useApp();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query match (name, brand, tags, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Discount
      if (product.discountPercentage < minDiscount) {
        return false;
      }

      // In-stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // featured / default
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, minDiscount, inStockOnly, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(700);
    setMinDiscount(0);
    setInStockOnly(false);
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {currentCategoryObj ? currentCategoryObj.name : 'All Groceries & Staples'}
            </h2>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} Products
            </span>
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
              <span>Showing search results for:</span>
              <strong className="text-green-700 font-extrabold">"{searchQuery}"</strong>
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-red-500 p-0.5"
                title="Clear search"
              >
                <IconX className="w-3.5 h-3.5" />
              </button>
            </p>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <IconSliders className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-bold hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-green-600 shadow-2xs"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Sidebar Filters */}
        <div className={`md:block ${isMobileFilterOpen ? 'block' : 'hidden'} md:col-span-1 space-y-5 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs h-fit`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <IconSliders className="w-4 h-4 text-green-700" />
              <span>Filters</span>
            </span>
            <button
              onClick={resetAllFilters}
              className="text-[11px] font-bold text-green-700 hover:text-green-800 underline"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-2">
              Categories
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-green-700 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>

              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-green-700 text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate">{cat.icon} {cat.name}</span>
                  <span className="text-[10px] opacity-75">({cat.itemCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <label className="font-bold text-gray-700">Max Price (₹)</label>
              <span className="font-extrabold text-green-700">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="700"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-green-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>₹30</span>
              <span>₹350</span>
              <span>₹700</span>
            </div>
          </div>

          {/* Discount Filter */}
          <div className="pt-3 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-700 block mb-2">
              Minimum Discount
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[0, 15, 25].map(pct => (
                <button
                  key={pct}
                  onClick={() => setMinDiscount(pct)}
                  className={`py-1 rounded-lg font-bold border transition-colors ${
                    minDiscount === pct
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {pct === 0 ? 'All' : `${pct}%+`}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-3 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-green-600 rounded"
              />
              <span>In-Stock Items Only</span>
            </label>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-3">
                <IconSearch className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-gray-800">
                No matching grocery items found
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-4">
                We couldn't find any products matching your selected search query or filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


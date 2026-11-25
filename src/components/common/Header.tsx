import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import {
  IconSearch,
  IconCart,
  IconHeart,
  IconMapPin,
  IconPackage,
  IconSparkles,
  IconChefHat,
  IconShieldCheck,
  IconLeaf,
  IconX,
} from './Icons';

export const Header: React.FC = () => {
  const {
    cart,
    wishlistIds,
    orders,
    finalTotal,
    setIsCartOpen,
    setIsLocationModalOpen,
    deliveryLocation,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setSmartDashboardTab,
  } = useApp();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('catalogue');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Announcement Strip */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1.5 px-4 font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              ⚡ Express 15-30 Mins Delivery
            </span>
            <span className="hidden sm:inline text-emerald-300/40">|</span>
            <span className="hidden sm:inline">
              Flat ₹100 OFF with code <strong className="text-white underline">SAVE100</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-emerald-200">100% Quality & Freshness Guarantee</span>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hover:text-white flex items-center gap-1 underline"
            >
              <IconMapPin className="w-3 h-3 text-emerald-400" />
              <span>{deliveryLocation.city} - {deliveryLocation.pincode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            <div
              onClick={() => setActiveView('home')}
              className="cursor-pointer flex items-center gap-2 select-none"
            >
              {/* FreshBasket Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-700 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <span className="text-2xl font-black">🌱</span>
              </div>
              <div>
                <div className="flex items-center text-xl font-black tracking-tight leading-none">
                  <span className="text-green-700">fresh</span>
                  <span className="text-gray-900">basket</span>
                </div>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold block mt-0.5">
                  Online Supermarket
                </span>
              </div>
            </div>

            {/* Location Selector Button */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-left transition-colors"
            >
              <IconMapPin className="w-4 h-4 text-green-700 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="text-gray-400 font-bold block uppercase text-[9px]">Deliver to</span>
                <span className="font-extrabold text-gray-800">{deliveryLocation.city}</span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl relative"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'catalogue' && e.target.value.trim().length > 0) {
                    setActiveView('catalogue');
                  }
                }}
                placeholder="Search for atta, dal, paneer, vegetables, snacks..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 hover:border-gray-400 focus:border-green-600 focus:bg-white rounded-xl text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-2xs"
              />
              <IconSearch className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600"
                >
                  <IconX className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Smart Hub Shortcut */}
            <button
              onClick={() => {
                setActiveView('smart-dashboard');
                setSmartDashboardTab('meal-planner');
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                activeView === 'smart-dashboard'
                  ? 'bg-green-700 text-white border-green-700 shadow-sm'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <IconSparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Smart Hub</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveView('wishlist')}
              className={`p-2.5 rounded-xl border relative transition-all ${
                activeView === 'wishlist'
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
              title="My Wishlist"
            >
              <IconHeart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Orders History */}
            <button
              onClick={() => setActiveView('orders')}
              className={`p-2.5 rounded-xl border relative transition-all ${
                activeView === 'orders'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
              title="Order History"
            >
              <IconPackage className="w-5 h-5" />
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {orders.length}
                </span>
              )}
            </button>

            {/* BigBasket Signature Basket Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-all active:scale-95"
            >
              <div className="relative">
                <IconCart className="w-5 h-5 stroke-[2.5]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>

              <div className="text-left hidden sm:block">
                <span className="text-[10px] font-semibold text-red-100 uppercase tracking-wider block">
                  My Basket
                </span>
                <span className="text-xs font-black leading-none">
                  {totalCartCount > 0 ? formatINR(finalTotal) : '0 Items'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Secondary Category & Quick Links Bar */}
      <div className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-3 py-2">
            {/* Shop by Category Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="px-3 py-1.5 rounded-lg bg-green-700 hover:bg-green-800 text-white font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Shop by Category</span>
                <span className="text-[10px]">{isCategoryDropdownOpen ? '▲' : '▼'}</span>
              </button>

              {/* Category Dropdown */}
              {isCategoryDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn"
                  onClick={() => setIsCategoryDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveView('catalogue');
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-green-50 flex items-center justify-between text-xs font-semibold ${
                      selectedCategory === 'all' ? 'text-green-700 font-bold bg-green-50' : 'text-gray-700'
                    }`}
                  >
                    <span>🛒 All Groceries</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveView('catalogue');
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-green-50 flex items-center justify-between text-xs font-semibold ${
                        selectedCategory === cat.id ? 'text-green-700 font-bold bg-green-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[10px] text-gray-400">({cat.itemCount})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Navigation Links */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('catalogue');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                activeView === 'catalogue' && selectedCategory === 'all'
                  ? 'text-green-700 font-bold'
                  : 'hover:text-green-700'
              }`}
            >
              All Products
            </button>

            <button
              onClick={() => {
                setActiveView('smart-dashboard');
                setSmartDashboardTab('meal-planner');
              }}
              className="px-2.5 py-1 rounded-md hover:text-green-700 transition-colors whitespace-nowrap flex items-center gap-1 text-green-800 font-bold"
            >
              <IconChefHat className="w-3.5 h-3.5 text-green-700" />
              <span>Meal Planner</span>
            </button>

            <button
              onClick={() => {
                setActiveView('smart-dashboard');
                setSmartDashboardTab('budget-guardian');
              }}
              className="px-2.5 py-1 rounded-md hover:text-green-700 transition-colors whitespace-nowrap flex items-center gap-1 text-green-800 font-bold"
            >
              <IconShieldCheck className="w-3.5 h-3.5 text-green-700" />
              <span>Budget Guardian</span>
            </button>

            <button
              onClick={() => {
                setActiveView('smart-dashboard');
                setSmartDashboardTab('waste-saver');
              }}
              className="px-2.5 py-1 rounded-md hover:text-green-700 transition-colors whitespace-nowrap flex items-center gap-1 text-amber-700 font-bold"
            >
              <IconLeaf className="w-3.5 h-3.5 text-amber-600" />
              <span>Clearance Deals</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-gray-500 py-2">
            <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded">
              ⚡ Flash Deals: Up to 45% OFF
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};


import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { IconHeart, IconArrowRight, IconCart } from '../common/Icons';

export const WishlistView: React.FC = () => {
  const { wishlistIds, products, moveToCart, setActiveView } = useApp();

  const wishlistProducts = wishlistIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <IconHeart className="w-6 h-6 text-red-500 fill-red-500" />
            <span>My Wishlist ({wishlistProducts.length} items)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Your saved grocery items, household staples, and weekly replenishment picks.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={() => {
              wishlistProducts.forEach(p => moveToCart(p.id));
            }}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <IconCart className="w-4 h-4" />
            <span>Move All to Basket</span>
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-400 mb-3">
            <IconHeart className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-gray-800">Your wishlist is empty</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-6">
            Tap the heart icon on any product in the store to save it here for fast re-ordering.
          </p>
          <button
            onClick={() => setActiveView('catalogue')}
            className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            Browse Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};


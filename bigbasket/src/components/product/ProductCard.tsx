import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR, calculateSavings } from '../../utils/formatters';
import { QuantityStepper } from '../common/QuantityStepper';
import { IconHeart, IconHeartFilled, IconStar, IconSparkles } from '../common/Icons';

interface ProductCardProps {
  product: Product;
  customDiscountBadge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, customDiscountBadge }) => {
  const {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartItemQuantity,
    toggleWishlist,
    isInWishlist,
    setSelectedProductDetails,
  } = useApp();

  const inWishlist = isInWishlist(product.id);
  const currentQty = getCartItemQuantity(product.id);

  // Clearance discount price calculation if applicable
  const displayPrice = product.isClearance && product.clearanceDiscount
    ? Math.round(product.price * (1 - product.clearanceDiscount / 100))
    : product.price;

  const displaySavings = calculateSavings(product.mrp, displayPrice);
  const displayDiscountPct = product.isClearance && product.clearanceDiscount
    ? product.clearanceDiscount
    : product.discountPercentage;

  return (
    <div
      onClick={() => setSelectedProductDetails(product)}
      className="group bg-white border border-gray-200 hover:border-green-400 hover:shadow-lg rounded-xl p-3 flex flex-col justify-between transition-all duration-200 relative cursor-pointer"
    >
      {/* Top Badges & Wishlist */}
      <div className="flex items-start justify-between z-10">
        <div className="flex flex-col gap-1">
          {displayDiscountPct > 0 && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide ${
              product.isClearance 
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-red-600 text-white'
            }`}>
              {customDiscountBadge || `${displayDiscountPct}% OFF`}
            </span>
          )}
          {product.isSeasonal && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
              <IconSparkles className="w-2.5 h-2.5" />
              Seasonal
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="p-1.5 rounded-full bg-white/90 hover:bg-gray-100 text-gray-400 hover:text-red-500 shadow-sm transition-all"
          title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          {inWishlist ? <IconHeartFilled className="w-4 h-4 text-red-500" /> : <IconHeart className="w-4 h-4" />}
        </button>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-36 my-2 overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80';
          }}
        />
        {/* Express Delivery Badge */}
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-gray-700 px-1.5 py-0.5 rounded shadow-xs border border-gray-100 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span>15 MINS</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            {product.brand}
          </span>
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 line-clamp-2 mt-0.5 leading-snug">
            {product.name}
          </h4>

          {/* Unit & Rating */}
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
            <span className="bg-gray-100 font-medium px-2 py-0.5 rounded text-[11px] text-gray-600">
              {product.unit}
            </span>
            <div className="flex items-center gap-1 bg-green-50 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-bold">
              <span>{product.rating}</span>
              <IconStar className="w-3 h-3 text-amber-500 fill-amber-500" />
            </div>
          </div>
        </div>

        {/* Pricing & Add Stepper */}
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-gray-900">
                {formatINR(displayPrice)}
              </span>
              {product.mrp > displayPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
            {displaySavings > 0 && (
              <span className="text-[10px] font-bold text-green-700 block">
                Save {formatINR(displaySavings)}
              </span>
            )}
          </div>

          <div className="w-24">
            <QuantityStepper
              quantity={currentQty}
              onAdd={() => addToCart(product, 1, displayPrice)}
              onIncrease={() => updateQuantity(product.id, currentQty + 1)}
              onDecrease={() => updateQuantity(product.id, currentQty - 1)}
              disabled={!product.inStock}
              max={product.stockCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatINR, calculateSavings } from '../../utils/formatters';
import { QuantityStepper } from '../common/QuantityStepper';
import { IconHeart, IconHeartFilled, IconStar, IconTruck, IconShieldCheck, IconClock, IconSparkles } from '../common/Icons';

export const ProductDetailsModal: React.FC = () => {
  const {
    selectedProductDetails,
    setSelectedProductDetails,
    addToCart,
    updateQuantity,
    getCartItemQuantity,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  if (!selectedProductDetails) return null;

  const product = selectedProductDetails;
  const inWishlist = isInWishlist(product.id);
  const currentQty = getCartItemQuantity(product.id);

  const displayPrice = product.isClearance && product.clearanceDiscount
    ? Math.round(product.price * (1 - product.clearanceDiscount / 100))
    : product.price;

  const displaySavings = calculateSavings(product.mrp, displayPrice);

  return (
    <Modal
      isOpen={!!selectedProductDetails}
      onClose={() => setSelectedProductDetails(null)}
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Product Image & Badges */}
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80';
              }}
            />
            {product.isClearance && (
              <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md animate-pulse">
                Clearance Deal {product.clearanceDiscount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 shadow-md transition-all"
            >
              {inWishlist ? <IconHeartFilled className="w-5 h-5 text-red-500" /> : <IconHeart className="w-5 h-5" />}
            </button>
          </div>

          <div className="w-full mt-4 flex items-center justify-around bg-green-50/70 p-3 rounded-xl border border-green-100 text-xs text-green-900 font-medium">
            <div className="flex items-center gap-1.5">
              <IconTruck className="w-4 h-4 text-green-700" />
              <span>15-30 Mins Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconShieldCheck className="w-4 h-4 text-green-700" />
              <span>Freshness Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded-md">
              {product.brand}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-2 leading-tight">
              {product.name}
            </h2>

            {/* Pack size & Ratings */}
            <div className="flex items-center gap-3 mt-2.5">
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded">
                Pack Size: {product.unit}
              </span>
              <div className="flex items-center gap-1 bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                <span>{product.rating}</span>
                <IconStar className="w-3 h-3 fill-white" />
              </div>
              <span className="text-xs text-gray-400">
                ({product.ratingCount.toLocaleString()} ratings)
              </span>
            </div>

            {/* Price section */}
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">
                  {formatINR(displayPrice)}
                </span>
                {product.mrp > displayPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      MRP {formatINR(product.mrp)}
                    </span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {product.isClearance ? product.clearanceDiscount : product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              {displaySavings > 0 && (
                <p className="text-xs font-bold text-green-700 mt-1">
                  You Save: {formatINR(displaySavings)} (Inclusive of all taxes)
                </p>
              )}
            </div>

            {/* Waste / Shelf Life Note */}
            {product.wasteExplanation && (
              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <IconClock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Freshness Advisory: </span>
                  {product.wasteExplanation} (Approx {product.expiryDays} days shelf-life)
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                Product Details
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4">
            <div className="w-36">
              <QuantityStepper
                quantity={currentQty}
                onAdd={() => addToCart(product, 1, displayPrice)}
                onIncrease={() => updateQuantity(product.id, currentQty + 1)}
                onDecrease={() => updateQuantity(product.id, currentQty - 1)}
                size="lg"
                max={product.stockCount}
                disabled={!product.inStock}
              />
            </div>
            <div className="text-xs text-gray-500">
              {product.inStock ? (
                <span className="text-green-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  In Stock ({product.stockCount} packs available)
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Currently Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};


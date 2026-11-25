import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, calculateSavings } from '../../utils/formatters';
import { QuantityStepper } from '../common/QuantityStepper';
import { IconX, IconTrash, IconTag, IconCheck, IconTruck, IconArrowRight, IconCart, IconShieldCheck } from '../common/Icons';
import { COUPONS } from '../../data/coupons';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalMrp,
    totalSavings,
    deliveryFee,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    finalTotal,
    setActiveView,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    setCouponError('');
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCart className="w-5 h-5 text-green-700" />
            <h3 className="font-extrabold text-base text-gray-900">
              My Basket ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
            <span className="flex items-center gap-1.5">
              <IconTruck className="w-4 h-4 text-emerald-700" />
              {amountNeededForFreeDelivery === 0 ? (
                <span>🎉 You unlocked <strong>FREE Delivery</strong>!</span>
              ) : (
                <span>Add <strong>{formatINR(amountNeededForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong></span>
              )}
            </span>
            <span>{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <IconCart className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-gray-800">Your basket is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Looks like you haven't added any groceries to your basket yet.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('catalogue');
                }}
                className="mt-6 px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">
                        {item.product.brand}
                      </span>
                      <h5 className="text-xs font-bold text-gray-900 truncate">
                        {item.product.name}
                      </h5>
                      <span className="text-[11px] text-gray-500">
                        {item.product.unit} • {formatINR(item.selectedPrice)}
                      </span>
                      <div className="mt-1 font-bold text-xs text-gray-900">
                        {formatINR(item.selectedPrice * item.quantity)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <IconTrash className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-20">
                        <QuantityStepper
                          quantity={item.quantity}
                          onAdd={() => {}}
                          onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                          size="sm"
                          max={item.product.stockCount}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                  <IconTag className="w-4 h-4 text-green-700" />
                  <span>Apply Coupon Code</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-green-100/70 border border-green-300 rounded-lg text-xs text-green-900 font-bold">
                    <div className="flex items-center gap-1.5">
                      <IconCheck className="w-4 h-4 text-green-700" />
                      <span>{appliedCoupon.code} applied (Saved {formatINR(couponDiscount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                        placeholder="Try FRESH50 or SAVE100"
                        className="flex-1 text-xs uppercase font-bold px-3 py-2 border border-gray-300 rounded-lg focus:outline-green-600 bg-white"
                      />
                      <button
                        onClick={() => handleApplyCoupon(inputCoupon)}
                        className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg shadow-xs"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1.5">
                        {couponError}
                      </p>
                    )}

                    {/* Quick tap coupon pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {COUPONS.map(c => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyCoupon(c.code)}
                          className="text-[10px] font-bold text-gray-700 bg-white border border-dashed border-gray-300 hover:border-green-600 px-2 py-0.5 rounded shadow-2xs transition-colors"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2">
                <h5 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 uppercase text-[11px]">
                  Bill Details
                </h5>

                <div className="flex justify-between text-gray-600">
                  <span>Basket Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatINR(subtotal)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>MRP Savings</span>
                    <span>-{formatINR(totalSavings)}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      formatINR(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-base text-gray-900">{formatINR(finalTotal)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200">
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-green-700 hover:bg-green-800 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-between active:scale-98"
            >
              <div className="text-left">
                <span className="text-xs text-green-100 font-normal block">
                  {cart.length} item{cart.length > 1 ? 's' : ''} in cart
                </span>
                <span className="text-base">{formatINR(finalTotal)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Proceed to Checkout</span>
                <IconArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


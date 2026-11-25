import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { DeliverySlot } from '../../types';
import { formatINR } from '../../utils/formatters';
import { IconTruck, IconClock, IconShieldCheck, IconWallet, IconCheck } from '../common/Icons';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    finalTotal,
    subtotal,
    deliveryFee,
    couponDiscount,
    placeOrder,
    deliveryLocation,
  } = useApp();

  const [formData, setFormData] = useState({
    name: 'Rahul Verma',
    phone: '9876543210',
    flat: 'Flat 304, Emerald Heights',
    street: '12th Main, HAL 2nd Stage',
    city: deliveryLocation.city || 'Bengaluru',
    pincode: deliveryLocation.pincode || '560001',
  });

  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>('Superfast Express (Within 30 Mins)');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Net Banking'>('UPI');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isCheckoutOpen) return null;

  const slots: DeliverySlot[] = [
    'Superfast Express (Within 30 Mins)',
    'Morning (07:00 AM - 10:00 AM)',
    'Mid-Day (11:00 AM - 02:00 PM)',
    'Evening (05:00 PM - 08:00 PM)',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter recipient name';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit mobile number required';
    if (!formData.flat.trim()) errs.flat = 'House/Flat details required';
    if (!formData.street.trim()) errs.street = 'Street or locality required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errs.pincode = 'Valid 6-digit pincode required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsPlacing(true);
    setTimeout(() => {
      placeOrder({
        ...formData,
        deliverySlot,
        paymentMethod,
      });
      setIsPlacing(false);
    }, 600);
  };

  return (
    <Modal
      isOpen={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
      title="Secure Express Checkout"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Delivery Address */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <IconTruck className="w-4 h-4 text-green-700" />
            <span>1. Delivery Address</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-green-600 font-medium"
                placeholder="e.g. Rahul Sharma"
              />
              {errors.name && <p className="text-[10px] text-red-600 mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Mobile Phone (10-digit)</label>
              <div className="flex">
                <span className="p-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-r-lg border border-gray-300 focus:outline-green-600 font-medium"
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-600 mt-0.5">{errors.phone}</p>}
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Flat / House No. / Building</label>
              <input
                type="text"
                value={formData.flat}
                onChange={e => setFormData({ ...formData, flat: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-green-600 font-medium"
                placeholder="Flat 402, Sunshine Apts"
              />
              {errors.flat && <p className="text-[10px] text-red-600 mt-0.5">{errors.flat}</p>}
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Street / Landmark / Area</label>
              <input
                type="text"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-green-600 font-medium"
                placeholder="100ft Road, Indiranagar"
              />
              {errors.street && <p className="text-[10px] text-red-600 mt-0.5">{errors.street}</p>}
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-green-600 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Pincode</label>
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-green-600 font-medium"
              />
              {errors.pincode && <p className="text-[10px] text-red-600 mt-0.5">{errors.pincode}</p>}
            </div>
          </div>
        </div>

        {/* Step 2: Delivery Slot Picker */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <IconClock className="w-4 h-4 text-green-700" />
            <span>2. Select Delivery Slot</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {slots.map(slot => (
              <label
                key={slot}
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  deliverySlot === slot
                    ? 'border-green-600 bg-green-50/70 shadow-xs text-green-950 font-bold'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  checked={deliverySlot === slot}
                  onChange={() => setDeliverySlot(slot)}
                  className="accent-green-700 w-4 h-4"
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 3: Payment Method Simulator */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <IconWallet className="w-4 h-4 text-green-700" />
            <span>3. Payment Mode (Simulated Sandbox)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {(['UPI', 'Credit/Debit Card', 'Cash on Delivery', 'Net Banking'] as const).map(mode => (
              <button
                type="button"
                key={mode}
                onClick={() => setPaymentMethod(mode)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === mode
                    ? 'border-green-600 bg-green-50 text-green-900 font-extrabold shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-sm">
                  {mode === 'UPI' ? '📱' : mode === 'Credit/Debit Card' ? '💳' : mode === 'Cash on Delivery' ? '💵' : '🏦'}
                </span>
                <span className="text-[11px] leading-tight">{mode}</span>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-center">
            🔒 Simulated checkout environment. No real banking or card details are collected.
          </p>
        </div>

        {/* Total Summary & Place Order CTA */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl">
          <div className="text-left w-full sm:w-auto">
            <span className="text-xs text-gray-500 block">Total Amount to Pay</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{formatINR(finalTotal)}</span>
              {couponDiscount > 0 && (
                <span className="text-xs text-green-700 font-bold">
                  (Coupon savings applied!)
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPlacing || cart.length === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-green-700 hover:bg-green-800 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isPlacing ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <IconCheck className="w-5 h-5 stroke-[3]" />
                <span>Confirm & Place Order</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};


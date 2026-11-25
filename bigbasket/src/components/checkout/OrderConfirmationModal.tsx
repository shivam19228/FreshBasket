import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatINR } from '../../utils/formatters';
import { IconCheck, IconTruck, IconPackage, IconClock } from '../common/Icons';

export const OrderConfirmationModal: React.FC = () => {
  const {
    confirmedOrder,
    setConfirmedOrder,
    setActiveView,
  } = useApp();

  if (!confirmedOrder) return null;

  return (
    <Modal
      isOpen={!!confirmedOrder}
      onClose={() => setConfirmedOrder(null)}
      maxWidth="lg"
    >
      <div className="text-center py-4">
        {/* Animated Success Badge */}
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <IconCheck className="w-9 h-9 stroke-[3]" />
        </div>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Order Placed Successfully!
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Thank you for shopping with FreshBasket. Your items are being packed at the nearest dark store.
        </p>

        {/* Order Reference Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-bold my-4 border border-gray-200">
          <span>Order ID:</span>
          <span className="font-mono text-green-700 font-extrabold">{confirmedOrder.id}</span>
        </div>

        {/* Delivery Details Card */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left text-xs space-y-3 my-4">
          <div className="flex items-start gap-2.5">
            <IconTruck className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 block">Delivery Slot</span>
              <span className="text-gray-600">{confirmedOrder.deliverySlot}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 border-t border-gray-200 pt-2.5">
            <IconPackage className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 block">Delivering To</span>
              <span className="text-gray-600">
                {confirmedOrder.deliveryAddress.name} ({confirmedOrder.deliveryAddress.phone})
                <br />
                {confirmedOrder.deliveryAddress.flat}, {confirmedOrder.deliveryAddress.street}, {confirmedOrder.deliveryAddress.city} - {confirmedOrder.deliveryAddress.pincode}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 border-t border-gray-200 pt-2.5">
            <IconClock className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 block">Payment Method</span>
              <span className="text-gray-600">{confirmedOrder.paymentMethod} • Paid {formatINR(confirmedOrder.total)}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="text-left mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
            Items in this order ({confirmedOrder.items.length})
          </span>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {confirmedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1 border-b border-gray-100">
                <span className="text-gray-800 font-medium truncate max-w-[240px]">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-bold text-gray-900">
                  {formatINR(item.selectedPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              setConfirmedOrder(null);
              setActiveView('orders');
            }}
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-xs transition-colors"
          >
            View Order History
          </button>
          <button
            onClick={() => {
              setConfirmedOrder(null);
              setActiveView('home');
            }}
            className="flex-1 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs shadow-md transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Modal>
  );
};


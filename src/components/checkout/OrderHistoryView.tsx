import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { IconPackage, IconRefreshCw, IconTruck, IconCheck, IconArrowRight } from '../common/Icons';

export const OrderHistoryView: React.FC = () => {
  const { orders, reorder, setActiveView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <IconPackage className="w-6 h-6 text-green-700" />
            <span>My Orders & Delivery History</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            View details of all your previous grocery orders and reorder essentials in one tap.
          </p>
        </div>

        <button
          onClick={() => setActiveView('catalogue')}
          className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <IconArrowRight className="w-4 h-4" />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-3">
            <IconPackage className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-gray-800">No past orders yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-6">
            Place your first order on FreshBasket to unlock express 15-minute grocery deliveries.
          </p>
          <button
            onClick={() => setActiveView('catalogue')}
            className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            Explore Groceries
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-gray-300"
            >
              {/* Order Header Strip */}
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Order Placed
                    </span>
                    <span className="font-bold text-gray-800">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Order ID
                    </span>
                    <span className="font-mono font-bold text-green-800">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Total Paid
                    </span>
                    <span className="font-extrabold text-gray-900">{formatINR(order.total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                    <IconCheck className="w-3 h-3 text-green-700" />
                    {order.status}
                  </span>

                  <button
                    onClick={() => reorder(order.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-green-700 hover:bg-green-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    <IconRefreshCw className="w-3.5 h-3.5" />
                    <span>Reorder Basket</span>
                  </button>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-3">
                  <IconTruck className="w-4 h-4 text-green-700" />
                  <span>Delivered via: {order.deliverySlot} to {order.deliveryAddress.city}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h6 className="text-xs font-bold text-gray-900 truncate">
                          {item.product.name}
                        </h6>
                        <span className="text-[11px] text-gray-500 block">
                          Qty: {item.quantity} • {formatINR(item.selectedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { IconMapPin, IconCheck } from './Icons';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, deliveryLocation, setDeliveryLocation } = useApp();
  const [city, setCity] = useState(deliveryLocation.city);
  const [pincode, setPincode] = useState(deliveryLocation.pincode);

  if (!isLocationModalOpen) return null;

  const popularCities = [
    { city: 'Bengaluru', pincode: '560001' },
    { city: 'Mumbai', pincode: '400001' },
    { city: 'Delhi NCR', pincode: '110001' },
    { city: 'Hyderabad', pincode: '500001' },
    { city: 'Chennai', pincode: '600001' },
    { city: 'Pune', pincode: '411001' },
  ];

  const handleSave = (selectedCity: string, selectedPin: string) => {
    setDeliveryLocation({ city: selectedCity, pincode: selectedPin });
    setIsLocationModalOpen(false);
  };

  return (
    <Modal
      isOpen={isLocationModalOpen}
      onClose={() => setIsLocationModalOpen(false)}
      title="Select Your Delivery Location"
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        <p className="text-gray-500">
          Choose your city to check grocery product availability and express 15-minute delivery slots.
        </p>

        {/* Custom Input */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <label className="font-bold text-gray-700 block mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 font-medium"
              placeholder="e.g. Bengaluru"
            />
          </div>
          <div>
            <label className="font-bold text-gray-700 block mb-1">Pincode</label>
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 font-medium"
              placeholder="e.g. 560001"
            />
          </div>
          <div className="col-span-2 pt-2">
            <button
              onClick={() => handleSave(city, pincode)}
              className="w-full py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg shadow-xs"
            >
              Update Location
            </button>
          </div>
        </div>

        {/* Popular Cities */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Popular Cities
          </span>
          <div className="grid grid-cols-2 gap-2">
            {popularCities.map((item) => (
              <button
                key={item.city}
                onClick={() => handleSave(item.city, item.pincode)}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  deliveryLocation.city === item.city
                    ? 'border-green-600 bg-green-50 text-green-950 font-bold'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconMapPin className="w-3.5 h-3.5 text-green-700" />
                  <span>{item.city}</span>
                </div>
                {deliveryLocation.city === item.city && (
                  <IconCheck className="w-3.5 h-3.5 text-green-700 stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};


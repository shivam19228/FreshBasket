import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';
import { CategoryId } from '../../types';

export const CategoryTiles: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useApp();

  const categoryImages: Record<CategoryId, string> = {
    'fruits-veg': 'https://images.unsplash.com/photo-1546470427-227c7369a941?auto=format&fit=crop&w=300&q=80',
    'dairy-bakery': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80',
    'staples': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    'snacks': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80',
    'beverages': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80',
    'personal-care': 'https://images.unsplash.com/photo-1607006314643-f66f91667b9d?auto=format&fit=crop&w=300&q=80',
    'household': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=300&q=80',
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">
            Shop by Category
          </h3>
          <p className="text-xs text-gray-500">
            Handpicked fresh groceries across daily Indian household staples
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('all');
            setActiveView('catalogue');
          }}
          className="text-xs font-bold text-green-700 hover:text-green-800"
        >
          View All ({CATEGORIES.length}) →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveView('catalogue');
            }}
            className="group bg-white rounded-2xl p-3 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-2 border border-gray-100 group-hover:scale-105 transition-transform duration-200">
              <img
                src={categoryImages[cat.id]}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-green-700 line-clamp-1">
              {cat.name}
            </h4>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              {cat.itemCount} items
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


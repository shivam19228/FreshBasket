import React from 'react';
import { IconPlus, IconMinus } from './Icons';

interface QuantityStepperProps {
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  disabled = false,
  max = 99,
  size = 'md',
}) => {
  if (quantity === 0) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        disabled={disabled}
        className={`w-full font-bold uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
          disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
            : 'bg-white hover:bg-red-50 text-red-600 border border-red-600 hover:border-red-700'
        } ${
          size === 'sm'
            ? 'py-1 px-2.5 text-xs rounded'
            : size === 'lg'
            ? 'py-2.5 px-5 text-sm rounded-lg shadow-md hover:bg-red-600 hover:text-white'
            : 'py-1.5 px-4 text-xs tracking-wider rounded'
        }`}
      >
        <span>+</span>
        <span>{disabled ? 'Out of Stock' : 'Add'}</span>
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center justify-between bg-red-600 text-white rounded font-bold shadow-sm select-none ${
        size === 'sm' ? 'h-7 text-xs px-1' : size === 'lg' ? 'h-10 text-base px-2 rounded-lg' : 'h-8 text-sm px-1.5'
      }`}
    >
      <button
        onClick={onDecrease}
        className="w-6 h-full flex items-center justify-center hover:bg-red-700 rounded transition-colors active:scale-90"
        title="Decrease quantity"
      >
        <IconMinus className="w-3.5 h-3.5 stroke-[3]" />
      </button>

      <span className="px-2 font-bold tracking-wide min-w-[24px] text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`w-6 h-full flex items-center justify-center rounded transition-colors active:scale-90 ${
          quantity >= max ? 'opacity-40 cursor-not-allowed' : 'hover:bg-red-700'
        }`}
        title="Increase quantity"
      >
        <IconPlus className="w-3.5 h-3.5 stroke-[3]" />
      </button>
    </div>
  );
};


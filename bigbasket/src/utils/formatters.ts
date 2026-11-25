// Formatter utilities for Indian Rupee currency and numeric calculations

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

export const calculateDiscountPercentage = (mrp: number, price: number): number => {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

export const calculateSavings = (mrp: number, price: number): number => {
  if (mrp <= price) return 0;
  return mrp - price;
};


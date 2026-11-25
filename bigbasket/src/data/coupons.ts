import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'FRESH50',
    discountType: 'fixed',
    discountValue: 50,
    minOrderValue: 399,
    description: 'Flat ₹50 OFF on orders above ₹399',
  },
  {
    code: 'SAVE100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 799,
    description: 'Flat ₹100 OFF on orders above ₹799',
  },
  {
    code: 'SUPERFRESH',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 500,
    description: '15% instant savings on orders above ₹500',
  },
  {
    code: 'BIGSAVINGS',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 1299,
    description: 'Flat ₹200 Mega Discount on orders above ₹1,299',
  },
];


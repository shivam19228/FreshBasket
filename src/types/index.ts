export type CategoryId = 
  | 'fruits-veg'
  | 'dairy-bakery'
  | 'staples'
  | 'snacks'
  | 'beverages'
  | 'personal-care'
  | 'household';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number; // Sale price in INR
  mrp: number;   // Maximum retail price in INR
  discountPercentage: number;
  unit: string;  // e.g. "1 kg", "500 g", "1 L", "Pack of 4"
  image: string;
  rating: number;
  ratingCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  tags?: string[];
  
  // Freshness & Waste Saver metadata
  isSeasonal?: boolean;
  seasonName?: string;
  expiryDays?: number; // Days until expiry (simulated)
  isClearance?: boolean;
  clearanceDiscount?: number; // additional % off
  wasteExplanation?: string;

  // Cheaper alternative mapping for Budget Guardian
  comparableGroupId?: string; // Grouping products that can substitute each other
  isBudgetAlternative?: boolean;
  originalProductId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPrice: number; // usually product.price or discounted clearance price
}

export interface RecipeIngredient {
  productId: string;
  name: string;
  baseQuantity: number;      // Quantity needed for baseServings
  baseUnit: string;          // e.g. "g", "ml", "pieces"
  productUnitMultiplier: number; // how many pack units does 1 recipe portion correspond to
  substitutionProductId?: string; // Cheaper or in-stock substitute
}

export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  baseServings: number;
  image: string;
  description: string;
  targetBudgetPerServing: number; // in INR
  ingredients: RecipeIngredient[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export type DeliverySlot = 
  | 'Morning (07:00 AM - 10:00 AM)'
  | 'Mid-Day (11:00 AM - 02:00 PM)'
  | 'Evening (05:00 PM - 08:00 PM)'
  | 'Superfast Express (Within 30 Mins)';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  deliveryFee: number;
  total: number;
  deliverySlot: DeliverySlot;
  deliveryAddress: {
    name: string;
    phone: string;
    flat: string;
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Net Banking';
  status: 'Confirmed' | 'Out for Delivery' | 'Delivered';
}

export interface BudgetConfig {
  weeklyLimit: number;
  enabled: boolean;
}


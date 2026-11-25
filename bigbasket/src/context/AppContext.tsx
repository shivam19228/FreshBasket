import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, CategoryId, Coupon, DeliverySlot } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface ToastState {
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customPrice?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemQuantity: (productId: string) => number;
  subtotal: number;
  totalMrp: number;
  totalSavings: number;
  deliveryFee: number;
  finalTotal: number;
  
  // Coupons
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;

  // Novel Feature 2: Budget Guardian
  budgetLimit: number;
  isBudgetEnabled: boolean;
  setBudgetLimit: (limit: number) => void;
  toggleBudget: (enabled: boolean) => void;
  budgetSpent: number;
  budgetRemaining: number;
  budgetPercentage: number;
  budgetStatus: 'safe' | 'warning' | 'exceeded';
  replaceWithAlternative: (currentProductId: string, alternativeProductId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (details: {
    name: string;
    phone: string;
    flat: string;
    street: string;
    city: string;
    pincode: string;
    deliverySlot: DeliverySlot;
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Net Banking';
  }) => Order;
  reorder: (orderId: string) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;

  // Navigation & Search
  activeView: 'home' | 'catalogue' | 'smart-dashboard' | 'wishlist' | 'orders';
  setActiveView: (view: 'home' | 'catalogue' | 'smart-dashboard' | 'wishlist' | 'orders') => void;
  smartDashboardTab: 'meal-planner' | 'budget-guardian' | 'waste-saver';
  setSmartDashboardTab: (tab: 'meal-planner' | 'budget-guardian' | 'waste-saver') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount') => void;

  // UI Modals
  selectedProductDetails: Product | null;
  setSelectedProductDetails: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  // Delivery Location
  deliveryLocation: { city: string; pincode: string };
  setDeliveryLocation: (location: { city: string; pincode: string }) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'freshbasket_cart_v1',
  WISHLIST: 'freshbasket_wishlist_v1',
  BUDGET_LIMIT: 'freshbasket_budget_limit_v1',
  BUDGET_ENABLED: 'freshbasket_budget_enabled_v1',
  ORDERS: 'freshbasket_orders_v1',
  LOCATION: 'freshbasket_location_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => 
    loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );

  // Wishlist persisted
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEYS.WISHLIST, ['fv-tomato-1', 'st-atta-1'])
  );

  // Budget Guardian persisted
  const [budgetLimit, setBudgetLimitState] = useState<number>(() =>
    loadFromStorage<number>(STORAGE_KEYS.BUDGET_LIMIT, 2000)
  );
  const [isBudgetEnabled, setIsBudgetEnabledState] = useState<boolean>(() =>
    loadFromStorage<boolean>(STORAGE_KEYS.BUDGET_ENABLED, true)
  );

  // Orders persisted
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, [
      {
        id: 'FB-ORD-9481',
        date: '2026-10-25 10:30 AM',
        items: [
          { product: PRODUCTS.find(p => p.id === 'st-atta-1')!, quantity: 1, selectedPrice: 255 },
          { product: PRODUCTS.find(p => p.id === 'db-paneer-1')!, quantity: 2, selectedPrice: 92 },
        ],
        subtotal: 439,
        discount: 61,
        couponCode: 'FRESH50',
        couponDiscount: 50,
        deliveryFee: 0,
        total: 389,
        deliverySlot: 'Morning (07:00 AM - 10:00 AM)',
        deliveryAddress: {
          name: 'Priya Sharma',
          phone: '+91 98765 43210',
          flat: 'Flat 402, Green Acres',
          street: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          pincode: '560038'
        },
        paymentMethod: 'UPI',
        status: 'Delivered'
      }
    ])
  );

  // Location
  const [deliveryLocation, setDeliveryLocationState] = useState<{ city: string; pincode: string }>(() =>
    loadFromStorage(STORAGE_KEYS.LOCATION, { city: 'Bengaluru', pincode: '560001' })
  );

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Navigation
  const [activeView, setActiveView] = useState<'home' | 'catalogue' | 'smart-dashboard' | 'wishlist' | 'orders'>('home');
  const [smartDashboardTab, setSmartDashboardTab] = useState<'meal-planner' | 'budget-guardian' | 'waste-saver'>('meal-planner');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Sync state to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BUDGET_LIMIT, budgetLimit);
  }, [budgetLimit]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BUDGET_ENABLED, isBudgetEnabled);
  }, [isBudgetEnabled]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.LOCATION, deliveryLocation);
  }, [deliveryLocation]);

  const setBudgetLimit = (limit: number) => {
    setBudgetLimitState(limit);
    showToast(`Weekly budget updated to ₹${limit.toLocaleString('en-IN')}`, 'info');
  };

  const toggleBudget = (enabled: boolean) => {
    setIsBudgetEnabledState(enabled);
    showToast(`Budget Guardian ${enabled ? 'activated' : 'deactivated'}`, 'info');
  };

  const setDeliveryLocation = (loc: { city: string; pincode: string }) => {
    setDeliveryLocationState(loc);
    showToast(`Delivering to ${loc.city} (${loc.pincode})`, 'info');
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, customPrice?: number) => {
    const unitPrice = customPrice !== undefined 
      ? customPrice 
      : (product.isClearance && product.clearanceDiscount 
          ? Math.round(product.price * (1 - product.clearanceDiscount / 100)) 
          : product.price);

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(product.stockCount, currentQty + quantity);
        if (newQty === currentQty) {
          showToast(`Maximum available stock reached for ${product.name}`, 'warning');
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedPrice: unitPrice,
        };
        showToast(`Updated ${product.name} quantity (${newQty})`, 'success');
        return updated;
      } else {
        const addQty = Math.min(product.stockCount, Math.max(1, quantity));
        showToast(`Added ${product.name} to cart`, 'success');
        return [...prev, { product, quantity: addQty, selectedPrice: unitPrice }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === productId);
      if (item) {
        showToast(`Removed ${item.product.name} from cart`, 'info');
      }
      return prev.filter(i => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => {
      const item = prev.find(i => i.product.id === productId);
      if (!item) return prev;
      
      const newQty = Math.min(item.product.stockCount, quantity);
      if (quantity > item.product.stockCount) {
        showToast(`Only ${item.product.stockCount} in stock for ${item.product.name}`, 'warning');
      }

      return prev.map(i => i.product.id === productId ? { ...i, quantity: newQty } : i);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const totalMrp = cart.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const totalSavings = Math.max(0, totalMrp - subtotal);
  
  // BigBasket rule: Free delivery on ₹499+ orders, else ₹40
  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;

  // Coupon calculations
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = appliedCoupon.discountValue;
    } else {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const applyCoupon = (code: string) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try FRESH50, SAVE100 or SUPERFRESH.' };
    }
    if (subtotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Min. cart value of ₹${found.minOrderValue} required for ${found.code} (Current: ₹${subtotal})` 
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved extra!`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    const name = product ? product.name : 'Item';

    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        showToast(`Removed ${name} from Wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved ${name} to Wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const moveToCart = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      addToCart(product, 1);
      toggleWishlist(productId);
    }
  };

  // Budget Guardian calculations
  const budgetSpent = finalTotal;
  const budgetRemaining = Math.max(0, budgetLimit - budgetSpent);
  const budgetPercentage = budgetLimit > 0 ? Math.min(100, Math.round((budgetSpent / budgetLimit) * 100)) : 0;
  
  let budgetStatus: 'safe' | 'warning' | 'exceeded' = 'safe';
  if (budgetPercentage >= 100) {
    budgetStatus = 'exceeded';
  } else if (budgetPercentage >= 75) {
    budgetStatus = 'warning';
  }

  // Budget Guardian: 1-click Swap item in cart with a cheaper alternative
  const replaceWithAlternative = (currentProductId: string, alternativeProductId: string): boolean => {
    const currentItem = cart.find(i => i.product.id === currentProductId);
    const altProduct = getProductById(alternativeProductId);

    if (!currentItem || !altProduct) return false;

    const savedAmount = Math.max(0, (currentItem.selectedPrice - altProduct.price) * currentItem.quantity);

    setCart(prev => {
      const filtered = prev.filter(i => i.product.id !== currentProductId);
      // Check if alternative already exists in cart
      const existingAltIndex = filtered.findIndex(i => i.product.id === alternativeProductId);
      if (existingAltIndex > -1) {
        const updated = [...filtered];
        updated[existingAltIndex] = {
          ...updated[existingAltIndex],
          quantity: updated[existingAltIndex].quantity + currentItem.quantity
        };
        return updated;
      } else {
        return [...filtered, { product: altProduct, quantity: currentItem.quantity, selectedPrice: altProduct.price }];
      }
    });

    showToast(`Swapped to ${altProduct.name}! You saved ₹${savedAmount}`, 'success');
    return true;
  };

  // Orders
  const placeOrder = (details: {
    name: string;
    phone: string;
    flat: string;
    street: string;
    city: string;
    pincode: string;
    deliverySlot: DeliverySlot;
    paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Net Banking';
  }): Order => {
    const newOrder: Order = {
      id: `FB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      discount: totalSavings,
      couponCode: appliedCoupon?.code,
      couponDiscount,
      deliveryFee,
      total: finalTotal,
      deliverySlot: details.deliverySlot,
      deliveryAddress: {
        name: details.name,
        phone: details.phone,
        flat: details.flat,
        street: details.street,
        city: details.city,
        pincode: details.pincode,
      },
      paymentMethod: details.paymentMethod,
      status: 'Confirmed'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setConfirmedOrder(newOrder);
    setIsCheckoutOpen(false);
    showToast(`Order #${newOrder.id} placed successfully! 🎉`, 'success');
    return newOrder;
  };

  const reorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.items.forEach(item => {
      const liveProduct = getProductById(item.product.id);
      if (liveProduct && liveProduct.inStock) {
        addToCart(liveProduct, item.quantity);
      }
    });

    setIsCartOpen(true);
    showToast(`Added items from order #${orderId} to cart`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        getProductById,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemQuantity,
        subtotal,
        totalMrp,
        totalSavings,
        deliveryFee,
        finalTotal,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        budgetLimit,
        isBudgetEnabled,
        setBudgetLimit,
        toggleBudget,
        budgetSpent,
        budgetRemaining,
        budgetPercentage,
        budgetStatus,
        replaceWithAlternative,
        orders,
        placeOrder,
        reorder,
        confirmedOrder,
        setConfirmedOrder,
        activeView,
        setActiveView,
        smartDashboardTab,
        setSmartDashboardTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        selectedProductDetails,
        setSelectedProductDetails,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        deliveryLocation,
        setDeliveryLocation,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};


import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LocationModal } from './components/common/LocationModal';
import { ProductDetailsModal } from './components/product/ProductDetailsModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderConfirmationModal } from './components/checkout/OrderConfirmationModal';

// Views
import { HomeView } from './components/home/HomeView';
import { ProductGridView } from './components/product/ProductGridView';
import { SmartShoppingDashboard } from './components/novel/SmartShoppingDashboard';
import { WishlistView } from './components/wishlist/WishlistView';
import { OrderHistoryView } from './components/checkout/OrderHistoryView';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="min-h-screen">
      {activeView === 'home' && <HomeView />}
      {activeView === 'catalogue' && <ProductGridView />}
      {activeView === 'smart-dashboard' && <SmartShoppingDashboard />}
      {activeView === 'wishlist' && <WishlistView />}
      {activeView === 'orders' && <OrderHistoryView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <LocationModal />
        <ProductDetailsModal />
        <Toast />
      </div>
    </AppProvider>
  );
};

export default App;


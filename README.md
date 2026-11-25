# 🛒 FreshBasket - Online Indian Grocery Supermarket

A complete, responsive Indian grocery e-commerce frontend inspired by **BigBasket's** shopping experience. Built with **React**, **TypeScript**, and **Vite**.

---

## 🌟 Key Highlights & Features

### A. BigBasket-Inspired UI/UX
- **Authentic Indian Grocery Aesthetics**: BigBasket-inspired forest green (`#1b4313` / `#84c225`) palette, bright red deal badges, and warm Indian supermarket typography.
- **Announcement Strip**: Express 15-30 minute delivery notification, coupon promotion banners (`SAVE100`), and interactive location selector.
- **Location Selector**: Modal allowing instant switching between major Indian delivery hubs (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) or custom 6-digit PIN codes.
- **Category Navigation**: 7 categories (Fruits & Vegetables, Dairy & Bakery, Atta Rice & Dals, Snacks & Munchies, Tea Coffee & Beverages, Personal Care, Household Cleaning).
- **Product Cards**: High-res imagery, brand labels (Fresho, Amul, Aashirvaad, Tata Sampann), pack sizes, MRP strikethrough, rupee pricing, discount tags, rating stars, and interactive `+ ADD` quantity steppers.
- **Product Details Modal**: Full-screen modal with freshness guarantees, origin, stock status, and nutritional advisories.

### B. Core E-Commerce Journey
- **30+ Varied Indian Products**: Across 7 authentic grocery categories with realistic rupee prices, MRP, discounts, stock count, and tags.
- **Real-Time Search & Filters**: Search across titles, brands, and categories; sort by Featured, Price (Low to High / High to Low), Ratings, and Discount %; filter by maximum price and in-stock items.
- **Interactive Shopping Basket**:
  - Add / remove / stepper quantity updates with stock bounds protection.
  - Delivery Fee Waiver Progress Bar: Free delivery on ₹499+ orders (otherwise ₹40).
  - Working Coupon Engine with real coupons (`FRESH50`, `SAVE100`, `SUPERFRESH`, `BIGSAVINGS`).
  - Itemized bill breakdown (Subtotal, MRP Savings, Coupon Discount, Delivery Fee, Final Total).
- **Express Checkout**:
  - Validated recipient delivery address (Name, Phone, Flat, Street, City, Pincode).
  - Delivery Slot Selector (Morning, Mid-Day, Evening, 30-min Superfast Express).
  - Simulated Payment Modes (UPI, Credit/Debit Cards, Net Banking, Cash on Delivery).
- **Order Confirmation & History**:
  - Generates unique Order IDs (e.g. `FB-ORD-9481`).
  - Persists past orders in `localStorage`.
  - 1-Click "Reorder Basket" functionality to restore all items into the active cart.
- **Wishlist**: Toggle favorites with heart icon and move items into the basket with 1 click.

---

## 🚀 Novel Features (100% Usable & Integrated)

### 1. 🍳 SmartBasket Meal Planner
*Interactive Indian recipe-to-grocery planner.*
- **5 Indian Meal Options**:
  1. *Restaurant-Style Shahi Paneer Butter Masala*
  2. *Fragrant Hyderabadi Dum Veg Biryani*
  3. *Authentic Maharashtrian Kanda Batata Poha*
  4. *Dhaba-Style Desi Ghee Dal Tadka & Jeera Rice*
  5. *Crispy South Indian Masala Dosa & Chutney*
- **Dynamic Servings Scaler**: Interactive stepper (1 to 12 servings) that recalculates ingredient weights and full-pack grocery requirements deterministically.
- **Itemized Recipe Costing**: Matches ingredients against live catalogue items and computes estimated costs per portion.
- **Budget Target & Smart Substitutions**: Set a meal budget (e.g. ₹350); if over budget, toggle smart ingredient swaps (e.g. Biryani Basmati Rice -> Sona Masoori Rice to save ₹117) to fit your target.
- **1-Click "Add All Ingredients to Cart"**: Seamlessly adds every required ingredient into the shared shopping cart.

### 2. 🛡️ Budget Guardian
*Real-time household grocery budget management.*
- **Weekly Budget Limit**: Set custom weekly grocery budgets with quick presets (₹1,500, ₹2,500, ₹3,500, ₹5,000).
- **Live Progress Meter**: Real-time spending tracker showing percentage spent, remaining headroom, and visual color-coded alert states:
  - 🟢 **Safe Zone** (< 75% spent)
  - 🟠 **Approaching Limit** (75% - 99% spent)
  - 🔴 **Budget Exceeded** (>= 100% spent)
- **Smart "Swap & Save" Engine**: Automatically analyzes items in the user's cart, compares price-per-unit against catalogue alternatives (e.g. A2 Cow Ghee -> Amul Traditional Ghee, Organic Toor Dal -> Regular Toor Dal), and provides a working 1-click `Swap & Save ₹X` button that updates the cart and budget instantly.
- **Local Persistence**: Remembers your weekly budget across page reloads.

### 3. 🌱 Freshness & Waste Saver
*Sustainable grocery rescue deals and farm fresh highlights.*
- **Simulated Near-Expiry Clearance Deals**: Flash discounts (35% - 45% OFF) on short-dated dairy (Malai Paneer), bakery (Whole Wheat Bread), batter, and ripe bananas.
- **Seasonal Farm Harvests**: Peak winter red carrots, hybrid tomatoes, and leafy greens sourced from regional farms.
- **Clearance Transparency**: Clear educational notices distinguishing simulated shelf-life metadata from commercial inventory.
- **Chef's Zero-Waste Cook Basket**: 1-click bundle pairing short-dated spinach, paneer, and tomatoes for a tonight's Palak-Paneer dinner with bonus bundle savings.

---

## 💻 Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (loaded with custom brand tokens)
- **Icons**: Self-contained SVG icon suite
- **Storage**: Safe `localStorage` wrapper with graceful fallbacks

---

## 🏃 Running the Project

### Development Server:
```bash
npm run dev
```
Open `http://localhost:3000` (or the port displayed in the console).

### Production Build:
```bash
npm run build
```
Generates an optimized static bundle in `/dist` without errors.

### Preview Production Build:
```bash
npm run preview
```

---

## 📁 Directory Architecture
```
src/
├── types/
│   └── index.ts                 # Product, Cart, Recipe, Coupon, Order types
├── data/
│   ├── products.ts              # 30+ Indian grocery products with pricing & metadata
│   ├── recipes.ts               # 5 Indian recipes with ingredient ratios & substitutes
│   └── coupons.ts               # Sample promo coupons (FRESH50, SAVE100, etc.)
├── context/
│   └── AppContext.tsx           # Global state: Cart, Wishlist, Budget, Orders, Location
├── utils/
│   ├── formatters.ts            # INR Currency formatters & discount helpers
│   └── storage.ts               # Safe localStorage helpers
├── components/
│   ├── common/
│   │   ├── Header.tsx           # Top strip, search, navigation, cart button
│   │   ├── Footer.tsx           # Pillars, categories, disclosures
│   │   ├── Icons.tsx            # Self-contained SVG icon components
│   │   ├── Modal.tsx            # Accessible modal dialog
│   │   ├── QuantityStepper.tsx  # BigBasket + ADD / - [qty] + stepper
│   │   ├── LocationModal.tsx    # Delivery city and pincode picker
│   │   └── Toast.tsx            # Feedback alert toast
│   ├── product/
│   │   ├── ProductCard.tsx      # BigBasket-style product card
│   │   ├── ProductDetailsModal.tsx # Full product inspection modal
│   │   └── ProductGridView.tsx  # Catalogue with sorting and filters
│   ├── novel/
│   │   ├── SmartBasketPlanner.tsx  # Novel Feature 1: Meal Planner
│   │   ├── BudgetGuardian.tsx      # Novel Feature 2: Budget Guardian
│   │   ├── FreshnessWasteSaver.tsx # Novel Feature 3: Waste Saver Deals
│   │   └── SmartShoppingDashboard.tsx # Unified Tabbed Smart Hub
│   ├── home/
│   │   ├── HeroBanner.tsx       # Grocery promotional carousel
│   │   ├── CategoryTiles.tsx    # Circular category grid
│   │   └── HomeView.tsx         # Complete marketplace home page
│   ├── cart/
│   │   └── CartDrawer.tsx       # Slide-over cart, coupon engine, bill summary
│   ├── checkout/
│   │   ├── CheckoutModal.tsx    # Address, slot picker, mock payments
│   │   ├── OrderConfirmationModal.tsx # Order ID, delivery timeline
│   │   └── OrderHistoryView.tsx # Past orders & re-ordering
│   └── wishlist/
│       └── WishlistView.tsx     # Saved items with move-to-cart
├── App.tsx                      # Root component & view router
├── main.tsx                     # Application entry point
├── index.css                    # Animations and custom scrollbar
└── index.html                   # HTML shell with Google Fonts & Tailwind
```


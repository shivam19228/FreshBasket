import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'recipe-paneer-butter-masala',
    title: 'Restaurant-Style Shahi Paneer Butter Masala',
    cuisine: 'North Indian',
    prepTime: '30 mins',
    difficulty: 'Medium',
    baseServings: 4,
    targetBudgetPerServing: 85,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    description: 'A rich and creamy royal curry made with succulent paneer cubes simmered in a velvet tomato, butter, and cashew gravy.',
    ingredients: [
      {
        productId: 'db-paneer-1',
        name: 'Fresh Malai Paneer',
        baseQuantity: 200,
        baseUnit: 'g',
        productUnitMultiplier: 1, // 1 pack of 200g
      },
      {
        productId: 'fv-tomato-1',
        name: 'Ripe Red Tomatoes',
        baseQuantity: 500,
        baseUnit: 'g',
        productUnitMultiplier: 0.5, // 0.5 kg
      },
      {
        productId: 'fv-onion-1',
        name: 'Fresh Red Onions',
        baseQuantity: 250,
        baseUnit: 'g',
        productUnitMultiplier: 0.25, // 0.25 kg
      },
      {
        productId: 'db-butter-1',
        name: 'Amul Salted Butter',
        baseQuantity: 50,
        baseUnit: 'g',
        productUnitMultiplier: 0.5, // 0.5 pack of 100g
      },
      {
        productId: 'st-garlic-paste',
        name: 'Ginger Garlic Paste',
        baseQuantity: 50,
        baseUnit: 'g',
        productUnitMultiplier: 0.25, // 0.25 pack of 200g
      },
      {
        productId: 'st-spices-jeera',
        name: 'Whole Cumin (Jeera)',
        baseQuantity: 10,
        baseUnit: 'g',
        productUnitMultiplier: 0.1, // 10g
      }
    ]
  },
  {
    id: 'recipe-veg-biryani',
    title: 'Fragrant Hyderabadi Dum Veg Biryani',
    cuisine: 'Mughlai / Hyderabadi',
    prepTime: '45 mins',
    difficulty: 'Medium',
    baseServings: 4,
    targetBudgetPerServing: 90,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    description: 'Slow-cooked aromatic basmati rice layered with fresh garden vegetables, caramelized onions, mint, and saffron ghee.',
    ingredients: [
      {
        productId: 'st-rice-prem',
        name: 'Royal Basmati Rice',
        baseQuantity: 400,
        baseUnit: 'g',
        productUnitMultiplier: 0.4,
        substitutionProductId: 'st-rice-budget', // Can swap with Sona Masoori for budget
      },
      {
        productId: 'fv-potato-1',
        name: 'Fresh Potatoes',
        baseQuantity: 300,
        baseUnit: 'g',
        productUnitMultiplier: 0.3,
      },
      {
        productId: 'fv-carrot-1',
        name: 'Red Winter Carrots',
        baseQuantity: 250,
        baseUnit: 'g',
        productUnitMultiplier: 0.25,
      },
      {
        productId: 'fv-onion-1',
        name: 'Fried Crispy Onions (Birista)',
        baseQuantity: 400,
        baseUnit: 'g',
        productUnitMultiplier: 0.4,
      },
      {
        productId: 'db-curd-1',
        name: 'Thick Dahi / Curd',
        baseQuantity: 200,
        baseUnit: 'g',
        productUnitMultiplier: 0.5,
      },
      {
        productId: 'st-ghee-budget',
        name: 'Pure Desi Ghee',
        baseQuantity: 50,
        baseUnit: 'ml',
        productUnitMultiplier: 0.1,
      }
    ]
  },
  {
    id: 'recipe-mumbai-poha',
    title: 'Authentic Maharashtrian Kanda Batata Poha',
    cuisine: 'Maharashtrian',
    prepTime: '15 mins',
    difficulty: 'Easy',
    baseServings: 3,
    targetBudgetPerServing: 35,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    description: 'Wholesome, fluffy flattened rice tossed with crunchy roasted peanuts, mustard seeds, curry leaves, potatoes, and lemon.',
    ingredients: [
      {
        productId: 'st-poha-1',
        name: 'Tata Sampann Thick Poha',
        baseQuantity: 300,
        baseUnit: 'g',
        productUnitMultiplier: 0.6,
      },
      {
        productId: 'st-peanuts-1',
        name: 'Raw Groundnuts / Peanuts',
        baseQuantity: 80,
        baseUnit: 'g',
        productUnitMultiplier: 0.16,
      },
      {
        productId: 'fv-onion-1',
        name: 'Finely Chopped Red Onions',
        baseQuantity: 200,
        baseUnit: 'g',
        productUnitMultiplier: 0.2,
      },
      {
        productId: 'fv-potato-1',
        name: 'Diced Tender Potatoes',
        baseQuantity: 150,
        baseUnit: 'g',
        productUnitMultiplier: 0.15,
      },
      {
        productId: 'st-spices-mustard',
        name: 'Black Mustard Seeds (Rai)',
        baseQuantity: 10,
        baseUnit: 'g',
        productUnitMultiplier: 0.1,
      },
      {
        productId: 'st-oil-1',
        name: 'Mustard Oil / Cooking Oil',
        baseQuantity: 30,
        baseUnit: 'ml',
        productUnitMultiplier: 0.03,
      }
    ]
  },
  {
    id: 'recipe-dal-tadka',
    title: 'Dhaba-Style Desi Ghee Dal Tadka & Jeera Rice',
    cuisine: 'North Indian',
    prepTime: '25 mins',
    difficulty: 'Easy',
    baseServings: 4,
    targetBudgetPerServing: 55,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    description: 'Slow-cooked yellow toor dal tempered with sizzling garlic, cumin, red chillies, and aromatic desi cow ghee.',
    ingredients: [
      {
        productId: 'st-dal-budget',
        name: 'Unpolished Toor Dal',
        baseQuantity: 250,
        baseUnit: 'g',
        productUnitMultiplier: 0.25,
        substitutionProductId: 'st-dal-prem',
      },
      {
        productId: 'st-rice-budget',
        name: 'Sona Masoori Rice (for Jeera Rice)',
        baseQuantity: 350,
        baseUnit: 'g',
        productUnitMultiplier: 0.35,
      },
      {
        productId: 'fv-tomato-1',
        name: 'Chopped Fresh Tomatoes',
        baseQuantity: 200,
        baseUnit: 'g',
        productUnitMultiplier: 0.2,
      },
      {
        productId: 'fv-onion-1',
        name: 'Diced Onions',
        baseQuantity: 150,
        baseUnit: 'g',
        productUnitMultiplier: 0.15,
      },
      {
        productId: 'st-spices-jeera',
        name: 'Whole Cumin Seeds',
        baseQuantity: 15,
        baseUnit: 'g',
        productUnitMultiplier: 0.15,
      },
      {
        productId: 'st-ghee-budget',
        name: 'Pure Desi Ghee (Tadka)',
        baseQuantity: 40,
        baseUnit: 'g',
        productUnitMultiplier: 0.08,
      }
    ]
  },
  {
    id: 'recipe-masala-dosa',
    title: 'Crispy South Indian Masala Dosa & Fresh Chutney',
    cuisine: 'South Indian',
    prepTime: '20 mins',
    difficulty: 'Easy',
    baseServings: 3,
    targetBudgetPerServing: 45,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    description: 'Golden fermented rice-urad crepe stuffed with spiced potato masala, served with chilled coconut peanut chutney.',
    ingredients: [
      {
        productId: 'st-batter-dosa',
        name: 'Fresh Fermented Dosa Batter',
        baseQuantity: 500,
        baseUnit: 'g',
        productUnitMultiplier: 0.5,
      },
      {
        productId: 'fv-potato-1',
        name: 'Boiled Potatoes for Aloo Masala',
        baseQuantity: 350,
        baseUnit: 'g',
        productUnitMultiplier: 0.35,
      },
      {
        productId: 'fv-onion-1',
        name: 'Sliced Onions',
        baseQuantity: 150,
        baseUnit: 'g',
        productUnitMultiplier: 0.15,
      },
      {
        productId: 'st-spices-mustard',
        name: 'Mustard Seeds',
        baseQuantity: 10,
        baseUnit: 'g',
        productUnitMultiplier: 0.1,
      },
      {
        productId: 'st-peanuts-1',
        name: 'Peanuts for Chutney',
        baseQuantity: 100,
        baseUnit: 'g',
        productUnitMultiplier: 0.2,
      },
      {
        productId: 'db-butter-1',
        name: 'Butter / Ghee for Dosa Crispness',
        baseQuantity: 30,
        baseUnit: 'g',
        productUnitMultiplier: 0.3,
      }
    ]
  }
];


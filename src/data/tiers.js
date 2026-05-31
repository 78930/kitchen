// Premium service tiers with a Vegetarian / Non-Vegetarian variant.
// Each tier holds shared meta plus diet-specific item lists.

export const tiers = [
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Essential Catering',
    accent: 'from-slate-200 to-slate-100',
    popular: false,
    highlights: ['Standard Buffet Setup', 'Professional Staff'],
    items: {
      veg: [
        'Sweet', 'Hot', 'Special Rice', 'Raitha', 'South Indian Curry',
        'Fry Item', 'Pappu', 'Sambar', 'White Rice', 'Curd', 'Papad',
      ],
      nonveg: [
        'Sweet', 'Hot', 'Chicken Curry', 'Special Rice', 'Raitha',
        'South Indian Curry', 'Fry Item', 'Dal', 'White Rice', 'Curd', 'Papad',
      ],
    },
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Premium Experience',
    accent: 'from-gold-light to-gold',
    popular: true,
    highlights: ['Grand Buffet Display', 'Uniformed Waitstaff', 'Bone China'],
    items: {
      veg: [
        'Sweet', 'Hot', 'Roti', 'Special Rice', 'Raitha', 'South Indian Curry',
        'North Indian Curry', 'Fry Item', 'Pappu', 'Sambar', 'White Rice', 'Curd', 'Papad',
      ],
      nonveg: [
        'Sweet', 'Hot', 'Roti', 'Chicken Curry', 'Special Rice', 'Raitha',
        'South Indian Curry', 'North Indian Curry', 'Fry Item', 'Dal',
        'White Rice', 'Curd', 'Papad',
      ],
    },
  },
  {
    id: 'diamond',
    name: 'Diamond',
    tagline: 'Elite Catering',
    accent: 'from-sky-200 to-cyan-100',
    popular: false,
    highlights: ['Elite Display', 'Dedicated Attendants'],
    items: {
      veg: [
        'Welcome Juice', 'Welcome Snack', 'Sweet', 'Hot', 'Roti', 'Special Rice',
        'Raitha', '2× South Indian Curries', '2× North Indian Curries',
        'Veg Salad', 'Ice Cream',
      ],
      nonveg: [
        'Welcome Juice', 'Welcome Snack', 'Sweet', 'Hot', 'Chicken Starter', 'Roti',
        'Special Rice', 'Raitha', '2× South Indian Curries',
        'Chicken & Mutton Curry', 'Veg Salad', 'Ice Cream',
      ],
    },
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Royal Luxury',
    accent: 'from-emerald-soft to-emerald-mid',
    popular: false,
    highlights: ['Exquisite Themed Setup', 'VVIP Protocol', 'Multiple Live Stations'],
    items: {
      veg: [
        'Mocktail Counter', 'Welcome Snacks Platter', 'Multi Sweets',
        'Live Chaat Station', 'Live Chinese Station', 'Live Italian Station',
        '3× North Indian Curries', '3× South Indian Curries', 'Assorted Breads',
        'Fresh Fruit Counter', 'Premium Dessert Bar', 'Complete Pan Counter',
      ],
      nonveg: [
        'Mocktail Counter', 'Veg & Non-Veg Welcome Snacks', 'Multi Sweets',
        'Live Chaat Station', 'Live Chinese Station', 'Live Italian Station',
        'Chicken · Mutton · Fish Curries', '3× North Indian Curries',
        'Dum Biryani Counter', 'Fresh Fruit Counter', 'Premium Dessert Bar',
        'Complete Pan Counter',
      ],
    },
  },
]

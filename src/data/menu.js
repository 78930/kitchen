// Royal Menu dataset for SA Caterers.
// Each category contains grouped sections of dishes rendered as interactive tag-cloud cards.

export const menuCategories = [
  {
    id: 'grand-wedding',
    label: 'Grand Wedding Menu',
    blurb: 'A royal, multi-course spread crafted for the grandest celebrations.',
    groups: [
      {
        title: 'Welcome Snacks (Veg)',
        items: [
          'Cheese Ball', 'Harabara Tikka', 'Corn Samosa', 'Mini Kachori',
          'Paneer Papad', 'Paneer Stick', 'Paneer Tikka', 'Paneer Pakoda',
          'Veg Manchuria', 'Veg Springroll',
        ],
      },
      {
        title: 'Welcome Station (Juices)',
        items: [
          'Pine Apple', 'Black Grape', 'Ganga Jamuna', 'Orange',
          'Water Melon', 'Fresh Lime Pudina', 'Kairi Panna',
        ],
      },
      {
        title: 'Mithai Mela (Sweets)',
        items: [
          'Gulab Jamun', 'Kaju Katli', 'Carrot Halwa', 'Double Ka Mitta',
          'Kesar Jalebi', 'Malpua', 'Karachi Rasmalai', 'Tawa Rabidi Jamun',
        ],
      },
      {
        title: 'Live Chat Counter',
        items: [
          'Golden Pani Poori', 'Cutlet Ragada', 'Pav Bhaji',
          'Masala Pav Bhaji', 'Chole Kulcha', 'Malai Dhai Wada',
        ],
      },
      {
        title: 'Special Wet Curries (Veg)',
        items: [
          'Paneer Chat-Pat', 'Shahi Paneer', 'Palak Paneer',
          'Paneer Butter Masala', 'Mushroom Masala', 'Kadai Vegetable',
          'Veg Jodpuri',
        ],
      },
      {
        title: 'Masala Curries & Dals',
        items: [
          'Bagara Baingan', 'Tomato Masala', 'Alu Kurma', 'Tomato Pappu',
          'Mamidkaya Pappu', 'Dal Makhini', 'Tadka Dal',
        ],
      },
      {
        title: 'Royal Rice Selection',
        items: [
          'Veg Dum Biryani', 'Paneer Biryani', 'Jeera Rice',
          'Kaju Pulav', 'Bagara Rice',
        ],
      },
      {
        title: 'Indian Breads',
        items: [
          'Palak Poori', 'Butter Naan', 'Rumali Roti',
          'Paneer Kulcha', 'Tandoor Roti',
        ],
      },
      {
        title: 'Ice Cream & Pan Corner',
        items: [
          'Vanilla', 'Butterscotch', 'Real Fruit Ice Cream',
          'Sweet Pan', 'Chocolate Pan',
        ],
      },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast Station',
    blurb: 'Hearty South Indian and tiffin classics to begin the day right.',
    groups: [
      {
        title: 'Tiffins',
        items: ['Idli', 'Vada', 'Masala Dosa', 'Plain Dosa', 'Upma', 'Pongal', 'Poori Masala'],
      },
      {
        title: 'Live Counter',
        items: ['Set Dosa', 'Onion Uttapam', 'Mysore Bonda', 'Mini Idli Sambar'],
      },
      {
        title: 'Accompaniments',
        items: ['Coconut Chutney', 'Tomato Chutney', 'Sambar', 'Mint Chutney'],
      },
      {
        title: 'Beverages',
        items: ['Filter Coffee', 'Masala Chai', 'Badam Milk', 'Fresh Juice'],
      },
    ],
  },
  {
    id: 'full-nonveg',
    label: 'Full Non Veg Menu',
    blurb: 'Slow-cooked Nizami non-veg specialities prepared by master chefs.',
    groups: [
      {
        title: 'Starters',
        items: ['Chicken 65', 'Chicken Lollipop', 'Apollo Fish', 'Mutton Kebab', 'Tangri Kebab', 'Chilli Chicken'],
      },
      {
        title: 'Signature Curries',
        items: ['Hyderabadi Chicken Curry', 'Mutton Rogan Josh', 'Butter Chicken', 'Fish Pulusu', 'Egg Masala'],
      },
      {
        title: 'Biryani & Rice',
        items: ['Hyderabadi Chicken Dum Biryani', 'Mutton Dum Biryani', 'Prawns Biryani', 'Ghee Rice'],
      },
      {
        title: 'Sides',
        items: ['Mirchi Ka Salan', 'Dahi Chutney', 'Onion Raita', 'Lemon & Salad'],
      },
    ],
  },
  {
    id: 'veg-200',
    label: 'Veg Below 200',
    blurb: 'A complete vegetarian buffet at a smart, budget-friendly price point.',
    groups: [
      {
        title: 'Includes',
        items: [
          'Sweet', 'Hot', 'Special Rice', 'Raitha', 'South Indian Curry',
          'Fry Item', 'Pappu', 'Sambar', 'White Rice', 'Curd', 'Papad',
        ],
      },
      {
        title: 'Optional Add-ons',
        items: ['Welcome Drink', 'Extra Sweet', 'Roti / Naan', 'Ice Cream'],
      },
    ],
  },
  {
    id: 'nonveg-200',
    label: 'Non Veg Below 200',
    blurb: 'Value non-veg buffet with biryani and signature curry, generously served.',
    groups: [
      {
        title: 'Includes',
        items: [
          'Sweet', 'Chicken Starter', 'Chicken Curry', 'Chicken Dum Biryani',
          'Veg Curry', 'Dal', 'White Rice', 'Raitha', 'Salad', 'Papad',
        ],
      },
      {
        title: 'Optional Add-ons',
        items: ['Welcome Drink', 'Mutton Curry', 'Apollo Fish', 'Ice Cream'],
      },
    ],
  },
  {
    id: 'premium-plans',
    label: 'Premium Plans',
    blurb: 'Curated luxury packages — see the full comparison in Premium Tiers below.',
    groups: [
      {
        title: 'Signature Live Stations',
        items: ['Chaat Station', 'Chinese Wok', 'Italian Pasta', 'Tandoor Live', 'Dosa Counter', 'Mocktail Bar'],
      },
      {
        title: 'Premium Counters',
        items: ['Fresh Fruit Counter', 'Imported Dessert Bar', 'Pan Counter', 'Coffee & Kulfi'],
      },
      {
        title: 'White-Glove Service',
        items: ['Uniformed Waitstaff', 'Bone China Crockery', 'Themed Buffet Decor', 'VVIP Protocol'],
      },
    ],
  },
]

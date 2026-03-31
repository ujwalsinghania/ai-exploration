// ─── Types ───────────────────────────────────────────────────────────

export interface Cuisine {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  costForTwo: number;
  tags: string[];
  color: string;
  imageUrl: string;
  menuItems: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantName: string;
}

// ─── Cuisines (4×2 grid) ─────────────────────────────────────────────

export const cuisines: Cuisine[] = [
  {
    id: "biryani",
    name: "Biryani",
    imageUrl:
      "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=400&h=300&fit=crop",
    color: "#FFF3E0",
  },
  {
    id: "pizza",
    name: "Pizza",
    imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop",
    color: "#FFEBEE",
  },
  {
    id: "burgers",
    name: "Burgers",
    imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=400&h=300&fit=crop",
    color: "#FFF8E1",
  },
  {
    id: "chinese",
    name: "Chinese",
    imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=400&h=300&fit=crop",
    color: "#E8F5E9",
  },
  {
    id: "south-indian",
    name: "South Indian",
    imageUrl: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=400&h=300&fit=crop",
    color: "#F3E5F5",
  },
  {
    id: "north-indian",
    name: "North Indian",
    imageUrl: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=400&h=300&fit=crop",
    color: "#E3F2FD",
  },
  {
    id: "desserts",
    name: "Desserts",
    imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?w=400&h=300&fit=crop",
    color: "#FCE4EC",
  },
  {
    id: "healthy",
    name: "Healthy",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
    color: "#E0F2F1",
  },
];

// ─── Restaurants by Cuisine ──────────────────────────────────────────

export const restaurantsByCuisine: Record<string, Restaurant[]> = {
  biryani: [
    {
      id: "b1",
      name: "Paradise Biryani",
      rating: 4.3,
      deliveryTime: "30–35 min",
      costForTwo: 450,
      tags: ["Biryani", "Hyderabadi"],
      color: "#FF9800",
      imageUrl: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "b1m1",
          name: "Chicken Dum Biryani",
          description:
            "Aromatic basmati rice layered with tender chicken, slow-cooked with saffron & special spices.",
          price: 299,
          isVeg: false,
        },
        {
          id: "b1m2",
          name: "Mutton Biryani",
          description:
            "Premium mutton pieces in rich gravy with fragrant long-grain rice.",
          price: 399,
          isVeg: false,
        },
        {
          id: "b1m3",
          name: "Veg Dum Biryani",
          description:
            "Garden fresh vegetables with aromatic rice, paneer cubes & masala.",
          price: 199,
          isVeg: true,
        },
      ],
    },
    {
      id: "b2",
      name: "Behrouz Biryani",
      rating: 4.1,
      deliveryTime: "35–40 min",
      costForTwo: 550,
      tags: ["Biryani", "Mughlai"],
      color: "#E65100",
      imageUrl: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "b2m1",
          name: "Dum Gosht Biryani",
          description:
            "Royal slow-cooked lamb biryani with hand-ground spices & saffron.",
          price: 449,
          isVeg: false,
        },
        {
          id: "b2m2",
          name: "Murgh Makhani Biryani",
          description: "Butter chicken style biryani with creamy richness.",
          price: 349,
          isVeg: false,
        },
      ],
    },
    {
      id: "b3",
      name: "Biryani Blues",
      rating: 3.9,
      deliveryTime: "25–30 min",
      costForTwo: 400,
      tags: ["Biryani", "North Indian"],
      color: "#F57C00",
      imageUrl: "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "b3m1",
          name: "Lucknowi Biryani",
          description:
            "Awadhi-style aromatic biryani with tender meat & whole spices.",
          price: 269,
          isVeg: false,
        },
        {
          id: "b3m2",
          name: "Paneer Biryani",
          description:
            "Cottage cheese cubes tossed in spiced rice with mint layers.",
          price: 219,
          isVeg: true,
        },
      ],
    },
  ],

  pizza: [
    {
      id: "p1",
      name: "Domino's Pizza",
      rating: 4.0,
      deliveryTime: "20–25 min",
      costForTwo: 500,
      tags: ["Pizza", "Italian"],
      color: "#D32F2F",
      imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "p1m1",
          name: "Margherita",
          description:
            "Classic hand-tossed pizza with mozzarella cheese & tangy tomato sauce.",
          price: 199,
          isVeg: true,
        },
        {
          id: "p1m2",
          name: "Pepperoni Feast",
          description:
            "Loaded with spicy pepperoni slices and double mozzarella.",
          price: 349,
          isVeg: false,
        },
        {
          id: "p1m3",
          name: "Farmhouse",
          description: "Capsicum, mushroom, onion & tomato with creamy cheese.",
          price: 299,
          isVeg: true,
        },
      ],
    },
    {
      id: "p2",
      name: "Pizza Hut",
      rating: 4.1,
      deliveryTime: "25–30 min",
      costForTwo: 600,
      tags: ["Pizza", "Pasta"],
      color: "#C62828",
      imageUrl: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "p2m1",
          name: "Chicken Supreme",
          description: "Loaded with chicken tikka, onion, capsicum & olives.",
          price: 399,
          isVeg: false,
        },
        {
          id: "p2m2",
          name: "Veggie Lover",
          description: "Packed with fresh veggies on a cheesy stuffed crust.",
          price: 349,
          isVeg: true,
        },
      ],
    },
    {
      id: "p3",
      name: "La Pino'z",
      rating: 4.2,
      deliveryTime: "30–35 min",
      costForTwo: 450,
      tags: ["Pizza", "Garlic Bread"],
      color: "#B71C1C",
      imageUrl: "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "p3m1",
          name: "Peri Peri Chicken",
          description:
            "Spicy peri peri chicken with jalapeño, onion & capsicum.",
          price: 329,
          isVeg: false,
        },
        {
          id: "p3m2",
          name: "Paneer Makhani Pizza",
          description:
            "Soft paneer cubes in makhani sauce on a cheese burst base.",
          price: 299,
          isVeg: true,
        },
      ],
    },
  ],

  burgers: [
    {
      id: "bg1",
      name: "McDonald's",
      rating: 4.2,
      deliveryTime: "15–20 min",
      costForTwo: 400,
      tags: ["Burgers", "Fast Food"],
      color: "#FFC107",
      imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "bg1m1",
          name: "McChicken Burger",
          description:
            "Crispy chicken patty with lettuce, mayo & sesame seed bun.",
          price: 159,
          isVeg: false,
        },
        {
          id: "bg1m2",
          name: "McVeggie",
          description: "Crunchy veggie patty with fresh lettuce & creamy mayo.",
          price: 129,
          isVeg: true,
        },
        {
          id: "bg1m3",
          name: "Big Mac",
          description:
            "Double beef patty with special sauce, lettuce, cheese & pickles.",
          price: 249,
          isVeg: false,
        },
      ],
    },
    {
      id: "bg2",
      name: "Burger King",
      rating: 4.0,
      deliveryTime: "20–25 min",
      costForTwo: 450,
      tags: ["Burgers", "Whopper"],
      color: "#FF8F00",
      imageUrl: "https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "bg2m1",
          name: "Whopper",
          description:
            "Flame-grilled beef patty with tomatoes, lettuce, onions & pickles.",
          price: 219,
          isVeg: false,
        },
        {
          id: "bg2m2",
          name: "Veg Whopper",
          description:
            "Flame-grilled veggie patty with classic whopper toppings.",
          price: 179,
          isVeg: true,
        },
      ],
    },
    {
      id: "bg3",
      name: "Burger Singh",
      rating: 4.3,
      deliveryTime: "25–30 min",
      costForTwo: 500,
      tags: ["Burgers", "Indian Fusion"],
      color: "#FFB300",
      imageUrl: "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "bg3m1",
          name: "Amritsari Murgh Burger",
          description:
            "Tandoori spiced chicken with Amritsari masala & mint chutney.",
          price: 199,
          isVeg: false,
        },
        {
          id: "bg3m2",
          name: "Paneer Lababdar Burger",
          description: "Spiced paneer patty with lababdar sauce & onion rings.",
          price: 179,
          isVeg: true,
        },
      ],
    },
  ],

  chinese: [
    {
      id: "c1",
      name: "Wok Express",
      rating: 4.1,
      deliveryTime: "25–30 min",
      costForTwo: 400,
      tags: ["Chinese", "Pan Asian"],
      color: "#388E3C",
      imageUrl: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "c1m1",
          name: "Chicken Hakka Noodles",
          description:
            "Stir-fried noodles with juicy chicken, bell peppers & soy.",
          price: 219,
          isVeg: false,
        },
        {
          id: "c1m2",
          name: "Veg Manchurian",
          description: "Crispy veggie balls tossed in tangy Manchurian sauce.",
          price: 179,
          isVeg: true,
        },
        {
          id: "c1m3",
          name: "Dragon Chicken",
          description: "Crispy chicken strips in sweet & spicy dragon sauce.",
          price: 259,
          isVeg: false,
        },
      ],
    },
    {
      id: "c2",
      name: "Mainland China",
      rating: 4.4,
      deliveryTime: "35–40 min",
      costForTwo: 800,
      tags: ["Chinese", "Fine Dining"],
      color: "#2E7D32",
      imageUrl: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "c2m1",
          name: "Kung Pao Chicken",
          description:
            "Wok-tossed chicken with peanuts, dried chili & Sichuan pepper.",
          price: 449,
          isVeg: false,
        },
        {
          id: "c2m2",
          name: "Dim Sum Platter",
          description:
            "Assorted steamed dim sums with truffle oil dipping sauce.",
          price: 399,
          isVeg: true,
        },
      ],
    },
  ],

  "south-indian": [
    {
      id: "si1",
      name: "Saravana Bhavan",
      rating: 4.4,
      deliveryTime: "20–25 min",
      costForTwo: 350,
      tags: ["South Indian", "Dosa"],
      color: "#7B1FA2",
      imageUrl: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "si1m1",
          name: "Masala Dosa",
          description:
            "Crispy golden dosa filled with spiced potato masala, served with sambar & chutney.",
          price: 129,
          isVeg: true,
        },
        {
          id: "si1m2",
          name: "Idli Sambar",
          description:
            "Soft steamed idlis served with aromatic sambar & coconut chutney.",
          price: 89,
          isVeg: true,
        },
        {
          id: "si1m3",
          name: "Filter Coffee",
          description: "Authentic South Indian filter coffee with frothy milk.",
          price: 49,
          isVeg: true,
        },
      ],
    },
    {
      id: "si2",
      name: "Madras Café",
      rating: 4.2,
      deliveryTime: "25–30 min",
      costForTwo: 300,
      tags: ["South Indian", "Thali"],
      color: "#6A1B9A",
      imageUrl: "https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "si2m1",
          name: "Ghee Roast Dosa",
          description:
            "Crispy dosa generously drizzled with ghee, served with 3 chutneys.",
          price: 149,
          isVeg: true,
        },
        {
          id: "si2m2",
          name: "Uttapam",
          description:
            "Thick rice pancake topped with onions, tomatoes & green chillies.",
          price: 119,
          isVeg: true,
        },
      ],
    },
  ],

  "north-indian": [
    {
      id: "ni1",
      name: "Punjab Grill",
      rating: 4.3,
      deliveryTime: "30–35 min",
      costForTwo: 700,
      tags: ["North Indian", "Mughlai"],
      color: "#1565C0",
      imageUrl: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "ni1m1",
          name: "Butter Chicken",
          description:
            "Tender chicken tikka pieces in rich, creamy tomato-butter gravy.",
          price: 329,
          isVeg: false,
        },
        {
          id: "ni1m2",
          name: "Dal Makhani",
          description:
            "Slow-cooked black lentils with butter, cream & aromatic spices.",
          price: 249,
          isVeg: true,
        },
        {
          id: "ni1m3",
          name: "Garlic Naan",
          description: "Soft tandoori naan brushed with garlic butter.",
          price: 69,
          isVeg: true,
        },
      ],
    },
    {
      id: "ni2",
      name: "Dhaba Express",
      rating: 4.0,
      deliveryTime: "25–30 min",
      costForTwo: 450,
      tags: ["North Indian", "Dhaba Style"],
      color: "#1976D2",
      imageUrl: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "ni2m1",
          name: "Paneer Tikka Masala",
          description: "Charred paneer cubes in smoky tikka spice gravy.",
          price: 269,
          isVeg: true,
        },
        {
          id: "ni2m2",
          name: "Chole Bhature",
          description:
            "Spicy chickpea curry with fluffy deep-fried puffed bread.",
          price: 159,
          isVeg: true,
        },
      ],
    },
  ],

  desserts: [
    {
      id: "d1",
      name: "Baskin Robbins",
      rating: 4.5,
      deliveryTime: "15–20 min",
      costForTwo: 350,
      tags: ["Desserts", "Ice Cream"],
      color: "#E91E63",
      imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "d1m1",
          name: "Chocolate Fudge Sundae",
          description:
            "Rich chocolate ice cream with hot fudge, whipped cream & cherry on top.",
          price: 199,
          isVeg: true,
        },
        {
          id: "d1m2",
          name: "Mango Sorbet",
          description:
            "Refreshing Alphonso mango sorbet — dairy free & delicious.",
          price: 149,
          isVeg: true,
        },
      ],
    },
    {
      id: "d2",
      name: "Theobroma",
      rating: 4.6,
      deliveryTime: "20–25 min",
      costForTwo: 500,
      tags: ["Desserts", "Bakery"],
      color: "#AD1457",
      imageUrl: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "d2m1",
          name: "Red Velvet Pastry",
          description:
            "Moist red velvet cake with cream cheese frosting layers.",
          price: 165,
          isVeg: true,
        },
        {
          id: "d2m2",
          name: "Chocolate Truffle Cake",
          description:
            "Dark Belgian chocolate truffle layered cake — sinfully rich.",
          price: 249,
          isVeg: true,
        },
        {
          id: "d2m3",
          name: "Brownie",
          description: "Dense, fudgy brownie with walnuts and chocolate chips.",
          price: 129,
          isVeg: true,
        },
      ],
    },
  ],

  healthy: [
    {
      id: "h1",
      name: "EatFit",
      rating: 4.3,
      deliveryTime: "25–30 min",
      costForTwo: 400,
      tags: ["Healthy", "Low Cal"],
      color: "#00897B",
      imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "h1m1",
          name: "Quinoa Salad Bowl",
          description:
            "Superfood quinoa with grilled vegetables, avocado & lemon dressing.",
          price: 279,
          isVeg: true,
        },
        {
          id: "h1m2",
          name: "Grilled Chicken Wrap",
          description:
            "Whole wheat wrap with grilled chicken, hummus & mixed greens.",
          price: 249,
          isVeg: false,
        },
      ],
    },
    {
      id: "h2",
      name: "Salad Days",
      rating: 4.1,
      deliveryTime: "20–25 min",
      costForTwo: 450,
      tags: ["Healthy", "Salads"],
      color: "#00796B",
      imageUrl: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=600&h=400&fit=crop",
      menuItems: [
        {
          id: "h2m1",
          name: "Greek Salad",
          description:
            "Fresh cucumber, tomatoes, olives, feta cheese & oregano vinaigrette.",
          price: 229,
          isVeg: true,
        },
        {
          id: "h2m2",
          name: "Protein Power Bowl",
          description:
            "Grilled paneer, chickpeas, roasted veggies & tahini drizzle.",
          price: 299,
          isVeg: true,
        },
      ],
    },
  ],
};

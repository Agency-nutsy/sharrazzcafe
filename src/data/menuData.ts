export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuSection {
  tab: string;
  categories: MenuCategory[];
}

export const menuData: MenuSection[] = [
  {
    tab: "Breakfast",
    categories: [
      {
        name: "Fruits",
        items: [
          { name: "Selection of Seasonal Sliced Fruits" },
        ],
      },
      {
        name: "Fruit Juice",
        items: [
          { name: "Orange Juice" },
          { name: "Watermelon Juice" },
          { name: "Pineapple Juice" },
          { name: "Tomato Juice" },
          { name: "Carrot Juice" },
          { name: "Cucumber Juice" },
          { name: "Beetroot Juice" },
          { name: "Celery Juice" },
        ],
      },
      {
        name: "Milk Shakes",
        items: [
          { name: "Banana Milk Shake" },
          { name: "Papaya Milk Shake" },
          { name: "Mango Milk Shake" },
        ],
      },
      {
        name: "Yoghurt & Lassi",
        items: [
          { name: "Plain Or Fruit Yoghurt" },
          { name: "Sweet Lassi" },
          { name: "Buttermilk" },
        ],
      },
      {
        name: "Breakfast Sets",
        items: [
          {
            name: "American Breakfast",
            description: "Choice of fresh seasonal juices or fresh fruit platter, basket of oven fresh bakeries or toast with jam and butter, choice of corn flakes, choco flakes, muesli with hot or cold milk, two farm fresh eggs cooked any style, tea, coffee or hot chocolate",
          },
          {
            name: "Continental Breakfast",
            description: "Choice of cereals, fresh seasonal juice or fresh fruit platter, basket of oven fresh bakeries or toast with jam and butter, tea or coffee",
          },
          {
            name: "North Indian Breakfast",
            description: "Choice of seasonal juice, sweet lassi or fresh fruit platter, poori bhaji, aloo or gobhi parantha with yoghurt and pickle, tea, coffee or hot chocolate",
          },
        ],
      },
    ],
  },
  {
    tab: "Starters",
    categories: [
      {
        name: "Indian Veg Starters",
        items: [
          { name: "Nazakat Ke Bharwaan-Tandoori Aloo" },
          { name: "Achari Paneer Tikka" },
          { name: "Nawabi Seekh Kabab" },
          { name: "Desi Masala Chaap" },
          { name: "Dahi Ke Sholay" },
          { name: "Afghani Chaap" },
          { name: "Mushroom Tandoor Se" },
          { name: "Achari Chaap" },
          { name: "Paneer Tikka" },
          { name: "Stuffed Chaap" },
          { name: "Tandoori Veg Platter" },
        ],
      },
      {
        name: "Indian Non-Veg Starters",
        items: [
          { name: "Chicken Tikka" },
          { name: "Pudina Chicken Tikka" },
          { name: "Achari Chicken Tikka" },
          { name: "Tandoori Chicken" },
          { name: "Chicken Malai Tikka" },
          { name: "Afghani Chicken" },
          { name: "Chicken Seekh Kabab", description: "4 Seekh" },
          { name: "Fish Tikka" },
          { name: "Mutton Seekh Kabab", description: "4 Seekh" },
          { name: "Tandoori Non-Veg Platter" },
          { name: "Tandoori Prawns" },
        ],
      },
      {
        name: "Chinese Starters",
        items: [
          { name: "Spring Roll" },
          { name: "Spring Roll In Schezwan Style" },
          { name: "Chilli Potato / Honey" },
          { name: "Cottage Cheese" },
          { name: "Corn Cheese Balls" },
          { name: "Honey Chicken With Bell Pepper" },
          { name: "Veg Manchurian Dry" },
          { name: "Lemon Chicken" },
          { name: "Chilly Paneer" },
          { name: "Drums Of Heaven", description: "Chicken lollipop" },
          { name: "Chilly Chaap" },
          { name: "Classic Chilly Chicken", description: "Dry" },
          { name: "Crispy Veg. Hakka Style" },
          { name: "Chicken Salt And Pepper" },
          { name: "Roasted Schezwan Paneer" },
          { name: "Corn Salt And Pepper" },
        ],
      },
      {
        name: "Chakna",
        items: [
          { name: "Plain Papad" },
          { name: "Plain Peanut" },
          { name: "Masala Papad" },
          { name: "Masala Peanut" },
          { name: "Aloo Chaat" },
          { name: "Nachos Chaat" },
          { name: "Chicken Popcorn" },
          { name: "Chinese Bhel" },
        ],
      },
    ],
  },
  {
    tab: "Mains",
    categories: [
      {
        name: "Chinese Main Course",
        items: [
          { name: "Veg. Manchurian Gravy" },
          { name: "Shredded Chicken", description: "In butter garlic sauce" },
          { name: "Deluxe Vegetable", description: "In hot garlic / schezwan sauce" },
          { name: "Fried Rice" },
          { name: "Chilly Paneer Gravy" },
          { name: "Singapoori Rice" },
          { name: "Chilly Chicken Gravy" },
        ],
      },
      {
        name: "Sea Food",
        items: [
          { name: "Chilly Prawns", description: "6 pcs" },
          { name: "Butter Garlic Prawns", description: "6 pcs" },
        ],
      },
      {
        name: "Noodles",
        items: [
          { name: "Hakka Noodles" },
          { name: "Egg Noodles" },
          { name: "Butter Garlic Noodles" },
          { name: "Chilly Garlic Noodles" },
          { name: "Singapuri Noodles" },
        ],
      },
      {
        name: "Pasta",
        items: [
          { name: "Penne Arrabiata" },
          { name: "Ala-Creamy" },
          { name: "Napoletana Pasta" },
          { name: "Green Basil Pasta" },
          { name: "Roman Style" },
          { name: "Lasagna" },
          { name: "Aglio Olio" },
        ],
      },
      {
        name: "Sizzlers",
        items: [
          { name: "Grilled Cottage Cheese Steak", description: "Served with mushroom sauce, green vegetables and herb rice" },
          { name: "736 AD Veg Sizzler", description: "Blend of vegetables with hot garlic sauce and rice" },
          { name: "Chicken Steak", description: "Served with tangy sauce and herb rice" },
          { name: "736 AD Chicken Mixed Grilled", description: "Served with mushroom sauce and green vegetables" },
        ],
      },
      {
        name: "Delhi 6",
        items: [
          { name: "Masala Chaap Roll" },
          { name: "Afgani Chaap Roll" },
          { name: "Chicken Seekh Roll" },
          { name: "Mutton Seekh Roll" },
        ],
      },
      {
        name: "Others",
        items: [
          { name: "Sriracha Chilly Chicken", price: "₹549", description: "Batter fried chicken chunks tossed in spicy sauce of eastern Thailand" },
          { name: "Shredded Honey Chilly Chicken", price: "₹499" },
          { name: "Salt And Pepper Chicken" },
          { name: "Chilli Lemon Fish", price: "₹599", description: "Batter fried fish tossed in chili lemon sauce" },
          { name: "Chicken Kung Pao", price: "₹399" },
        ],
      },
    ],
  },
  {
    tab: "Momos",
    categories: [
      {
        name: "Momos Corner",
        items: [
          { name: "Veg Momos", price: "₹349", description: "Steam / Pan Fried / Tandoori / Kurkure" },
          { name: "Paneer Momos", price: "₹399", description: "Steam / Pan Fried / Tandoori / Kurkure" },
          { name: "Chicken Momos", price: "₹449", description: "Steam / Pan Fried / Tandoori / Kurkure" },
        ],
      },
      {
        name: "Classic Momos",
        items: [
          { name: "Veg Dim Sum" },
          { name: "Chicken Dim Sum" },
          { name: "Pan Fried Momos" },
          { name: "Tandoori Momos" },
          { name: "Schezwan Momos" },
          { name: "Mushroom Momos" },
          { name: "736 AD Vintage Momos" },
          { name: "Veg Paneer Dim Sum" },
        ],
      },
    ],
  },
  {
    tab: "Pizza",
    categories: [
      {
        name: "Pizza Menu",
        items: [
          { name: "Farmhouse Veggie", description: "A pizza that goes ballistic on veggies! Spicy tomato sauce along with capsicum corns." },
          { name: "Bolognise", description: "Chicken kheema, onions, tomatoes, conti herbs & mozzarella cheese." },
          { name: "Delhi Masala", description: "Cheese paneer, tikka pizza served with fire roasted onion and bell peppers." },
          { name: "Smokey Chicken", description: "Smoked chicken and olives." },
          { name: "Tikka Tadka", description: "Chicken chunks, onions, capsicums, soya sauce, vinegar, chillies and mozzarella cheese." },
          { name: "Three Amigoes", description: "Two bell peppers, onions, corns and jalapenos." },
          { name: "Green Back", description: "Topping a freshly cooked pizza with sautéed spinach, mushroom, garlic and cilantro." },
          { name: "Chilli Willy", description: "Style of chilies with jalapeno, roasted garlic and mushroom." },
          { name: "Indiano", description: "Chicken cups, capsicum, onions, indian herbs and mozzarella cheese." },
          { name: "Little Italy", description: "Roasted chicken, bell peppers and olives." },
          { name: "Margherita", description: "Classic Italian pizza with tomato sauce, fresh basil and mozzarella." },
          { name: "BBQ Meat Balls", description: "Topping a freshly cooked pizza with meat balls and mozzarella." },
        ],
      },
    ],
  },
  {
    tab: "Cocktails",
    categories: [
      {
        name: "736 AD's Live Beauties",
        items: [
          { name: "LIIT", description: "Vodka, gin, rum, tequila, sweet & sour mix & a splash of diet coke" },
          { name: "Tokyo Iced Tea", description: "Vodka, rum, gin, tequila, midori & sprite" },
          { name: "Adios Shot", description: "Vodka, rum, gin, tequila & blue curaçao" },
          { name: "Tequila Sunrise", description: "Tequila, orange juice and grenadine" },
          { name: "Piña Colada Shot", description: "Coconut rum, cream of coconut & pineapple juice" },
        ],
      },
      {
        name: "736 AD's Cocktails",
        items: [
          { name: "Kiwi Delight", description: "Vodka, kiwi, basil leaf, mint leaf, lime chunks, lime juice, cranberry juice & orange juice" },
          { name: "Bloody Mary", description: "Vodka, tabasco, worcestershire sauce, salt & pepper, lime juice & tomato juice" },
          { name: "Dawn", description: "Absolute Elyx, triple sec, fresh malta orange & fresh mint leaves" },
          { name: "Strawberry Basil Martini", description: "Absolut, fresh basil leaves, fresh strawberry pulp & sweet and sour mix" },
          { name: "Monkey Sour", description: "All the way from bourbon, egg white, pineapple, sweet & sour" },
          { name: "Orient Express", description: "Mexican favourite, tequila, peach, lime" },
          { name: "Spice Cucumber Margarita", description: "Tequila, cucumber, basil leaf, green chilly, jalapeno & lime & orange juice" },
          { name: "Russian Affair", description: "Vodka, cranberry, grapes, lime" },
          { name: "Fashion Is My Passion", description: "Gin, fresh pineapple, sweet & sour and passion fruit" },
          { name: "Summer Special", description: "Aam panna puree, bacardi, mint, lime chunks" },
        ],
      },
      {
        name: "Mojito",
        items: [
          { name: "Classic Mojito", description: "White rum, mint & lime" },
          { name: "Peach Mojito", description: "White rum, peach, orange, basil & lime" },
          { name: "Strawberry Mojito", description: "White rum, strawberry, basil & lime" },
        ],
      },
      {
        name: "Martini",
        items: [
          { name: "Classic Martini", description: "Gin & dry vermouth" },
          { name: "Dry Martini", description: "Gin, vermouth, olive/lemon" },
          { name: "Perfect Martini", description: "Gin, dry & sweet vermouth" },
          { name: "Basil Martini", description: "Gin & basil" },
        ],
      },
    ],
  },
  {
    tab: "Spirits",
    categories: [
      {
        name: "Tequila",
        items: [
          { name: "Sauza Silver" },
          { name: "Camino" },
        ],
      },
      {
        name: "Gin",
        items: [
          { name: "Bombay Sapphire" },
          { name: "Beefeater" },
        ],
      },
      {
        name: "Brandy",
        items: [
          { name: "Morpheus" },
        ],
      },
      {
        name: "Liqueurs",
        items: [
          { name: "Sambuca" },
          { name: "Baileys" },
          { name: "Jagermeister" },
          { name: "Jager Bombs" },
        ],
      },
      {
        name: "Sangria",
        items: [
          { name: "Green Apple And Cinnamon" },
          { name: "White Wine Sangria" },
          { name: "Red Apple & Litchi" },
          { name: "Rose Wine Sangria" },
        ],
      },
    ],
  },
  {
    tab: "Mocktails",
    categories: [
      {
        name: "Mocktails",
        items: [
          { name: "Orange Carn Twist", description: "Orange chunks, mint leaves, lemon chunks, peach syrup, orange juice and cranberry juice" },
          { name: "Water Melon Fesco", description: "Fresh watermelon, mint leaves, passion fruit, cranberry juice, mix of soda sprite" },
          { name: "Sweet Angle", description: "Pomegranates, raspberry, grenadine, rocksalt topped with soda" },
          { name: "Hudson Affairs", description: "Aam panna puree, mint leaves, lemon chunks, rock salt, green tabasco, topped with soda and sprite" },
          { name: "Virgin Apple Mojito", description: "Fresh apple chunks, mint, lime chunks, apple juice, sprite and soda" },
          { name: "Virgin Mary", description: "Tomato juice, worcestershire sauce, hot sauce & lemon juice" },
          { name: "Blue Lagoon", description: "Blue curaçao, lemonade and lemon juice" },
          { name: "Pink Lemonade" },
          { name: "Florida", description: "Infusion of grape, orange and lemon juice with sugar syrup" },
          { name: "Virgin Mojito" },
          { name: "Pinacolada" },
          { name: "Fruit Punch", description: "Mixed juice with vanilla ice cream" },
        ],
      },
      {
        name: "Shakes",
        items: [
          { name: "Oreo Milk Shake" },
          { name: "Kitkat Shake" },
          { name: "Cocoa Rust Shake" },
          { name: "Strawberry Kiwi Milk Shake" },
          { name: "Easiest Ice Caps Ever" },
          { name: "Strawberry Shake" },
          { name: "Vanilla Shake" },
          { name: "Frozen Mocha" },
          { name: "Cold Coffee" },
        ],
      },
    ],
  },
  {
    tab: "Beverages",
    categories: [
      {
        name: "Beverages",
        items: [
          { name: "Soft Drinks" },
          { name: "Hot Coffee" },
          { name: "Diet Coke" },
          { name: "Juices" },
          { name: "Red Bull" },
          { name: "Ice Tea (Lemon/Peach)" },
          { name: "Mineral Water" },
        ],
      },
      {
        name: "Tea Blends",
        items: [
          { name: "Green And Lemon" },
          { name: "Chamomile Green" },
          { name: "Jasmine Green" },
          { name: "Earl Grey" },
          { name: "Rose And Cardamom" },
          { name: "Moroccan Mint" },
          { name: "5 Spice" },
          { name: "Detox" },
          { name: "Tulsi" },
          { name: "Kashmiri Kahwa" },
        ],
      },
      {
        name: "Classic Tea",
        items: [
          { name: "Green Tea" },
          { name: "Assam Tea" },
          { name: "Darjeeling First Flush" },
          { name: "Oolong Tea" },
          { name: "White Tea" },
        ],
      },
      {
        name: "Tea With Milk",
        items: [
          { name: "Cutting Chai" },
          { name: "Masala Chai" },
          { name: "Elaichi Chai" },
          { name: "Karari Chai" },
          { name: "Ginger And Tulsi" },
          { name: "Doodh Mein Patti" },
          { name: "Kulhad Chai With Kesar" },
          { name: "Turmeric Tea Latte" },
        ],
      },
      {
        name: "Coffee",
        items: [
          { name: "Americano" },
          { name: "Café Latte" },
          { name: "Café Mocha" },
          { name: "Hot Chocolate" },
        ],
      },
      {
        name: "Ice Tea",
        items: [
          { name: "Lime And Basil" },
          { name: "Olive Garden Peach" },
          { name: "Watermelon" },
          { name: "Minty Green" },
          { name: "Sparkling Cranberry" },
          { name: "Raspberry And Lime" },
          { name: "Wild Berries" },
          { name: "Detox Ice Tea" },
        ],
      },
    ],
  },
  {
    tab: "Desserts",
    categories: [
      {
        name: "Desserts",
        items: [
          { name: "Oreo Love" },
          { name: "Mixed Berry Crumble Jar" },
          { name: "Brownie Wonder" },
        ],
      },
    ],
  },
];

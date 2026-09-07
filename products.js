/* =========================================
   SHOPSMART AI
   PRODUCT DATABASE
========================================= */

const products = [

    // =========================
    // ELECTRONICS - SMARTPHONES
    // =========================

    {
        id: 1,
        name: "Galaxy M35 5G",
        brand: "Samsung",
        category: "Electronics",
        price: 18999,
        originalPrice: 22999,
        discount: 17,
        rating: 4.4,
        reviews: 1842,
        description: "Powerful 5G smartphone with a large AMOLED display and long-lasting battery.",
        features: [
            "6.6-inch Super AMOLED Display",
            "50MP Triple Camera",
            "6000mAh Battery",
            "8GB RAM",
            "128GB Storage",
            "5G Support"
        ],
        availability: "In Stock",
        stock: 24,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Nord CE 4",
        brand: "OnePlus",
        category: "Electronics",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        rating: 4.5,
        reviews: 2351,
        description: "Fast and smooth smartphone designed for performance, gaming and everyday use.",
        features: [
            "6.7-inch AMOLED Display",
            "50MP Sony Camera",
            "5500mAh Battery",
            "8GB RAM",
            "128GB Storage",
            "80W Fast Charging"
        ],
        availability: "In Stock",
        stock: 18,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Redmi Note 14 5G",
        brand: "Xiaomi",
        category: "Electronics",
        price: 15999,
        originalPrice: 19999,
        discount: 20,
        rating: 4.3,
        reviews: 3210,
        description: "Feature-packed 5G smartphone with excellent display, camera and battery.",
        features: [
            "6.67-inch AMOLED",
            "108MP Camera",
            "5110mAh Battery",
            "8GB RAM",
            "256GB Storage",
            "5G Connectivity"
        ],
        availability: "In Stock",
        stock: 32,
        image: "https://images.unsplash.com/photo-1592286927505-2fd0f7a4b8b8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Nothing Phone 2a",
        brand: "Nothing",
        category: "Electronics",
        price: 21999,
        originalPrice: 24999,
        discount: 12,
        rating: 4.4,
        reviews: 1450,
        description: "Stylish smartphone with a clean interface and unique transparent-inspired design.",
        features: [
            "6.7-inch AMOLED",
            "50MP Dual Camera",
            "5000mAh Battery",
            "8GB RAM",
            "128GB Storage",
            "120Hz Refresh Rate"
        ],
        availability: "In Stock",
        stock: 12,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // ELECTRONICS - LAPTOPS
    // =========================

    {
        id: 5,
        name: "IdeaPad Slim 3",
        brand: "Lenovo",
        category: "Electronics",
        price: 44999,
        originalPrice: 57999,
        discount: 22,
        rating: 4.4,
        reviews: 2187,
        description: "Slim everyday laptop ideal for students, office work and entertainment.",
        features: [
            "15.6-inch Full HD Display",
            "Intel Core i5",
            "16GB RAM",
            "512GB SSD",
            "Intel Graphics",
            "Windows 11"
        ],
        availability: "In Stock",
        stock: 9,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Inspiron 15",
        brand: "Dell",
        category: "Electronics",
        price: 52999,
        originalPrice: 64999,
        discount: 18,
        rating: 4.5,
        reviews: 1654,
        description: "Reliable performance laptop for students, professionals and multitasking.",
        features: [
            "15.6-inch Full HD Display",
            "Intel Core i5",
            "16GB RAM",
            "512GB SSD",
            "Intel Iris Graphics",
            "Windows 11"
        ],
        availability: "In Stock",
        stock: 14,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "MacBook Air M2",
        brand: "Apple",
        category: "Electronics",
        price: 74999,
        originalPrice: 89999,
        discount: 17,
        rating: 4.8,
        reviews: 4920,
        description: "Lightweight premium laptop with excellent battery life and powerful M2 performance.",
        features: [
            "13.6-inch Retina Display",
            "Apple M2 Chip",
            "8GB Unified Memory",
            "256GB SSD",
            "Up to 18 Hours Battery",
            "macOS"
        ],
        availability: "In Stock",
        stock: 7,
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "VivoBook 15",
        brand: "ASUS",
        category: "Electronics",
        price: 47999,
        originalPrice: 59999,
        discount: 20,
        rating: 4.3,
        reviews: 1320,
        description: "Slim and versatile laptop for college, work and everyday productivity.",
        features: [
            "15.6-inch Full HD",
            "Intel Core i5",
            "16GB RAM",
            "512GB SSD",
            "Intel Graphics",
            "Backlit Keyboard"
        ],
        availability: "In Stock",
        stock: 11,
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // ELECTRONICS - HEADPHONES
    // =========================

    {
        id: 9,
        name: "WH-CH520 Wireless Headphones",
        brand: "Sony",
        category: "Electronics",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        rating: 4.5,
        reviews: 8450,
        description: "Comfortable wireless headphones with impressive battery life and clear sound.",
        features: [
            "Bluetooth 5.2",
            "Up to 50 Hours Battery",
            "Fast Charging",
            "Lightweight Design",
            "Built-in Microphone",
            "Clear Audio"
        ],
        availability: "In Stock",
        stock: 35,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 10,
        name: "QuietComfort 45",
        brand: "Bose",
        category: "Electronics",
        price: 22999,
        originalPrice: 29999,
        discount: 23,
        rating: 4.7,
        reviews: 3890,
        description: "Premium noise-cancelling headphones for travel, work and music.",
        features: [
            "Active Noise Cancellation",
            "24 Hours Battery",
            "Bluetooth",
            "Comfortable Ear Cushions",
            "Built-in Microphone",
            "Fast Charging"
        ],
        availability: "In Stock",
        stock: 8,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 11,
        name: "Gaming Headset G435",
        brand: "Logitech",
        category: "Electronics",
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        rating: 4.4,
        reviews: 2760,
        description: "Lightweight gaming headset with low-latency wireless audio and clear microphone.",
        features: [
            "Wireless Gaming",
            "Low Latency",
            "18 Hours Battery",
            "Dual Microphones",
            "Lightweight",
            "PC & Console Support"
        ],
        availability: "In Stock",
        stock: 20,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 12,
        name: "AirPods 3rd Generation",
        brand: "Apple",
        category: "Electronics",
        price: 16999,
        originalPrice: 19999,
        discount: 15,
        rating: 4.6,
        reviews: 5620,
        description: "Wireless earbuds with spatial audio and seamless Apple device connectivity.",
        features: [
            "Spatial Audio",
            "MagSafe Charging Case",
            "Up to 30 Hours Battery",
            "Sweat Resistant",
            "Apple H1 Chip",
            "Wireless Charging"
        ],
        availability: "In Stock",
        stock: 15,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // ELECTRONICS - SMARTWATCH
    // =========================

    {
        id: 13,
        name: "Galaxy Watch 6",
        brand: "Samsung",
        category: "Electronics",
        price: 18999,
        originalPrice: 24999,
        discount: 24,
        rating: 4.5,
        reviews: 2190,
        description: "Smartwatch with health tracking, fitness features and a bright AMOLED display.",
        features: [
            "1.5-inch AMOLED",
            "Heart Rate Tracking",
            "Sleep Tracking",
            "GPS",
            "Bluetooth Calling",
            "Water Resistant"
        ],
        availability: "In Stock",
        stock: 10,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 14,
        name: "Watch Series 9",
        brand: "Apple",
        category: "Electronics",
        price: 39999,
        originalPrice: 44999,
        discount: 11,
        rating: 4.8,
        reviews: 3120,
        description: "Premium smartwatch with advanced fitness, health and smart features.",
        features: [
            "45mm Display",
            "Heart Rate Sensor",
            "GPS",
            "Fitness Tracking",
            "Water Resistant",
            "Fast Charging"
        ],
        availability: "In Stock",
        stock: 6,
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // FASHION - SHOES
    // =========================

    {
        id: 15,
        name: "Air Max Running Shoes",
        brand: "Nike",
        category: "Fashion",
        price: 6999,
        originalPrice: 9999,
        discount: 30,
        rating: 4.5,
        reviews: 2310,
        description: "Comfortable running shoes with cushioned support for everyday workouts.",
        features: [
            "Breathable Mesh",
            "Cushioned Sole",
            "Lightweight",
            "Running Design",
            "Non-slip Outsole"
        ],
        availability: "In Stock",
        stock: 22,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 16,
        name: "Ultraboost Running Shoes",
        brand: "Adidas",
        category: "Fashion",
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        rating: 4.6,
        reviews: 1980,
        description: "Premium running shoes offering responsive cushioning and excellent comfort.",
        features: [
            "Boost Cushioning",
            "Breathable Upper",
            "Lightweight",
            "Flexible Sole",
            "Running Support"
        ],
        availability: "In Stock",
        stock: 17,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 17,
        name: "Classic Sneakers",
        brand: "Puma",
        category: "Fashion",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        rating: 4.3,
        reviews: 4120,
        description: "Stylish everyday sneakers that pair easily with casual outfits.",
        features: [
            "Synthetic Upper",
            "Rubber Sole",
            "Casual Design",
            "Lightweight",
            "Everyday Comfort"
        ],
        availability: "In Stock",
        stock: 30,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // FASHION - CLOTHING
    // =========================

    {
        id: 18,
        name: "Men's Cotton T-Shirt",
        brand: "Roadster",
        category: "Fashion",
        price: 699,
        originalPrice: 1299,
        discount: 46,
        rating: 4.2,
        reviews: 6240,
        description: "Comfortable everyday cotton t-shirt with a clean casual look.",
        features: [
            "100% Cotton",
            "Regular Fit",
            "Breathable Fabric",
            "Machine Washable",
            "Casual Style"
        ],
        availability: "In Stock",
        stock: 45,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 19,
        name: "Women's Casual Hoodie",
        brand: "H&M",
        category: "Fashion",
        price: 1499,
        originalPrice: 2499,
        discount: 40,
        rating: 4.4,
        reviews: 2890,
        description: "Soft and comfortable hoodie suitable for casual everyday wear.",
        features: [
            "Soft Cotton Blend",
            "Relaxed Fit",
            "Hooded",
            "Warm Fabric",
            "Casual Design"
        ],
        availability: "In Stock",
        stock: 28,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // FASHION - BAGS
    // =========================

    {
        id: 20,
        name: "Urban Laptop Backpack",
        brand: "American Tourister",
        category: "Fashion",
        price: 1799,
        originalPrice: 2999,
        discount: 40,
        rating: 4.5,
        reviews: 5340,
        description: "Spacious laptop backpack ideal for college, office and travel.",
        features: [
            "15.6-inch Laptop Compartment",
            "Water Resistant",
            "Multiple Pockets",
            "Padded Straps",
            "USB Charging Port"
        ],
        availability: "In Stock",
        stock: 25,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 21,
        name: "Leather Office Bag",
        brand: "Fastrack",
        category: "Fashion",
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.3,
        reviews: 1670,
        description: "Professional-looking office bag with compartments for laptop and documents.",
        features: [
            "Premium Finish",
            "Laptop Compartment",
            "Document Storage",
            "Adjustable Strap",
            "Lightweight"
        ],
        availability: "In Stock",
        stock: 13,
        image: "https://images.unsplash.com/photo-1553062407-5c1b5b2b2f8f?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // HOME - KITCHEN
    // =========================

    {
        id: 22,
        name: "Air Fryer 4.2L",
        brand: "Philips",
        category: "Home",
        price: 5999,
        originalPrice: 8999,
        discount: 33,
        rating: 4.6,
        reviews: 7650,
        description: "Healthy cooking made easy with rapid air technology and multiple presets.",
        features: [
            "4.2L Capacity",
            "Rapid Air Technology",
            "Digital Controls",
            "Multiple Presets",
            "Easy Cleaning"
        ],
        availability: "In Stock",
        stock: 16,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 23,
        name: "Mixer Grinder 750W",
        brand: "Bajaj",
        category: "Home",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        rating: 4.4,
        reviews: 5120,
        description: "Powerful mixer grinder for everyday kitchen preparation.",
        features: [
            "750W Motor",
            "3 Stainless Steel Jars",
            "Powerful Blades",
            "Overload Protection",
            "Durable Body"
        ],
        availability: "In Stock",
        stock: 21,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 24,
        name: "Electric Kettle 1.5L",
        brand: "Prestige",
        category: "Home",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        rating: 4.3,
        reviews: 8420,
        description: "Fast-boiling electric kettle for tea, coffee and hot water.",
        features: [
            "1.5L Capacity",
            "Fast Boiling",
            "Auto Shut-off",
            "Stainless Steel Body",
            "Cool Touch Handle"
        ],
        availability: "In Stock",
        stock: 40,
        image: "https://images.unsplash.com/photo-1594213114663-d94db9b17119?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // HOME - ACCESSORIES
    // =========================

    {
        id: 25,
        name: "Smart LED Desk Lamp",
        brand: "Mi",
        category: "Home",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        rating: 4.4,
        reviews: 2100,
        description: "Modern adjustable desk lamp for studying, working and reading.",
        features: [
            "Adjustable Brightness",
            "Multiple Light Modes",
            "Touch Controls",
            "Eye Comfort Mode",
            "Modern Design"
        ],
        availability: "In Stock",
        stock: 27,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 26,
        name: "Robot Vacuum Cleaner",
        brand: "Eureka",
        category: "Home",
        price: 17999,
        originalPrice: 24999,
        discount: 28,
        rating: 4.3,
        reviews: 980,
        description: "Smart robot vacuum that helps automate everyday floor cleaning.",
        features: [
            "Smart Navigation",
            "Auto Charging",
            "Multiple Cleaning Modes",
            "App Control",
            "Low Noise"
        ],
        availability: "In Stock",
        stock: 5,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // BEAUTY - SKINCARE
    // =========================

    {
        id: 27,
        name: "Vitamin C Face Serum",
        brand: "Minimalist",
        category: "Beauty",
        price: 699,
        originalPrice: 799,
        discount: 13,
        rating: 4.5,
        reviews: 11200,
        description: "Lightweight vitamin C serum designed for a brighter-looking complexion.",
        features: [
            "10% Vitamin C",
            "Lightweight Formula",
            "Fragrance Free",
            "Suitable for Most Skin Types",
            "30ml"
        ],
        availability: "In Stock",
        stock: 50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 28,
        name: "Hydrating Face Moisturizer",
        brand: "Cetaphil",
        category: "Beauty",
        price: 599,
        originalPrice: 799,
        discount: 25,
        rating: 4.6,
        reviews: 9320,
        description: "Gentle daily moisturizer designed to help maintain skin hydration.",
        features: [
            "Hydrating Formula",
            "Gentle on Skin",
            "Fragrance Free",
            "Non-Greasy",
            "Suitable for Dry Skin"
        ],
        availability: "In Stock",
        stock: 44,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // BEAUTY - PERSONAL CARE
    // =========================

    {
        id: 29,
        name: "Electric Hair Trimmer",
        brand: "Philips",
        category: "Beauty",
        price: 1299,
        originalPrice: 1799,
        discount: 28,
        rating: 4.5,
        reviews: 7210,
        description: "Cordless grooming trimmer with adjustable length settings.",
        features: [
            "Cordless Operation",
            "60 Minutes Runtime",
            "Multiple Length Settings",
            "Washable Head",
            "USB Charging"
        ],
        availability: "In Stock",
        stock: 33,
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 30,
        name: "Hair Dryer 2100W",
        brand: "Nova",
        category: "Beauty",
        price: 1099,
        originalPrice: 1699,
        discount: 35,
        rating: 4.2,
        reviews: 4680,
        description: "Powerful hair dryer with multiple heat and speed settings.",
        features: [
            "2100W Motor",
            "Multiple Heat Settings",
            "Cool Shot",
            "Concentrator Nozzle",
            "Overheat Protection"
        ],
        availability: "In Stock",
        stock: 29,
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80"
    },


    // =========================
    // EXTRA PRODUCTS
    // =========================

    {
        id: 31,
        name: "Bluetooth Portable Speaker",
        brand: "JBL",
        category: "Electronics",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        rating: 4.7,
        reviews: 6380,
        description: "Portable Bluetooth speaker with powerful sound and long battery life.",
        features: [
            "12 Hours Battery",
            "Bluetooth 5.3",
            "Water Resistant",
            "Portable Design",
            "Powerful Bass"
        ],
        availability: "In Stock",
        stock: 26,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 32,
        name: "Smart Fitness Band",
        brand: "Noise",
        category: "Electronics",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        rating: 4.3,
        reviews: 5800,
        description: "Affordable fitness band with activity tracking and health monitoring.",
        features: [
            "AMOLED Display",
            "Heart Rate Monitoring",
            "Sleep Tracking",
            "Multiple Sports Modes",
            "7 Days Battery"
        ],
        availability: "In Stock",
        stock: 38,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?auto=format&fit=crop&w=700&q=80"
    }

];


/* =========================================
   HELPER FUNCTIONS
========================================= */

function getProductById(id) {
    return products.find(product => product.id === Number(id));
}


function getProductsByCategory(category) {
    return products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );
}


function getBestDeals(limit = 8) {
    return [...products]
        .sort((a, b) => b.discount - a.discount)
        .slice(0, limit);
}


function getTopRated(limit = 8) {
    return [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}


function searchProductDatabase(query) {

    const q = query.toLowerCase().trim();

    if (!q) {
        return products;
    }

    return products.filter(product => {

        const searchableText = [
            product.name,
            product.brand,
            product.category,
            product.description,
            product.availability,
            ...product.features
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(q);
    });
}
const dummyProducts = [
    {
        title: "Organic Green Tea",
        description: "A refreshing and healthy green tea made from organic leaves.",
        image: [
            "https://example.com/images/product1.jpg",
            "https://example.com/images/product2.jpg",
        ],
        category: "Beverages",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 250,
                    color: "Green",
                    size: "Medium",
                    stock: 100,
                    price: {
                        mrp: 500,
                        sellingPrice: 450,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    color: "Green",
                    size: "Large",
                    stock: 50,
                    price: {
                        mrp: 800,
                        sellingPrice: 750,
                    },
                },
            },
        ],
        reviews: [],
        label: "best seller",
        tag: ["tea", "organic", "health"],
        active: true,
        isDeleted: false,
        sales: 150,
    },
    {
        title: "Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies.",
        image: ["https://example.com/images/cookies1.jpg"],
        category: "Bakery",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 200,
                    size: "Pack of 12",
                    stock: 50,
                    price: {
                        mrp: 300,
                        sellingPrice: 280,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Pack of 24",
                    stock: 30,
                    price: {
                        mrp: 700,
                        sellingPrice: 650,
                    },
                },
            },
        ],
        reviews: [],
        label: "trending",
        tag: ["cookies", "chocolate", "snacks"],
        active: true,
        isDeleted: false,
        sales: 70,
    },
    {
        title: "Vanilla Ice Cream",
        description: "Creamy vanilla ice cream made with real vanilla beans.",
        image: ["https://example.com/images/icecream1.jpg"],
        category: "Desserts",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Tub",
                    stock: 30,
                    price: {
                        mrp: 400,
                        sellingPrice: 350,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 1000,
                    size: "Family Pack",
                    stock: 20,
                    price: {
                        mrp: 700,
                        sellingPrice: 650,
                    },
                },
            },
        ],
        reviews: [],
        tag: ["ice cream", "vanilla", "dessert"],
        active: true,
        isDeleted: false,
        sales: 120,
    },
    {
        title: "Almond Milk",
        description: "Plant-based milk made from almonds. Rich and creamy.",
        image: ["https://example.com/images/almondmilk1.jpg"],
        category: "Dairy",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 1000,
                    size: "Carton",
                    stock: 75,
                    price: {
                        mrp: 150,
                        sellingPrice: 140,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Half Carton",
                    stock: 60,
                    price: {
                        mrp: 80,
                        sellingPrice: 75,
                    },
                },
            },
        ],
        reviews: [],
        label: "trending",
        tag: ["milk", "almond", "vegan"],
        active: true,
        isDeleted: false,
        sales: 90,
    },
    {
        title: "Blueberry Muffins",
        description: "Soft and fluffy muffins filled with juicy blueberries.",
        image: ["https://example.com/images/muffins1.jpg"],
        category: "Bakery",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 300,
                    size: "Pack of 6",
                    stock: 40,
                    price: {
                        mrp: 350,
                        sellingPrice: 330,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 600,
                    size: "Pack of 12",
                    stock: 25,
                    price: {
                        mrp: 650,
                        sellingPrice: 600,
                    },
                },
            },
        ],
        reviews: [],
        label: "people's choice",
        tag: ["muffins", "blueberry", "dessert"],
        active: true,
        isDeleted: false,
        sales: 60,
    },
    {
        title: "Organic Honey",
        description: "Pure, raw, and organic honey sourced from local farms.",
        image: ["https://example.com/images/honey1.jpg"],
        category: "Grocery",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Small Jar",
                    stock: 90,
                    price: {
                        mrp: 600,
                        sellingPrice: 550,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 1000,
                    size: "Large Jar",
                    stock: 60,
                    price: {
                        mrp: 1000,
                        sellingPrice: 950,
                    },
                },
            },
        ],
        reviews: [],
        label: "best seller",
        tag: ["honey", "organic", "natural"],
        active: true,
        isDeleted: false,
        sales: 200,
    },
    {
        title: "Cheddar Cheese",
        description: "Aged cheddar cheese with a sharp and tangy flavor.",
        image: ["https://example.com/images/cheese1.jpg"],
        category: "Dairy",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 250,
                    size: "Small Block",
                    stock: 60,
                    price: {
                        mrp: 300,
                        sellingPrice: 280,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Large Block",
                    stock: 40,
                    price: {
                        mrp: 500,
                        sellingPrice: 480,
                    },
                },
            },
        ],
        reviews: [],
        label: "people's choice",
        tag: ["cheese", "cheddar", "dairy"],
        active: true,
        isDeleted: false,
        sales: 80,
    },
    {
        title: "Chocolate Cake",
        description: "Rich and moist chocolate cake with layers of ganache.",
        image: ["https://example.com/images/cake1.jpg"],
        category: "Desserts",
        variety: [
            {
                additionalDesc: {
                    size: "1kg",
                    stock: 15,
                    price: {
                        mrp: 1200,
                        sellingPrice: 1100,
                    },
                },
            },
            {
                additionalDesc: {
                    size: "2kg",
                    stock: 10,
                    price: {
                        mrp: 2200,
                        sellingPrice: 2000,
                    },
                },
            },
        ],
        reviews: [],
        label: "best seller",
        tag: ["cake", "chocolate", "dessert"],
        active: true,
        isDeleted: false,
        sales: 100,
    },
    {
        title: "Fresh Strawberries",
        description: "Sweet and juicy strawberries freshly picked from farms.",
        image: ["https://example.com/images/strawberries1.jpg"],
        category: "Fruits",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 250,
                    size: "Small Pack",
                    stock: 70,
                    price: {
                        mrp: 120,
                        sellingPrice: 100,
                    },
                },
            },
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Large Pack",
                    stock: 40,
                    price: {
                        mrp: 250,
                        sellingPrice: 230,
                    },
                },
            },
        ],
        reviews: [],
        label: "trending",
        tag: ["fruits", "strawberries", "fresh"],
        active: true,
        isDeleted: false,
        sales: 130,
    },
];

export default dummyProducts;

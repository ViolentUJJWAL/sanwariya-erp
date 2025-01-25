const orders = [
    {
        products: [
            {
                product: {
                    title: "Marble Shivling",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 500,
                        color: "White",
                        size: "Medium",
                    },
                    stock: 30,
                    price: {
                        mrp: 2500,
                        sellingPrice: 2200,
                    },
                },
                quantity: 1,
                totalPrice: 2200,
            },
            {
                product: {
                    title: "Rudraksha Mala",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 100,
                        color: "Brown",
                        size: "108 Beads",
                    },
                    stock: 100,
                    price: {
                        mrp: 800,
                        sellingPrice: 700,
                    },
                },
                quantity: 4,
                totalPrice: 2800,
            }
        ],
        user: {
            name: "Aarav Mehta",
            email: "aarav.mehta@example.com",
            phone: "9998877665",
        },
        address: {
            flatNo: "201",
            street: "Lakshmi Nagar",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India",
            category: "home",
        },
        totalAmount: 2900,
        estimatedDeliveryDate: new Date("2025-02-05"),
        description: "Order for a marble Shivling for rituals.",
        status: "pending",
        payment: {
            status: "successful",
            method: "UPI",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Warehouse",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Brass Kalash",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 750,
                        color: "Golden",
                        size: "Large",
                    },
                    stock: 50,
                    price: {
                        mrp: 1500,
                        sellingPrice: 1350,
                    },
                },
                quantity: 2,
                totalPrice: 2700,
            },
        ],
        user: {
            name: "Sanya Gupta",
            email: "sanya.gupta@example.com",
            phone: "9876543210",
        },
        address: {
            flatNo: "502",
            street: "Vivekananda Road",
            city: "Kolkata",
            state: "West Bengal",
            pincode: "700001",
            country: "India",
            category: "home",
        },
        totalAmount: 2700,
        estimatedDeliveryDate: new Date("2025-02-10"),
        description: "Order for two brass Kalash for rituals.",
        status: "dispatch",
        payment: {
            status: "pending",
            method: "Credit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "In Transit",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Copper Panchpatra Set",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1200,
                        color: "Copper",
                        size: "Standard",
                    },
                    stock: 40,
                    price: {
                        mrp: 2000,
                        sellingPrice: 1800,
                    },
                },
                quantity: 3,
                totalPrice: 5400,
            },
        ],
        user: {
            name: "Vikram Sharma",
            email: "vikram.sharma@example.com",
            phone: "9123456780",
        },
        address: {
            flatNo: "10",
            street: "Rajaji Salai",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "600001",
            country: "India",
            category: "work",
        },
        totalAmount: 5400,
        estimatedDeliveryDate: new Date("2025-02-15"),
        description: "Order for copper Panchpatra sets.",
        status: "delivered",
        payment: {
            status: "successful",
            method: "Net Banking",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Delivered",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Rudraksha Mala",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 100,
                        color: "Brown",
                        size: "108 Beads",
                    },
                    stock: 100,
                    price: {
                        mrp: 800,
                        sellingPrice: 700,
                    },
                },
                quantity: 4,
                totalPrice: 2800,
            },
        ],
        user: {
            name: "Priya Desai",
            email: "priya.desai@example.com",
            phone: "9123345567",
        },
        address: {
            flatNo: "18A",
            street: "MG Road",
            city: "Pune",
            state: "Maharashtra",
            pincode: "411001",
            country: "India",
            category: "home",
        },
        totalAmount: 2800,
        estimatedDeliveryDate: new Date("2025-02-20"),
        description: "Order for Rudraksha malas.",
        status: "pending",
        payment: {
            status: "successful",
            method: "Debit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Awaiting Dispatch",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Marble Shivling",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 500,
                        color: "White",
                        size: "Medium",
                    },
                    stock: 30,
                    price: {
                        mrp: 2500,
                        sellingPrice: 2200,
                    },
                },
                quantity: 1,
                totalPrice: 2200,
            },
        ],
        user: {
            name: "Aarav Mehta",
            email: "aarav.mehta@example.com",
            phone: "9998877665",
        },
        address: {
            flatNo: "201",
            street: "Lakshmi Nagar",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India",
            category: "home",
        },
        totalAmount: 2200,
        estimatedDeliveryDate: new Date("2025-02-05"),
        description: "Order for a marble Shivling for rituals.",
        status: "pending",
        payment: {
            status: "successful",
            method: "UPI",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Warehouse",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Brass Kalash",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 750,
                        color: "Golden",
                        size: "Large",
                    },
                    stock: 50,
                    price: {
                        mrp: 1500,
                        sellingPrice: 1350,
                    },
                },
                quantity: 2,
                totalPrice: 2700,
            },
        ],
        user: {
            name: "Sanya Gupta",
            email: "sanya.gupta@example.com",
            phone: "9876543210",
        },
        address: {
            flatNo: "502",
            street: "Vivekananda Road",
            city: "Kolkata",
            state: "West Bengal",
            pincode: "700001",
            country: "India",
            category: "home",
        },
        totalAmount: 2700,
        estimatedDeliveryDate: new Date("2025-02-10"),
        description: "Order for two brass Kalash for rituals.",
        status: "dispatch",
        payment: {
            status: "pending",
            method: "Credit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "In Transit",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Copper Panchpatra Set",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1200,
                        color: "Copper",
                        size: "Standard",
                    },
                    stock: 40,
                    price: {
                        mrp: 2000,
                        sellingPrice: 1800,
                    },
                },
                quantity: 3,
                totalPrice: 5400,
            },
        ],
        user: {
            name: "Vikram Sharma",
            email: "vikram.sharma@example.com",
            phone: "9123456780",
        },
        address: {
            flatNo: "10",
            street: "Rajaji Salai",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "600001",
            country: "India",
            category: "work",
        },
        totalAmount: 5400,
        estimatedDeliveryDate: new Date("2025-02-15"),
        description: "Order for copper Panchpatra sets.",
        status: "delivered",
        payment: {
            status: "successful",
            method: "Net Banking",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Delivered",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Rudraksha Mala",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 100,
                        color: "Brown",
                        size: "108 Beads",
                    },
                    stock: 100,
                    price: {
                        mrp: 800,
                        sellingPrice: 700,
                    },
                },
                quantity: 4,
                totalPrice: 2800,
            },
        ],
        user: {
            name: "Priya Desai",
            email: "priya.desai@example.com",
            phone: "9123345567",
        },
        address: {
            flatNo: "18A",
            street: "MG Road",
            city: "Pune",
            state: "Maharashtra",
            pincode: "411001",
            country: "India",
            category: "home",
        },
        totalAmount: 2800,
        estimatedDeliveryDate: new Date("2025-02-20"),
        description: "Order for Rudraksha malas.",
        status: "pending",
        payment: {
            status: "successful",
            method: "Debit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Awaiting Dispatch",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Silver Puja Thali Set",
                    category: "Hindu Ritual Items",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1500,
                        color: "Silver",
                        size: "Large",
                    },
                    stock: 20,
                    price: {
                        mrp: 4500,
                        sellingPrice: 4000,
                    },
                },
                quantity: 1,
                totalPrice: 4000,
            },
        ],
        user: {
            name: "Kunal Verma",
            email: "kunal.verma@example.com",
            phone: "9995566778",
        },
        address: {
            flatNo: "3B",
            street: "Marine Drive",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400002",
            country: "India",
            category: "home",
        },
        totalAmount: 4000,
        estimatedDeliveryDate: new Date("2025-02-25"),
        description: "Order for a silver Puja Thali set.",
        status: "dispatched",
        payment: {
            status: "successful",
            method: "UPI",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Out for Delivery",
        },
    }
];

export default orders;

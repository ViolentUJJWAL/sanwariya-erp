const orders = [
    {
        products: [
            {
                product: {
                    title: "Wireless Mouse",
                    category: "Electronics",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 150,
                        color: "Black",
                        size: "Medium",
                    },
                    stock: 50,
                    price: {
                        mrp: 1500,
                        sellingPrice: 1200,
                    },
                },
                quantity: 2,
                totalPrice: 2400,
            },
        ],
        user: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
        },
        address: {
            flatNo: "101",
            street: "Baker Street",
            city: "London",
            state: "London",
            pincode: "NW16XE",
            country: "UK",
            category: "home",
        },
        totalAmount: 2400,
        estimatedDeliveryDate: new Date("2025-02-01"),
        description: "Order for a wireless mouse.",
        status: "pending",
        payment: {
            status: "successful",
            method: "Credit Card",
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
                    title: "Bluetooth Headphones",
                    category: "Electronics",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 300,
                        color: "Red",
                        size: "Adjustable",
                    },
                    stock: 30,
                    price: {
                        mrp: 2500,
                        sellingPrice: 2000,
                    },
                },
                quantity: 1,
                totalPrice: 2000,
            },
        ],
        user: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "9876543210",
        },
        address: {
            flatNo: "202",
            street: "Highland Avenue",
            city: "New York",
            state: "NY",
            pincode: "10005",
            country: "USA",
            category: "work",
        },
        totalAmount: 2000,
        estimatedDeliveryDate: new Date("2025-01-30"),
        description: "Order for Bluetooth headphones.",
        status: "dispatch",
        payment: {
            status: "pending",
            method: "PayPal",
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
                    title: "Smartphone Case",
                    category: "Accessories",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 200,
                        color: "Blue",
                        size: "Large",
                    },
                    stock: 100,
                    price: {
                        mrp: 500,
                        sellingPrice: 400,
                    },
                },
                quantity: 3,
                totalPrice: 1200,
            },
        ],
        user: {
            name: "Emily Johnson",
            email: "emily.johnson@example.com",
            phone: "1122334455",
        },
        address: {
            flatNo: "303",
            street: "Lake Road",
            city: "Toronto",
            state: "ON",
            pincode: "M5H2N2",
            country: "Canada",
            category: "home",
        },
        totalAmount: 1200,
        estimatedDeliveryDate: new Date("2025-02-02"),
        description: "Order for smartphone cases.",
        status: "delivered",
        payment: {
            status: "failed",
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
                    title: "Laptop Stand",
                    category: "Office Supplies",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1200,
                        color: "Silver",
                        size: "Adjustable",
                    },
                    stock: 20,
                    price: {
                        mrp: 3000,
                        sellingPrice: 2500,
                    },
                },
                quantity: 1,
                totalPrice: 2500,
            },
        ],
        user: {
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "5566778899",
        },
        address: {
            flatNo: "404",
            street: "Pine Street",
            city: "Los Angeles",
            state: "CA",
            pincode: "90001",
            country: "USA",
            category: "other",
        },
        totalAmount: 2500,
        estimatedDeliveryDate: new Date("2025-02-03"),
        description: "Order for a laptop stand.",
        status: "cancel",
        payment: {
            status: "successful",
            method: "UPI",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Canceled",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Gaming Keyboard",
                    category: "Electronics",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 800,
                        color: "RGB",
                        size: "Standard",
                    },
                    stock: 10,
                    price: {
                        mrp: 7000,
                        sellingPrice: 6500,
                    },
                },
                quantity: 1,
                totalPrice: 6500,
            },
        ],
        user: {
            name: "Sophia Davis",
            email: "sophia.davis@example.com",
            phone: "6677889900",
        },
        address: {
            flatNo: "505",
            street: "Cedar Road",
            city: "Chicago",
            state: "IL",
            pincode: "60601",
            country: "USA",
            category: "home",
        },
        totalAmount: 6500,
        estimatedDeliveryDate: new Date("2025-02-05"),
        description: "Order for a gaming keyboard.",
        status: "pending",
        payment: {
            status: "successful",
            method: "Debit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Packing",
        },
    },
    {
        products: [
            {
                product: {
                    title: "4K LED TV",
                    category: "Electronics",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 20000,
                        color: "Black",
                        size: "55 inches",
                    },
                    stock: 15,
                    price: {
                        mrp: 55000,
                        sellingPrice: 48000,
                    },
                },
                quantity: 1,
                totalPrice: 48000,
            },
        ],
        user: {
            name: "Olivia Williams",
            email: "olivia.williams@example.com",
            phone: "9998887770",
        },
        address: {
            flatNo: "601",
            street: "Maple Avenue",
            city: "San Francisco",
            state: "CA",
            pincode: "94102",
            country: "USA",
            category: "home",
        },
        totalAmount: 48000,
        estimatedDeliveryDate: new Date("2025-02-07"),
        description: "Order for a 55-inch 4K LED TV.",
        status: "dispatch",
        payment: {
            status: "successful",
            method: "EMI - Credit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Shipped",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Running Shoes",
                    category: "Sportswear",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1200,
                        color: "Gray",
                        size: "42 (EU)",
                    },
                    stock: 50,
                    price: {
                        mrp: 3000,
                        sellingPrice: 2500,
                    },
                },
                quantity: 2,
                totalPrice: 5000,
            },
        ],
        user: {
            name: "James Taylor",
            email: "james.taylor@example.com",
            phone: "9988776655",
        },
        address: {
            flatNo: "702",
            street: "Elm Street",
            city: "Miami",
            state: "FL",
            pincode: "33101",
            country: "USA",
            category: "home",
        },
        totalAmount: 5000,
        estimatedDeliveryDate: new Date("2025-02-10"),
        description: "Order for a pair of running shoes.",
        status: "pending",
        payment: {
            status: "successful",
            method: "PayPal",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Processing",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Office Chair",
                    category: "Furniture",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 15000,
                        color: "Brown",
                        size: "Adjustable",
                    },
                    stock: 25,
                    price: {
                        mrp: 12000,
                        sellingPrice: 10500,
                    },
                },
                quantity: 1,
                totalPrice: 10500,
            },
        ],
        user: {
            name: "Amelia Brown",
            email: "amelia.brown@example.com",
            phone: "9876543212",
        },
        address: {
            flatNo: "803",
            street: "Riverwalk",
            city: "Seattle",
            state: "WA",
            pincode: "98101",
            country: "USA",
            category: "work",
        },
        totalAmount: 10500,
        estimatedDeliveryDate: new Date("2025-02-15"),
        description: "Order for an ergonomic office chair.",
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
                    title: "Smartwatch",
                    category: "Wearable Technology",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 300,
                        color: "Rose Gold",
                        size: "Universal",
                    },
                    stock: 40,
                    price: {
                        mrp: 20000,
                        sellingPrice: 18000,
                    },
                },
                quantity: 1,
                totalPrice: 18000,
            },
        ],
        user: {
            name: "Isabella Moore",
            email: "isabella.moore@example.com",
            phone: "8765432190",
        },
        address: {
            flatNo: "904",
            street: "Oakwood Lane",
            city: "Austin",
            state: "TX",
            pincode: "73301",
            country: "USA",
            category: "other",
        },
        totalAmount: 18000,
        estimatedDeliveryDate: new Date("2025-02-20"),
        description: "Order for a smartwatch with health tracking features.",
        status: "cancel",
        payment: {
            status: "failed",
            method: "UPI",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Order Canceled",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Electric Kettle",
                    category: "Kitchen Appliances",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 1500,
                        color: "White",
                        size: "1.5 L",
                    },
                    stock: 80,
                    price: {
                        mrp: 2500,
                        sellingPrice: 2200,
                    },
                },
                quantity: 2,
                totalPrice: 4400,
            },
        ],
        user: {
            name: "Ethan Johnson",
            email: "ethan.johnson@example.com",
            phone: "7654321980",
        },
        address: {
            flatNo: "1001",
            street: "Cedar Valley",
            city: "Phoenix",
            state: "AZ",
            pincode: "85001",
            country: "USA",
            category: "home",
        },
        totalAmount: 4400,
        estimatedDeliveryDate: new Date("2025-02-25"),
        description: "Order for electric kettles.",
        status: "dispatch",
        payment: {
            status: "successful",
            method: "Debit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Out for Delivery",
        },
    },
    {
        products: [
            {
                product: {
                    title: "Yoga Mat",
                    category: "Fitness",
                },
                productVariety: {
                    additionalDesc: {
                        weightInGrams: 2500,
                        color: "Purple",
                        size: "Standard",
                    },
                    stock: 100,
                    price: {
                        mrp: 2000,
                        sellingPrice: 1800,
                    },
                },
                quantity: 5,
                totalPrice: 9000,
            },
        ],
        user: {
            name: "Charlotte Harris",
            email: "charlotte.harris@example.com",
            phone: "9876544321",
        },
        address: {
            flatNo: "1102",
            street: "Hillcrest Drive",
            city: "Dallas",
            state: "TX",
            pincode: "75201",
            country: "USA",
            category: "home",
        },
        totalAmount: 9000,
        estimatedDeliveryDate: new Date("2025-03-01"),
        description: "Order for yoga mats in bulk.",
        status: "pending",
        payment: {
            status: "successful",
            method: "Credit Card",
        },
        orderTrack: {
            dateAndTime: new Date(),
            location: "Awaiting Dispatch",
        },
    },
];

export default orders;

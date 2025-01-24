const dummyUsers = [
  {
    phoneNo: "9876543210",
    email: "john.doe@example.com",
    password: "hashed_password_1",
    fullName: {
      firstName: "John",
      lastName: "Doe",
    },
    wishlist: [, ],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8570",
        quantity: 2,
        price: 50,
      },
      {
        productId: "64caaa5f4f1c9b00274b8571",
        quantity: 1,
        price: 30,
      },
    ],
    totalOrders: 2,
    totalAmount: 130, // 2*50 + 1*30
    address: [
      {
        street: "123 Main St",
        flatNo: "12A",
        city: "Springfield",
        pincode: "123456",
        state: "Illinois",
        category: "home",
      },
    ],
  },
  {
    phoneNo: "8765432109",
    email: "jane.smith@example.com",
    password: "hashed_password_2",
    fullName: {
      firstName: "Jane",
      lastName: "Smith",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8572",
        quantity: 3,
        price: 20,
      },
    ],
    totalOrders: 1,
    totalAmount: 60, // 3*20
    address: [
      {
        street: "456 Maple Rd",
        flatNo: "22B",
        city: "Shelbyville",
        pincode: "654321",
        state: "Indiana",
        category: "work",
      },
    ],
  },
  {
    phoneNo: "7654321098",
    email: "alice.brown@example.com",
    password: "hashed_password_3",
    fullName: {
      firstName: "Alice",
      lastName: "Brown",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8572",
        quantity: 5,
        price: 10,
      },
    ],
    totalOrders: 1,
    totalAmount: 50, // 5*10
    address: [
      {
        street: "789 Oak St",
        flatNo: "3C",
        city: "Capitol City",
        pincode: "987654",
        state: "Ohio",
        category: "other",
      },
    ],
  },
  {
    phoneNo: "6543210987",
    email: "bob.williams@example.com",
    password: "hashed_password_4",
    fullName: {
      firstName: "Bob",
      lastName: "Williams",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8570",
        quantity: 1,
        price: 100,
      },
      {
        productId: "64caaa5f4f1c9b00274b8571",
        quantity: 2,
        price: 50,
      },
    ],
    totalOrders: 2,
    totalAmount: 200, // 1*100 + 2*50
    address: [
      {
        street: "321 Pine St",
        flatNo: "45D",
        city: "Monroe",
        pincode: "112233",
        state: "Texas",
        category: "home",
      },
      {
        street: "321 Pine St",
        flatNo: "45D",
        city: "Monroe",
        pincode: "112233",
        state: "Texas",
        category: "work",
      },
    ],
  },
  {
    phoneNo: "5432109876",
    email: "charlie.johnson@example.com",
    password: "hashed_password_5",
    fullName: {
      firstName: "Charlie",
      lastName: "Johnson",
    },
    wishlist: [, ],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8571",
        quantity: 4,
        price: 15,
      },
    ],
    totalOrders: 1,
    totalAmount: 60, // 4*15
    address: [
      {
        street: "654 Elm St",
        flatNo: "89E",
        city: "Jefferson",
        pincode: "334455",
        state: "Florida",
        category: "home",
      },
    ],
  },
  {
    phoneNo: "4321098765",
    email: "daisy.miller@example.com",
    password: "hashed_password_6",
    fullName: {
      firstName: "Daisy",
      lastName: "Miller",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8570",
        quantity: 6,
        price: 12,
      },
    ],
    totalOrders: 1,
    totalAmount: 72, // 6*12
    address: [
      {
        street: "789 Birch St",
        flatNo: "67F",
        city: "Cedar Rapids",
        pincode: "667788",
        state: "Iowa",
        category: "work",
      },
    ],
  },
  {
    phoneNo: "3210987654",
    email: "emma.davis@example.com",
    password: "hashed_password_7",
    fullName: {
      firstName: "Emma",
      lastName: "Davis",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8570",
        quantity: 2,
        price: 25,
      },
      {
        productId: "64caaa5f4f1c9b00274b8571",
        quantity: 3,
        price: 15,
      },
    ],
    totalOrders: 2,
    totalAmount: 95, // 2*25 + 3*15
    address: [
      {
        street: "123 Cedar St",
        flatNo: "23G",
        city: "Davenport",
        pincode: "778899",
        state: "Nebraska",
        category: "home",
      },
    ],
  },
  {
    phoneNo: "2109876543",
    email: "frank.thomas@example.com",
    password: "hashed_password_8",
    fullName: {
      firstName: "Frank",
      lastName: "Thomas",
    },
    wishlist: [, ],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8572",
        quantity: 7,
        price: 20,
      },
    ],
    totalOrders: 1,
    totalAmount: 140, // 7*20
    address: [
      {
        street: "987 Aspen St",
        flatNo: "99H",
        city: "Boulder",
        pincode: "889900",
        state: "Colorado",
        category: "home",
      },
    ],
  },
  {
    phoneNo: "1098765432",
    email: "grace.lee@example.com",
    password: "hashed_password_9",
    fullName: {
      firstName: "Grace",
      lastName: "Lee",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8572",
        quantity: 1,
        price: 45,
      },
    ],
    totalOrders: 1,
    totalAmount: 45, // 1*45
    address: [
      {
        street: "456 Spruce St",
        flatNo: "45I",
        city: "Denver",
        pincode: "990011",
        state: "Colorado",
        category: "work",
      },
    ],
  },
  {
    phoneNo: "0987654321",
    email: "henry.wilson@example.com",
    password: "hashed_password_10",
    fullName: {
      firstName: "Henry",
      lastName: "Wilson",
    },
    wishlist: [],
    cart: [
      {
        productId: "64caaa5f4f1c9b00274b8570",
        quantity: 8,
        price: 12,
      },
    ],
    totalOrders: 1,
    totalAmount: 96, // 8*12
    address: [
      {
        street: "321 Redwood St",
        flatNo: "78J",
        city: "Aspen",
        pincode: "556677",
        state: "Colorado",
        category: "other",
      },
    ],
  },
];

export default dummyUsers;

const dummyProducts = [
    {
        title: "Marble Shivling",
        description: "A sacred Shivling crafted from pure white marble, ideal for daily prayers and rituals.",
        image: [
            "https://rukminim2.flixcart.com/image/850/1000/kmns7m80/sticker/b/b/o/medium-lord-shiva-shivling-religious-god-wall-sticker-52-ms-wst-original-imagfguyq52bvgaw.jpeg?q=20&crop=false",
            "https://upload.wikimedia.org/wikipedia/commons/f/fd/Shiv_lingam_Tripundra.jpg",
        ],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Marble",
                    weightInGrams: 500,
                    size: "Small",
                },
                stock: 20,
                price: {
                    mrp: 1000,
                    sellingPrice: 900,
                },

            },
            {
                additionalDesc: {
                    material: "Marble",
                    weightInGrams: 1000,
                    size: "Medium",
                },
                stock: 15,
                price: {
                    mrp: 2000,
                    sellingPrice: 1800,
                },

            },
        ],
        reviews: [],
        label: "sacred",
        tag: ["shivling", "marble", "hindu rituals", "prayer"],
        active: true,
        isDeleted: false,
        sales: 50,
    },
    {
        title: "Copper Kalash Set",
        description: "A complete set of copper Kalash for pooja and rituals, including a coconut holder.",
        image: ["https://c8.alamy.com/comp/ENK9CG/pooja-kalash-with-om-symbol-ENK9CG.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Copper",
                    size: "Small Set",
                },
                stock: 30,
                price: {
                    mrp: 800,
                    sellingPrice: 750,
                },
            },
            {
                additionalDesc: {
                    material: "Copper",
                    size: "Large Set",
                },
                stock: 20,
                price: {
                    mrp: 1500,
                    sellingPrice: 1400,

                },
            },
        ],
        reviews: [],
        label: "best seller",
        tag: ["kalash", "copper", "hindu rituals", "pooja"],
        active: true,
        isDeleted: false,
        sales: 70,
    },
    {
        title: "Havan Samagri",
        description: "A premium havan samagri pack for all kinds of poojas and yagnas. Includes all necessary items.",
        image: ["https://m.media-amazon.com/images/I/71BWEH94BCL.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    weightInGrams: 250,
                    size: "Standard Pack",
                },
                stock: 50,
                price: {
                    mrp: 300,
                    sellingPrice: 280,

                },
            },
            {
                additionalDesc: {
                    weightInGrams: 500,
                    size: "Large Pack",
                },
                stock: 40,
                price: {
                    mrp: 500,
                    sellingPrice: 450,
                },
            },
        ],
        reviews: [],
        label: "trending",
        tag: ["havan", "samagri", "rituals", "pooja"],
        active: true,
        isDeleted: false,
        sales: 100,
    },
    {
        title: "Brass Diya Set",
        description: "Beautifully crafted brass diyas for lighting during poojas and festivals.",
        image: ["https://antiqdecor.in/cdn/shop/files/Shankuchakradeepambrassbigsizedita_deepalu_1.5kgset_Brassdiyapujaroom1.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Brass",
                    size: "Set of 5",
                },
                stock: 40,
                price: {
                    mrp: 700,
                    sellingPrice: 650,

                },
            },
        ],
        reviews: [],
        label: "sacred",
        tag: ["diya", "brass", "hindu rituals", "lighting"],
        active: true,
        isDeleted: false,
        sales: 60,
    },
    {
        title: "Sandalwood Incense Sticks",
        description: "Premium quality sandalwood incense sticks for a serene and fragrant atmosphere.",
        image: ["https://m.media-amazon.com/images/I/81puYfV4SZL.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    quantity: 50,
                    size: "Standard Box",
                },
                stock: 100,
                price: {
                    mrp: 200,
                    sellingPrice: 180,

                },
            },
        ],
        reviews: [],
        label: "aromatic",
        tag: ["incense", "sandalwood", "hindu rituals", "fragrance"],
        active: true,
        isDeleted: false,
        sales: 120,
    },
    {
        title: "Tulsi Mala",
        description: "Sacred Tulsi mala for meditation, prayer, and spiritual practice.",
        image: ["https://i.etsystatic.com/18808467/r/il/1982b9/4326008809/il_570xN.4326008809_iqm4.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Tulsi Wood",
                    size: "Standard",
                },
                stock: 70,
                price: {
                    mrp: 150,
                    sellingPrice: 130,

                },
            },
        ],
        reviews: [],
        label: "spiritual",
        tag: ["tulsi", "mala", "prayer", "meditation"],
        active: true,
        isDeleted: false,
        sales: 90,
    },
    {
        title: "Chandan Tika",
        description: "High-quality chandan tika for forehead application during poojas.",
        image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ1zF7nt-eYgyecMHoVqWzhFTNJX3i-m4DCQ&s"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    weightInGrams: 50,
                    size: "Small Box",
                },
                stock: 50,
                price: {
                    mrp: 300,
                    sellingPrice: 250,

                },
            },
        ],
        reviews: [],
        label: "traditional",
        tag: ["chandan", "tika", "hindu rituals", "prayer"],
        active: true,
        isDeleted: false,
        sales: 80,
    },
    {
        title: "Panchapatra Set",
        description: "Stainless steel Panchapatra set for storing holy water during poojas.",
        image: ["https://m.media-amazon.com/images/I/91kZuiDWYXL._AC_UF894,1000_QL80_.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Stainless Steel",
                    size: "Standard",
                },
                stock: 30,
                price: {
                    mrp: 600,
                    sellingPrice: 550,

                },
            },
        ],
        reviews: [],
        label: "traditional",
        tag: ["panchapatra", "steel", "hindu rituals", "pooja"],
        active: true,
        isDeleted: false,
        sales: 45,
    },
    {
        title: "Camphor Tablets",
        description: "Pure and natural camphor tablets for aarati and rituals.",
        image: ["https://www.jiomart.com/images/product/original/494249424/shakti-camphor-tablets-kapur-100-gms-product-images-o494249424-p605499471-4-202310181219.jpg"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    weightInGrams: 100,
                    size: "Standard Pack",
                },
                stock: 100,
                price: {
                    mrp: 250,
                    sellingPrice: 230,

                },
            },
        ],
        reviews: [],
        label: "fragrant",
        tag: ["camphor", "aarati", "hindu rituals", "pooja"],
        active: true,
        isDeleted: false,
        sales: 110,
    },
    {
        title: "Pooja Bell",
        description: "Brass pooja bell with a clear and melodious sound for rituals.",
        image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpCBhcgAJX7WVeMiZaRB18RURx_2wKgRGSg&s"],
        category: "Hindu Rituals",
        variety: [
            {
                additionalDesc: {
                    material: "Brass",
                    size: "Standard",
                },
                stock: 40,
                price: {
                    mrp: 500,
                    sellingPrice: 450,

                },
            },
        ],
        reviews: [],
        label: "essential",
        tag: ["bell", "brass", "hindu rituals", "pooja"],
        active: true,
        isDeleted: false,
        sales: 75,
    },
];

export default dummyProducts;

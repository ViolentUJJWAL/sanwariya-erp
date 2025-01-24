import React, { useState } from 'react';
import {
    Edit, Trash2, ToggleLeft, ToggleRight, Star,
    AlertTriangle, XCircle, Plus, Tag, ImagePlus, X, Trash2 as TrashIcon,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const ProductDetailsPage = () => {
    const [product, setProduct] = useState({
        title: "Vanilla Ice Cream",
        description: "Creamy vanilla ice cream made with real vanilla beans.",
        images: ["https://i.pinimg.com/564x/f0/65/e4/f065e46e983f2fee9d8acff7977f6ec4.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUdbkvIbm8d5Qb0QmA5iX6HxwhgGLhb8asiA&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdX0I_E8qkD1OqJsNMALLDd7QjMPii0lKM2Q&s", "https://shivamvastukala.com/wp-content/uploads/2022/09/IMG20220826155029-scaled.jpg"],
        category: "Desserts",
        variety: [
            {
                additionalDesc: {
                    weigthInGrams: 500,
                    size: "Tub",
                },
                stock: 30,
                price: {
                    mrp: 400,
                    sellingPrice: 350,
                },

            },
            {
                additionalDesc: {
                    weigthInGrams: 1000,
                    size: "Family Pack",
                },
                stock: 20,
                price: {
                    mrp: 700,
                    sellingPrice: 650,
                },
            },
        ],
        reviews: [
            {
                user: "Alice Johnson",
                rating: 4,
                comment: "Delicious and creamy!"
            },
            {
                user: "Bob Smith",
                rating: 5,
                comment: "Best vanilla ice cream ever!"
            }
        ],
        tag: ["ice cream", "vanilla", "dessert"],
        active: true,
        isDeleted: false,
        sales: 120,
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeStatus, setActiveStatus] = useState(product.active);

    // State for editing form (similar to AddProductPage)
    const [editTitle, setEditTitle] = useState(product.title);
    const [editDescription, setEditDescription] = useState(product.description);
    const [editCategory, setEditCategory] = useState(product.category);
    const [editLabel, setEditLabel] = useState(product.label);
    const [editImages, setEditImages] = useState(product.images);
    const [editTags, setEditTags] = useState(product.tag);
    const [editCurrentTag, setEditCurrentTag] = useState('');
    const [editVarieties, setEditVarieties] = useState(product.variety);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.slice(0, 8 - editImages.length);

        const imagePromises = newImages.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });
        Promise.all(imagePromises).then(base64Images => {
            setEditImages(prev => [...prev, ...base64Images]);
        });
    };

    const removeImage = (index) => {
        setEditImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleTagInput = (e) => {
        const value = e.target.value;
        if (value.endsWith(' ') && editCurrentTag.trim()) {
            setEditTags(prev => [...prev, editCurrentTag.trim()]);
            setEditCurrentTag('');
        } else {
            setEditCurrentTag(value);
        }
    };

    const removeTag = (index) => {
        setEditTags(prev => prev.filter((_, i) => i !== index));
    };

    const addVariety = () => {
        setEditVarieties(prev => [...prev, {
            additionalDesc: {
                weightInGrams: '',
                color: '',
                size: ''
            },
            stock: '',
            price: {
                mrp: '',
                sellingPrice: ''
            }
        }]);
    };

    const updateVariety = (index, field, value) => {
        const newVarieties = [...editVarieties];
        const keys = field.split('.');
        if (keys.length === 1) {
            newVarieties[index][field] = value;
        } else {
            newVarieties[index][keys[0]][keys[1]] = value;
        }
        setEditVarieties(newVarieties);
    };

    const removeVariety = (index) => {
        setEditVarieties(prev => prev.filter((_, i) => i !== index));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...product,
            title: editTitle,
            description: editDescription,
            category: editCategory,
            label: editLabel,
            image: editImages,
            tags: editTags,
            variety: editVarieties
        };
        setProduct(updatedProduct);
        setIsEditing(false);
    };

    const handleToggleActive = () => {
        setActiveStatus(!activeStatus);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            (prev + 1) % product.images.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            (prev - 1 + product.images.length) % product.images.length
        );
    };

    const ImageSlider = () => {
        return (
            <div className="relative w-full h-96">
                {/* Main Image */}
                <img
                    src={product?.images[currentImageIndex]}
                    alt={`${product.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                />

                {/* Navigation Buttons */}
                {product.images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${index === currentImageIndex
                                ? 'bg-orange-600'
                                : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderEditModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white mt-96 w-full mx-4 my-8 p-10 rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-orange-600">Edit Product</h2>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-6">
                    {/* Basic Product Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Product Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                            required
                        />
                        <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="Desserts">Desserts</option>
                            <option value="home">Home</option>
                            <option value="desserts">Desserts</option>
                        </select>
                    </div>

                    <textarea
                        placeholder="Product Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                        rows={4}
                        required
                    />

                    <select
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                        required
                    >
                        <option value="">Select Label</option>
                        <option value="best seller">Best Seller</option>
                        <option value="people's choice">People's Choice</option>
                        <option value="trending">Trending</option>
                    </select>

                    {/* Image Upload */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <ImagePlus className="text-orange-600" />
                            <label className="text-orange-600">Upload Images (Max 8)</label>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {editImages?.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            {editImages?.length < 8 && (
                                <label className="cursor-pointer">
                                    <div className="w-24 h-24 border-2 border-dashed border-orange-500 flex items-center justify-center rounded">
                                        <Plus className="text-orange-700" />
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Tag className="text-orange-600" />
                            <label className="text-orange-600">Add Tags</label>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <input
                                type="text"
                                value={editCurrentTag}
                                onChange={handleTagInput}
                                placeholder="Type tag and press space"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                            />
                            {editTags?.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-orange-100 px-2 py-1 rounded flex items-center gap-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Varieties */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Plus className="text-orange-600" />
                                <label className="text-orange-600">Product Varieties</label>
                            </div>
                            <button
                                type="button"
                                onClick={addVariety}
                                className="bg-orange-500 text-white px-3 py-1 rounded flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Variety
                            </button>
                        </div>

                        {editVarieties?.map((variety, index) => (
                            <div
                                key={index}
                                className="bg-orange-50 border border-orange-200 p-4 rounded mb-4 relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeVariety(index)}
                                    className="absolute top-2 right-2 text-red-500"
                                >
                                    <TrashIcon size={20} />
                                </button>
                                <div className="grid md:grid-cols-3 gap-4 mr-4">
                                    <input
                                        type="number"
                                        placeholder="Weight (grams)"
                                        value={variety.additionalDesc.weigthInGrams}
                                        onChange={(e) => updateVariety(index, 'additionalDesc.weightInGrams', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Color"
                                        value={variety.additionalDesc.color}
                                        onChange={(e) => updateVariety(index, 'additionalDesc.color', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Size"
                                        value={variety.additionalDesc.size}
                                        onChange={(e) => updateVariety(index, 'additionalDesc.size', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        value={variety.stock}
                                        onChange={(e) => updateVariety(index, 'stock', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                    <input
                                        type="number"
                                        placeholder="MRP"
                                        value={variety?.price?.mrp}
                                        onChange={(e) => updateVariety(index, 'price.mrp', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Selling Price"
                                        value={variety?.price?.sellingPrice}
                                        onChange={(e) => updateVariety(index, 'price.sellingPrice', e.target.value)}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-300"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition duration-300"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );

    const renderVarietyDetails = () => (
        <div className="bg-white shadow rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-orange-600 mb-3">Product Varieties</h3>
            {product.variety.map((variety, index) => (
                <div key={index} className="border-b pb-3 mb-3">
                    <div className="flex justify-between">
                        <span className="font-medium">{variety.additionalDesc.size}</span>
                        <span className="text-gray-600">
                            {variety.additionalDesc.weigthInGrams}g
                        </span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <div>
                            <span className="text-gray-600">MRP: ₹{variety.price.mrp}</span>
                            <span className="ml-3 text-green-600">
                                Selling Price: ₹{variety.price.sellingPrice}
                            </span>
                        </div>
                        <span className="text-orange-600">
                            Stock: {variety.stock}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderReviews = () => (
        <div className="bg-white shadow rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-orange-600">Customer Reviews</h3>
                <div className="flex items-center text-yellow-500">
                    <Star size={20} fill="currentColor" />
                    <span className="ml-2">4.5 (Average Rating)</span>
                </div>
            </div>
            {product.reviews.map((review, index) => (
                <div key={index} className="border-b pb-3 mb-3">
                    <div className="flex justify-between">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" className="text-yellow-500" />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
            ))}
        </div>
    );

    const renderDeleteConfirmation = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex items-center mb-4 text-red-600">
                    <AlertTriangle size={32} className="mr-3" />
                    <h3 className="text-xl font-bold">Delete Product</h3>
                </div>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full p-6">
            <div className="container mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h1 className="text-3xl font-bold text-orange-600">{product.title}</h1>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-orange-600 hover:bg-orange-100 p-2 rounded-full"
                            >
                                <Edit size={24} />
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                            >
                                <Trash2 size={24} />
                            </button>
                            <button
                                onClick={handleToggleActive}
                                className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                            >
                                {activeStatus ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <ImageSlider />
                        </div>
                        <div>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="flex space-x-2 mb-2">
                                {product.tag.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4">
                                <span className="text-gray-600">Category: {product.category}</span>
                                <div className="mt-2">
                                    <span className="text-gray-600">Total Sales: {product.sales}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderVarietyDetails()}
                    {renderReviews()}
                </div>

                {isEditing && renderEditModal()}
                {showDeleteConfirm && renderDeleteConfirmation()}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
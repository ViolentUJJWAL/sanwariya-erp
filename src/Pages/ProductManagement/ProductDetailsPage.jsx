import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  AlertTriangle,
  XCircle,
  Plus,
  Tag,
  ImagePlus,
  X,
  Trash2 as TrashIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit form states
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [editTags, setEditTags] = useState([]);
  const [editCurrentTag, setEditCurrentTag] = useState("");
  const [editVarieties, setEditVarieties] = useState([]);

  // Fetch product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await ProductService.getProductById(id);
        setProduct(productData.product);
        setActiveStatus(productData.product.active);
        // Initialize edit form states
        setEditTitle(productData.product.title);
        setEditDescription(productData.product.description);
        setEditCategory(productData.product.category);
        setEditLabel(productData.product.labels[0] || "");
        setEditImages(productData.product.images.map((img) => img.url));
        setEditTags(productData.product.tags);
        setEditVarieties(productData.product.variety);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 8 - editImages.length);

    const imagePromises = newImages.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(imagePromises).then((base64Images) => {
      setEditImages((prev) => [...prev, ...base64Images]);
    });
  };

  const removeImage = (index) => {
    setEditImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.endsWith(" ") && editCurrentTag.trim()) {
      setEditTags((prev) => [...prev, editCurrentTag.trim()]);
      setEditCurrentTag("");
    } else {
      setEditCurrentTag(value);
    }
  };

  const removeTag = (index) => {
    setEditTags((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariety = () => {
    setEditVarieties((prev) => [
      ...prev,
      {
        additionalDesc: { weightInGrams: "", color: "", size: "" },
        stock: "",
        price: { mrp: "", sellingPrice: "" },
      },
    ]);
  };

  const updateVariety = (index, field, value) => {
    const newVarieties = [...editVarieties];
    const keys = field.split(".");
    if (keys.length === 1) {
      newVarieties[index][field] = value;
    } else {
      newVarieties[index][keys[0]][keys[1]] = value;
    }
    setEditVarieties(newVarieties);
  };

  const removeVariety = (index) => {
    setEditVarieties((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append required fields (ensuring default values)
      formData.append("title", editTitle || product.title);
      formData.append("description", editDescription || product.description);
      formData.append("category", editCategory || product.category);

      // Append 'variety' (array of objects)
      if (editVarieties.length > 0) {
        editVarieties.forEach((variety, index) => {
          Object.keys(variety).forEach((key) => {
            if (typeof variety[key] === "object" && variety[key] !== null) {
              Object.keys(variety[key]).forEach((subKey) => {
                formData.append(
                  `variety[${index}][${key}][${subKey}]`,
                  variety[key][subKey]
                );
              });
            } else {
              formData.append(`variety[${index}][${key}]`, variety[key]);
            }
          });
        });
      }

      // Append 'labels' (array)
      if (editLabel) {
        formData.append("labels[]", editLabel);
      } else if (product.labels) {
        product.labels.forEach((label) => formData.append("labels[]", label));
      }

      // Append 'tags' (array)
      if (editTags.length > 0) {
        editTags.forEach((tag) => formData.append("tags[]", tag));
      } else if (product.tags) {
        product.tags.forEach((tag) => formData.append("tags[]", tag));
      }

      // Preserve existing images & handle new image uploads
      const newImages = editImages.filter((img) => img.startsWith("data:")); // New base64 images
      const existingImages = editImages.filter(
        (img) => !img.startsWith("data:")
      ); // Already uploaded images

      // Append existing image URLs to preserve them
      existingImages.forEach((img) => {
        formData.append("existingImages[]", img);
      });

      // Convert base64 images to blob and append them
      for (let i = 0; i < newImages.length; i++) {
        const blob = await (await fetch(newImages[i])).blob();
        formData.append("images", blob, `image-${i}.jpg`);
      }

      // Call API
      const response = await ProductService.updateProduct(id, formData);

      if (response && response.success) {
        setProduct(response.data); // Ensure correct response structure
        setIsEditing(false);
      } else {
        throw new Error(response?.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message);
    }
  };

  const handleToggleActive = async () => {
    try {
      const updatedProduct = await ProductService.updateProductStatus(id);
      setActiveStatus(updatedProduct.data.active);
      setProduct((prev) => ({ ...prev, active: updatedProduct.data.active }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(id);
      navigate("/products"); // Redirect to products list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const ImageSlider = () => (
    <div className="relative w-full h-96">
      <img
        src={product?.images[currentImageIndex]?.url}
        alt={`${product.title} - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {product.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? "bg-orange-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white w-full max-w-3xl mx-4 my-8 p-8 rounded-2xl shadow-lg transform transition-transform duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-orange-600">Edit Product</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
  
        {/* Form */}
        <form onSubmit={handleEditSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition duration-200"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="desserts">Desserts</option>
                  <option value="home">Home</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-y transition duration-200"
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <select
                id="label"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition duration-200"
                required
              >
                <option value="">Select Label</option>
                <option value="best seller">Best Seller</option>
                <option value="people's choice">People's Choice</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
  
          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <ImagePlus className="text-orange-600" size={20} />
              Product Images
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Upload up to 8 images</span>
              <span>{editImages?.length || 0}/8</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {editImages?.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 group-hover:shadow-md transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {editImages?.length < 8 && (
                <label className="cursor-pointer">
                  <div className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center bg-orange-50 hover:bg-orange-100 transition duration-200">
                    <Plus className="text-orange-600" size={24} />
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
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <Tag className="text-orange-600" size={20} />
              Tags
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                value={editCurrentTag}
                onChange={handleTagInput}
                placeholder="Type tag and press space"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
              <div className="flex flex-wrap gap-2">
                {editTags?.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Varieties */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Plus className="text-orange-600" size={20} />
                Product Varieties
              </h3>
              <button
                type="button"
                onClick={addVariety}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-200"
              >
                <Plus size={16} />
                Add Variety
              </button>
            </div>
            {editVarieties?.map((variety, index) => (
              <div
                key={index}
                className="bg-orange-50 border border-orange-200 rounded-lg p-6 relative"
              >
                <button
                  type="button"
                  onClick={() => removeVariety(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  aria-label={`Remove variety ${index + 1}`}
                >
                  <TrashIcon size={20} />
                </button>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor={`weight-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Weight (grams)
                    </label>
                    <input
                      id={`weight-${index}`}
                      type="number"
                      placeholder="Enter weight"
                      value={variety.additionalDesc.weightInGrams}
                      onChange={(e) =>
                        updateVariety(index, "additionalDesc.weightInGrams", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`color-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Color
                    </label>
                    <input
                      id={`color-${index}`}
                      type="text"
                      placeholder="Enter color"
                      value={variety.additionalDesc.color}
                      onChange={(e) =>
                        updateVariety(index, "additionalDesc.color", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`size-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Size
                    </label>
                    <input
                      id={`size-${index}`}
                      type="text"
                      placeholder="Enter size"
                      value={variety.additionalDesc.size}
                      onChange={(e) =>
                        updateVariety(index, "additionalDesc.size", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`stock-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock
                    </label>
                    <input
                      id={`stock-${index}`}
                      type="number"
                      placeholder="Enter stock"
                      value={variety.stock}
                      onChange={(e) => updateVariety(index, "stock", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`mrp-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      MRP
                    </label>
                    <input
                      id={`mrp-${index}`}
                      type="number"
                      placeholder="Enter MRP"
                      value={variety.price.mrp}
                      onChange={(e) => updateVariety(index, "price.mrp", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`sellingPrice-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Selling Price
                    </label>
                    <input
                      id={`sellingPrice-${index}`}
                      type="number"
                      placeholder="Enter selling price"
                      value={variety.price.sellingPrice}
                      onChange={(e) =>
                        updateVariety(index, "price.sellingPrice", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );

  const renderVarietyDetails = () => (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold text-orange-600 mb-3">
        Product Varieties
      </h3>
      {product.variety.map((variety, index) => (
        <div key={index} className="border-b pb-3 mb-3">
          <div className="flex justify-between">
            {variety.additionalDesc.size && (
              <span className="font-medium">{variety.additionalDesc.size}</span>
            )}
            {variety.additionalDesc.weightInGrams && (
              <span className="text-gray-600">
                {variety.additionalDesc.weightInGrams}g
              </span>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <div>
              <span className="text-gray-600">MRP: ₹{variety.price.mrp}</span>
              <span className="ml-3 text-green-600">
                Selling Price: ₹{variety.price.sellingPrice}
              </span>
            </div>
            <span className="text-orange-600">Stock: {variety.stock}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-orange-600">
          Customer Reviews
        </h3>
        <div className="flex items-center text-yellow-500">
          <Star size={20} fill="currentColor" />
          <span className="ml-2">{product.avgRating} (Average Rating)</span>
        </div>
      </div>
      {product.reviews.map((review, index) => (
        <div key={index} className="border-b pb-3 mb-3">
          <div className="flex justify-between">
            <span className="font-medium">{review.ratedBy}</span>
            <div className="flex">
              {[...Array(Math.round(review.rating))].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                  className="text-yellow-500"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-2">{review.description}</p>
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
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-center p-6">Product not found</div>;

  return (
    <div className="w-full p-6">
      <div className="container mx-auto">
      <div className="bg-gray-50 shadow-md rounded-xl p-8 transition-shadow duration-200 hover:shadow-lg">
  {/* Header */}
  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
    <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>
    <div className="flex gap-3">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-orange-600 hover:bg-orange-50 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        aria-label="Edit product"
      >
        <Edit size={28} />
      </button>
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="text-red-600 hover:bg-red-50 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
        aria-label="Delete product"
      >
        <Trash2 size={28} />
      </button>
      <button
        onClick={handleToggleActive}
        className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${
          activeStatus
            ? "text-green-600 bg-green-100 hover:bg-green-200"
            : "text-gray-600 bg-gray-100 hover:bg-gray-200"
        }`}
        aria-label={activeStatus ? "Deactivate product" : "Activate product"}
      >
        {activeStatus ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
      </button>
    </div>
  </div>

  {/* Content */}
  <div className="grid md:grid-cols-2 gap-6 mb-6">
    {/* Image Slider */}
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <ImageSlider />
    </div>

    {/* Description & Metadata */}
    <div className="space-y-4">
      <p className="text-base text-gray-800 leading-relaxed" aria-describedby="product-description">
        {product.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <svg
            className="text-orange-600"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <span className="text-gray-600">
            <span className="font-medium">Category:</span> {product.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="text-orange-600"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-600">
            <span className="font-medium">Total Sales:</span> {product.sales}
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Variety Details */}
  <div className="border-t border-gray-200 pt-6 mb-6">
    {renderVarietyDetails()}
  </div>

  {/* Reviews */}
  <div className="border-t border-gray-200 pt-6">
    {renderReviews()}
  </div>
</div>
        {isEditing && renderEditModal()}
        {showDeleteConfirm && renderDeleteConfirmation()}
      </div>
    </div>
  );
};

export default ProductDetailsPage;

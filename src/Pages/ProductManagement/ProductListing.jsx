import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/productService";

const SearchInput = ({ onSearch, loading }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleBlur = () => {
    onSearch(localSearchTerm); // Trigger search when input loses focus
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(localSearchTerm); // Trigger search on Enter key
    }
  };

  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search products..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        className="w-full p-2 pl-8 border-1 border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
        disabled={loading}
      />
      <Search className="absolute left-2 top-3 text-gray-400" size={20} />
    </div>
  );
};

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    label: "",
    active: null,
    isDeleted: null,
    minStock: 0,
    maxStock: 1000,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    console.log("gghhh");
    fetchProducts();
  }, [currentPage, filters, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        category: filters.category || undefined,
        label: filters.label || undefined,
        active: filters.active,
        isDeleted: filters.isDeleted,
        search: searchTerm || undefined, // Changed 'title' to 'search' parameter name
      };
      const response = await ProductService.getAllProducts(params);
      console.log("response.data", response.data);
      setProducts(response.data);
      setTotalPages(response.pagination.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]:
        value === ""
          ? null
          : ["active", "isDeleted"].includes(name)
          ? value === "true"
          : value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const labels = [...new Set(products.map((p) => p.labels?.[0]))];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Product Management</h1>
      <div className="flex justify-between mb-4">
  <div className="flex items-center space-x-4 w-full max-w-md">
    {/* <SearchInput onSearch={handleSearch} loading={loading} /> */}
    <button
      onClick={() => setIsFilterModalOpen(true)}
      className="text-xl ml-2 px-4 p-2 bg-orange-500 text-white rounded"
      disabled={loading}
    >
      Filters
    </button>
  </div>
  <button
    className="text-xl ml-2 px-4 p-2 bg-orange-400 hover:bg-orange-500 text-white rounded"
    onClick={() => navigate("/products/add")}
    disabled={loading}
  >
    Add Product
  </button>
</div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* {loading && <div className="text-center">Loading...</div>} */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            onClick={() => navigate(`/products/${product._id}`)}
            key={product._id}
            className="bg-white bg-opacity-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-200"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.images[0]?.url || "placeholder.jpg"}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Title and Category */}
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>
                <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Variety Info */}
              {product.variety.map((variety, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-md mb-3 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {variety.additionalDesc.size} (
                      {variety.additionalDesc.color})
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      ₹{variety.price.sellingPrice}
                      <span className="text-xs text-red-500 line-through ml-1">
                        ₹{variety.price.mrp}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Stock: {variety.stock} | </span>
                    <span>
                      Weight: {variety.additionalDesc.weightInGrams}g |{" "}
                    </span>
                    <span>Discount: {variety.price.discountPercentage}%</span>
                  </div>
                </div>
              ))}

              {/* Labels and Stats */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.labels?.length > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {product.labels[0]}
                  </span>
                )}
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  Rating: {product.avgRating} ({product.totalReviews})
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                  Sales: {product.sales}
                </span>
              </div>

              {/* Footer */}
              <div className="text-xs text-gray-400 border-t pt-2">
                <p>
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated: {new Date(product.updatedAt).toLocaleDateString()}
                </p>
                {product.isDeleted && <p className="text-red-400">Deleted</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
            disabled={loading}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <select
                name="category"
                value={filters.category || ""}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Label</label>
              <select
                name="label"
                value={filters.label || ""}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="">All Labels</option>
                {labels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Active Status</label>
              <select
                name="active"
                value={filters.active ?? ""}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Deleted Status</label>
              <select
                name="isDeleted"
                value={filters.isDeleted ?? ""}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="">All</option>
                <option value="true">Deleted</option>
                <option value="false">Not Deleted</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Stock Range</label>
              <div className="flex">
                <input
                  type="number"
                  name="minStock"
                  value={filters.minStock}
                  onChange={handleFilterChange}
                  placeholder="Min Stock"
                  className="w-1/2 p-2 border rounded mr-2"
                  disabled={loading}
                />
                <input
                  type="number"
                  name="maxStock"
                  value={filters.maxStock}
                  onChange={handleFilterChange}
                  placeholder="Max Stock"
                  className="w-1/2 p-2 border rounded"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setFilters({
                    category: "",
                    label: "",
                    active: null,
                    isDeleted: null,
                    minStock: 0,
                    maxStock: 1000,
                  });
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded"
                disabled={loading}
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-orange-500 text-white rounded"
                disabled={loading}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;

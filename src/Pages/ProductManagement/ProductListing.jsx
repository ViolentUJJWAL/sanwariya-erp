import React, { useState, useMemo } from 'react';
import dummyProducts from './dummyProducts ';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductListingPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        label: '',
        active: null,
        isDeleted: null,
        minStock: 0,
        maxStock: 1000,
    });
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filtered and Searched Products
    const filteredProducts = useMemo(() => {
        return dummyProducts.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !filters.category || product.category === filters.category;
            const matchesLabel = !filters.label || product.label === filters.label;
            const matchesActive = filters.active === null || product.active === filters.active;
            const matchesDeleted = filters.isDeleted === null || product.isDeleted === filters.isDeleted;

            const hasVarietyMeetingStockFilter = product.variety.some(variety =>
                variety.additionalDesc.stock >= filters.minStock &&
                variety.additionalDesc.stock <= filters.maxStock
            );

            return matchesSearch &&
                matchesCategory &&
                matchesLabel &&
                matchesActive &&
                matchesDeleted &&
                hasVarietyMeetingStockFilter
        });
    }, [searchTerm, filters, dummyProducts]);

    // Pagination
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Unique Categories and Labels
    const categories = [...new Set(dummyProducts.map(p => p.category))];
    const labels = [...new Set(dummyProducts.map(p => p.label))];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value === '' ? null :
                ['active', 'isDeleted'].includes(name) ? (value === 'true') :
                    value
        }));
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-4">Product Management</h1>
            <div className="flex justify-between mb-4">


                <div className="relative flex-grow w-1/2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 border-1 border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
                    />
                    <Search className="absolute left-2 top-3 text-gray-400" size={20} />
                </div>
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="text-xl ml-2 px-4 p-2 bg-orange-500 text-white rounded"
                >
                    Filters
                </button>
                <button className="text-xl ml-2 px-4 p-2 bg-orange-400 hover:bg-orange-500 text-white rounded"
                    onClick={() => navigate("/add-product")}
                >
                    Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {paginatedProducts.map(product => (
                    <div key={product.title} className="flex flex-col justify-between border p-4 rounded hover:shadow-lg hover:border-orange-500" >
                        <img
                            src={product.image[0]}
                            alt={product.title}
                            className="w-full h-48 object-cover mb-2"
                        />
                        <div>
                            <h2 className="text-xl font-bold">{product.title}</h2>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                        <div className="mt-2 reletive">
                            <span className="bg-blue-100 text-orange-600 px-2 py-1 rounded">
                                {product.category}
                            </span>
                            {product.label && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
                                {product.label}
                            </span>}
                        </div>
                        <div className="mt-2">
                            {product.variety.map((variety, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{variety.additionalDesc.size}</span>
                                    <span>{variety.additionalDesc.stock}</span>
                                    <span className="font-bold">
                                        <strike className="text-red-500">₹{variety.additionalDesc.price.mrp + 50}</strike> ₹{variety.additionalDesc.price.sellingPrice}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>

                        <div className="mb-4">
                            <label className="block mb-2">Category</label>
                            <select
                                name="category"
                                value={filters.category || ''}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Label</label>
                            <select
                                name="label"
                                value={filters.label || ''}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">All Labels</option>
                                {labels.map(label => (
                                    <option key={label} value={label}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Active Status</label>
                            <select
                                name="active"
                                value={filters.active ?? ''}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded"
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
                                value={filters.isDeleted ?? ''}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded"
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
                                />
                                <input
                                    type="number"
                                    name="maxStock"
                                    value={filters.maxStock}
                                    onChange={handleFilterChange}
                                    placeholder="Max Stock"
                                    className="w-1/2 p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    setFilters({
                                        category: '',
                                        label: '',
                                        active: null,
                                        isDeleted: null,
                                        minStock: 0,
                                        maxStock: 1000,
                                    })
                                    setIsFilterModalOpen(false)
                                }}
                                className="px-4 py-2 bg-orange-500 text-white rounded"
                            >
                                Clear Filters
                            </button>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="px-4 py-2 bg-orange-500 text-white rounded"
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
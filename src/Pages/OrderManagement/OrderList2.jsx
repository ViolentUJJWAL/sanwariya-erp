import React, { useState, useEffect } from 'react';
import { Search, Check, Clock, Package, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ordersData from "./ordersDummyData";

const CustomerInfoCard = ({ customer }) => (
    <div className="bg-orange-50 p-3 rounded-lg">
        <div className="flex justify-between">
            <div>
                <p className="font-semibold text-orange-800">{customer.name}</p>
                <p className="text-orange-600">{customer.email}</p>
                <p className="text-orange-600">{customer.phone}</p>
            </div>
        </div>
    </div>
);

const OrderPage2 = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState(ordersData);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const tabs = [
        { name: 'pending', icon: <Clock className="w-5 h-5 mr-2" /> },
        { name: 'dispatch', icon: <Package className="w-5 h-5 mr-2" /> },
        { name: 'cancel', icon: <X className="w-5 h-5 mr-2" /> },
        { name: 'delivered', icon: <Check className="w-5 h-5 mr-2" /> },
    ];

    const statusChangeOptions = {
        'pending': ['dispatch', 'cancel'],
        'dispatch': ['delivered', 'cancel'],
        'delivered': [],
        'cancel': []
    };

    const handleStatusChange = (order, newStatus) => {
        const updatedOrders = orders.map(o =>
            o === order ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);

        // Update search results if the order is in search results
        const updatedSearchResults = searchResults.map(o =>
            o === order ? { ...o, status: newStatus } : o
        );
        setSearchResults(updatedSearchResults);
    };

    useEffect(() => {
        if (searchQuery) {
            const lowercaseQuery = searchQuery.toLowerCase();
            const results = orders.filter(order =>
                order.orderId?.toLowerCase().includes(lowercaseQuery) ||
                order.user.name.toLowerCase().includes(lowercaseQuery) ||
                order.user.email.toLowerCase().includes(lowercaseQuery) ||
                order.user.phone.toLowerCase().includes(lowercaseQuery) ||
                order.products.some(p =>
                    p.product.title.toLowerCase().includes(lowercaseQuery)
                )
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, orders]);

    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status);
    };

    const renderStatusChangeButtons = (order) => {
        const availableStatuses = statusChangeOptions[order.status] || [];

        return (
            <div className="flex gap-2 mt-4">
                {availableStatuses.map(status => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(order, status)}
                        className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                        Change to {status}
                    </button>
                ))}
            </div>
        );
    };

    const renderOrderList = (ordersToRender) => {
        return ordersToRender.map((order, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-orange-50 text-black">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Order Date: {order.estimatedDeliveryDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">Status:</span>
                            <span className="font-semibold text-orange-700 uppercase">{order.status}</span>
                        </div>
                    </div>
                    <button
                        className="flex items-center border-2 border-orange-800 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-800 hover:text-white transition"
                        onClick={() => navigate(`/orders/${index}`)}
                    >
                        <Eye className="w-5 h-5 mr-2" />
                        View Details
                    </button>
                </div>

                <CustomerInfoCard customer={order.user} />

                <div className="mt-4">
                    <p className="font-semibold mb-2">Items:</p>
                    <ul className="space-y-1">
                        {order.products.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                                <span>
                                    {item.product.title} x {item.quantity}
                                </span>
                                <span>
                                    <span className='font-semibold text-orange-500'>₹</span>{item.totalPrice.toFixed(2)}
                                </span>
                            </li>
                        ))}
                        <hr className='border border-orange-300' />
                        <li className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>
                                <span className='text-orange-500'>₹</span>{order.totalAmount.toFixed(2)}
                            </span>
                        </li>
                    </ul>
                </div>

                {renderStatusChangeButtons(order)}
            </div>
        ));
    };

    return (
        <div className="container mx-auto">
            <div className="">
                <h1 className="text-4xl font-bold my-4">Order Management</h1>
                <div className="space-y-4">
                    <div className="relative mb-10">
                        <div className='flex'>
                            <input
                                type="text"
                                placeholder="Search orders by name, email, phone, product, or ID"
                                className="w-full p-3 pl-12 bg-orange-50 placeholder-orange-500 text-orange-800 rounded-xl focus:outline-none border-2 border-orange-300 focus:ring-2 focus:ring-orange-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-3.5 text-orange-500 w-5 h-5" />
                        </div>

                        {searchQuery && searchResults.length > 0 && (
                            <div className="mt-4 space-y-4">
                                <h3 className="text-orange-800 font-semibold">Search Results:</h3>
                                {renderOrderList(searchResults)}
                            </div>
                        )}

                        {searchQuery && searchResults.length === 0 && (
                            <div className="mt-4 text-orange-700">
                                No orders found matching your search.
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between bg-orange-700">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                className={`flex-1 flex items-center justify-center p-4 transition ${activeTab === tab.name
                                        ? 'text-orange-800 border-2 border-orange-700 bg-white'
                                        : 'text-white hover:bg-orange-600'
                                    }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.icon}
                                {tab.name.toUpperCase()}
                                <span className="ml-2 bg-orange-200 px-2 py-1 rounded-full text-sm text-black">
                                    {getOrdersByStatus(tab.name).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="p-6 space-y-4">
                        {renderOrderList(getOrdersByStatus(activeTab))}

                        {getOrdersByStatus(activeTab).length === 0 && (
                            <div className="text-center py-8 text-orange-800">
                                No orders found in {activeTab} status
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage2;
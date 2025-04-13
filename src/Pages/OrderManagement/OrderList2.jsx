import React, { useState, useEffect } from 'react';
import { Search, Check, Clock, Package, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrder } from '../../services/orderAdminService';

const CustomerInfoCard = ({ customer }) => (
    <div className="bg-orange-50 p-3 rounded-lg">
        <div className="flex justify-between">
            <div>
                <p className="font-semibold text-orange-800">
                    {customer.fullName?.firstName} {customer.fullName?.lastName || customer.fullName || ''}
                </p>
                <p className="text-orange-600">{customer.email}</p>
                <p className="text-orange-600">{customer.phoneNo}</p>
            </div>
        </div>
    </div>
);

const OrderPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const tabs = [
        { name: 'pending', icon: <Clock className="w-5 h-5 mr-2" /> },
        { name: 'processing', icon: <Package className="w-5 h-5 mr-2" /> },
        { name: 'shipped', icon: <Package className="w-5 h-5 mr-2" /> },
        { name: 'cancelled', icon: <X className="w-5 h-5 mr-2" /> },
        { name: 'completed', icon: <Check className="w-5 h-5 mr-2" /> },
    ];

    const statusChangeOptions = {
        'pending': ['processing', 'cancelled'],
        'processing': ['shipped', 'cancelled'],
        'shipped': ['completed', 'cancelled'],
        'completed': [],
        'cancelled': []
    };

    // Fetch orders based on active tab
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const result = await getAllOrders();
                console.log('All Orders', result)
                // Check if result has an orders property or is the array directly
                const ordersData = result.orders || result || [];
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, []);

    const handleStatusChange = async (order, newStatus) => {
        try {
            await updateOrder(order._id, { status: newStatus });
            
            // Update local state
            const updatedOrders = orders.map(o =>
                o._id === order._id ? { ...o, status: newStatus } : o
            );
            setOrders(updatedOrders);

            // Update search results if needed
            if (searchResults.length > 0) {
                const updatedSearchResults = searchResults.map(o =>
                    o._id === order._id ? { ...o, status: newStatus } : o
                );
                setSearchResults(updatedSearchResults);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const lowercaseQuery = searchQuery.toLowerCase();
            const results = orders.filter(order =>
                (order._id && order._id.toLowerCase().includes(lowercaseQuery)) ||
                (order.orderNumber && order.orderNumber.toLowerCase().includes(lowercaseQuery)) ||
                (order.userId?.fullName?.firstName && order.userId.fullName.firstName.toLowerCase().includes(lowercaseQuery)) ||
                (order.userId?.fullName?.lastName && order.userId.fullName.lastName.toLowerCase().includes(lowercaseQuery)) ||
                (order.userId?.fullName && typeof order.userId.fullName === 'string' && order.userId.fullName.toLowerCase().includes(lowercaseQuery)) ||
                (order.userId?.email && order.userId.email.toLowerCase().includes(lowercaseQuery)) ||
                (order.userId?.phoneNo && String(order.userId.phoneNo).toLowerCase().includes(lowercaseQuery)) ||
                (order.products && order.products.some(p =>
                    p.product?.title && p.product.title.toLowerCase().includes(lowercaseQuery)
                ))
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

    const formatPrice = (price) => {
        return typeof price === 'number' ? price : 0;
    };

    const getOrderIdentifier = (order) => {
        return order.orderNumber || (order._id ? order._id.substring(0, 8) : 'N/A');
    };

    const renderOrderList = (ordersToRender) => {
        if (loading) return <div className="text-center py-4">Loading orders...</div>;
        
        if (ordersToRender.length === 0) {
            return <div className="text-center py-8 text-orange-800">No orders found</div>;
        }
        
        return ordersToRender.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-orange-50 text-black">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Order ID: {getOrderIdentifier(order)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                Date: {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">Status:</span>
                            <span className="font-semibold text-orange-700 uppercase">{order.status}</span>
                        </div>
                        {order.estimatedDeliveryDate && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    Est. Delivery: {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        className="flex items-center border-2 border-orange-800 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-800 hover:text-white transition"
                        onClick={() => navigate(`/orders/${order._id}`)}
                    >
                        <Eye className="w-5 h-5 mr-2" />
                        View
                    </button>
                </div>

                {order.userId && <CustomerInfoCard customer={order.userId} />}

                <div className="mt-4">
                    <p className="font-semibold mb-2">Items:</p>
                    <ul className="space-y-1">
                        {order.products && order.products.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                                <span>
                                    {item.product?.title || 'Product'} x {item.quantity}
                                </span>
                                <span>
                                    <span className='font-semibold text-orange-500'>₹</span>
                                    {formatPrice(item.totalPrice || item.price?.sellingPrice || item.price)}
                                </span>
                            </li>
                        ))}
                        <hr className='border border-orange-300' />
                        <li className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>
                                <span className='text-orange-500'>₹</span>
                                {formatPrice(order.payableAmount || order.totalAmount)}
                            </span>
                        </li>
                    </ul>
                </div>

                {order.shipping && order.shipping.method && (
                    <div className="mt-2">
                        <p className="text-sm">
                            <span className="font-medium">Shipping:</span> {order.shipping.method}
                            {order.shipping.trackingNumber && (
                                <span className="ml-2">| Tracking: {order.shipping.trackingNumber}</span>
                            )}
                        </p>
                    </div>
                )}

                {order.discount && order.discount.code && (
                    <div className="mt-1">
                        <p className="text-sm text-green-600">
                            <span className="font-medium">Discount:</span> {order.discount.code} (-₹{order.discount.amount})
                        </p>
                    </div>
                )}

                {renderStatusChangeButtons(order)}
            </div>
        ));
    };

    return (
        <div className="container mx-auto">
            <div className="">
                <h1 className="text-3xl font-bold my-4">Order Management</h1>
                <div className="space-y-4">
                    <div className="relative mb-6">
                        <div className='flex'>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full p-3 pl-12 bg-orange-50 placeholder-orange-500 text-orange-800 rounded-xl focus:outline-none border-2 border-orange-300"
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

                    <div className="flex justify-between bg-orange-700 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                className={`flex-1 flex items-center justify-center p-3 transition ${activeTab === tab.name
                                        ? 'text-orange-800 border-2 border-orange-700 bg-white'
                                        : 'text-white hover:bg-orange-600'
                                    }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.name.toUpperCase()}</span>
                                <span className="ml-2 bg-orange-200 px-2 py-1 rounded-full text-sm text-black">
                                    {getOrdersByStatus(tab.name).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 space-y-4">
                        {renderOrderList(getOrdersByStatus(activeTab))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
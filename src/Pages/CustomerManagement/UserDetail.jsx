import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import { ArrowLeft } from 'lucide-react';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await getUserById(id);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <div className="flex justify-center p-8">Loading user details...</div>;
    if (error) return <div className="text-red-500 p-8">{error}</div>;
    if (!user) return <div className="p-8">No user found</div>;

    // Default values for missing fields
    const totalOrders = user.totalOrders || 0;
    const totalAmount = user.totalAmount || 0;
    const lastOrderDate = user.lastOrderDate || null;

    return (
        <div className="container mx-auto p-4">
            <Link to="/customers" className="flex items-center text-blue-500 mb-4">
                <ArrowLeft size={16} className="mr-1" /> Back to Users List
            </Link>
            
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    {user.fullName.firstName} {user.fullName.lastName}
                </h1>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h2>
                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Email</span>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Phone</span>
                                <span className="font-medium">{user.phoneNo}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Verification Status</span>
                                <span className={`font-medium ${user.isVerified ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.isVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Registered On</span>
                                <span className="font-medium">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Information</h2>
                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Total Orders</span>
                                <span className="font-medium">{totalOrders}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Total Amount Spent</span>
                                <span className="font-medium">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Last Order Date</span>
                                <span className="font-medium">
                                    {lastOrderDate ? new Date(lastOrderDate).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Address Information</h2>
                        {user.address && user.address.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {user.address.map((addr, index) => (
                                    <div key={index} className="border p-3 rounded">
                                        <h3 className="font-medium mb-2">
                                            {addr.type || `Address ${index + 1}`}
                                            {addr.isDefault && <span className="ml-2 text-green-500">(Default)</span>}
                                        </h3>
                                        <p>{addr.street}</p>
                                        <p>
                                            {addr.city}, {addr.state} {addr.pincode}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No addresses found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
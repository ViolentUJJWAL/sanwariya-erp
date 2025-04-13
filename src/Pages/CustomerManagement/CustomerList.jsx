import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getAllUsers } from '../../services/userService';
import { Link } from 'react-router-dom';

const CustomerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('fullName');
    const [sortDirection, setSortDirection] = useState('asc');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
    });

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await getAllUsers({
                    search: searchTerm,
                    page: pagination.page,
                    limit: pagination.limit
                });
                console.log('response', response.data);
                setUsers(response.data);
                setPagination(response.pagination);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        // Debounce search
        const timer = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, pagination.page, pagination.limit]);

    // Client-side sorting
    const sortedUsers = [...users].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        if (sortBy === 'fullName') {
            const nameA = `${a.fullName?.firstName || ''} ${a.fullName?.lastName || ''}`.toLowerCase();
            const nameB = `${b.fullName?.firstName || ''} ${b.fullName?.lastName || ''}`.toLowerCase();
            return multiplier * nameA.localeCompare(nameB);
        } else if (sortBy === 'email') {
            return multiplier * a.email.localeCompare(b.email);
        } else if (sortBy === 'createdAt') {
            return multiplier * (new Date(a.createdAt) - new Date(b.createdAt));
        }
        
        return 0;
    });

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination({...pagination, page: newPage});
        }
    };

    const getFormattedAddress = (user) => {
        if (!user.address || user.address.length === 0) return 'No address';
        
        const addr = user.address[0];
        return [addr.street, addr.city, addr.state, addr.pincode]
            .filter(Boolean)
            .join(', ') || 'No address details';
    };

    if (loading) return <div className="flex justify-center p-8">Loading users...</div>;
    if (error) return <div className="text-red-500 p-8">{error}</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-4">Customer Management</h1>
            <div className="mb-4 flex items-center">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 border border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
                    />
                    <Search className="absolute left-2 top-3 text-gray-400" size={20} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th 
                                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('fullName')}
                            >
                                Name {sortBy === 'fullName' && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th 
                                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('email')}
                            >
                                Email {sortBy === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th 
                                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('createdAt')}
                            >
                                Registration Date {sortBy === 'createdAt' && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="p-3 text-left">Verified</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-orange-100">
                                <td className="p-3">{`${user.fullName?.firstName || ''} ${user.fullName?.lastName || ''}`}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.phoneNo || 'N/A'}</td>
                                <td className="p-3">{getFormattedAddress(user)}</td>
                                <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="p-3">{user.isVerified ? 'Yes' : 'No'}</td>
                                <td className="p-3">
                                    <Link 
                                        to={`/customers/${user._id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div>
                    Showing {users.length} of {pagination.total} users
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button 
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};  

export default CustomerList;
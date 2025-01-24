import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import dummyUsers from './userData';

const CustomerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('totalOrders');
    const [sortDirection, setSortDirection] = useState('desc');

    // Search and filter function
    const filteredAndSortedUsers = useMemo(() => {
        return dummyUsers
            .filter(user =>
                user.fullName.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.fullName.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phoneNo.includes(searchTerm) ||
                user.address[0].street.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.address[0].city.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const multiplier = sortDirection === 'asc' ? 1 : -1;
                if (sortBy === 'totalOrders') {
                    return multiplier * (a.totalOrders - b.totalOrders);
                }
                return multiplier * (a.totalAmount - b.totalAmount);
            });
    }, [searchTerm, sortBy, sortDirection]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('desc');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-4">Customer Management</h1>
            <div className="mb-4 flex items-center">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or address"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 border-1 border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
                    />
                    <Search className="absolute left-2 top-3 text-gray-400" size={20} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th
                                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('totalOrders')}
                            >
                                Number of Orders {sortBy === 'totalOrders' && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('totalAmount')}
                            >
                                Total Order Amount {sortBy === 'totalAmount' && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedUsers.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-orange-100 ">
                                <td className="p-3">{`${user.fullName.firstName} ${user.fullName.lastName}`}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.phoneNo}</td>
                                <td className="p-3">
                                    {`${user.address[0].street}, ${user.address[0].city}, ${user.address[0].state} ${user.address[0].pincode}`}
                                </td>
                                <td className="p-3">{user.totalOrders}</td>
                                <td className="p-3">${user.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;
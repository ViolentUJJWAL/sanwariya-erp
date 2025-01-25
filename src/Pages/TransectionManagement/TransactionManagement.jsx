import React, { useState, useEffect, useMemo } from 'react';
import dummyPayments from './transectionData';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [filters, setFilters] = useState({
        paymentStatus: '',
        paymentMethod: ''
    });

    // Memoized filtered transactions
    const filteredTransactions = useMemo(() => {
        return dummyPayments.filter(transaction => {
            const matchSearch = searchTerm.toLowerCase() === '' ||
                transaction.paymentBy.fullname.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentBy.fullname.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentBy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentBy.phone.includes(searchTerm) ||
                transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (transaction.paymentRefundTransactionId || '').toLowerCase().includes(searchTerm.toLowerCase());

            const matchDateRange = (!dateRange.startDate || new Date(transaction.transactionDateAndTime) >= dateRange.startDate) &&
                (!dateRange.endDate || new Date(transaction.transactionDateAndTime) <= dateRange.endDate);

            const matchPaymentStatus = !filters.paymentStatus || transaction.paymentStatus === filters.paymentStatus;
            const matchPaymentMethod = !filters.paymentMethod || transaction.paymentMethod === filters.paymentMethod;

            return matchSearch && matchDateRange && matchPaymentStatus && matchPaymentMethod;
        });
    }, [searchTerm, dateRange, filters]);

    // Revenue calculation
    const calculateRevenue = (transactions) => {
        const now = new Date();
        const daily = transactions.filter(t =>
            new Date(t.transactionDateAndTime).toDateString() === now.toDateString()
        );
        const weekly = transactions.filter(t =>
            new Date(t.transactionDateAndTime) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        const monthly = transactions.filter(t =>
            new Date(t.transactionDateAndTime) >= new Date(now.getFullYear(), now.getMonth(), 1)
        );

        const calculateRevenueForSet = (set) => {
            const online = set.filter(t => t.paymentMethod !== 'cash')
                .reduce((sum, t) => sum + (t.amount - t.refundAmount), 0);
            const cash = set.filter(t => t.paymentMethod === 'cash')
                .reduce((sum, t) => sum + (t.amount - t.refundAmount), 0);
            return { online, cash, total: online + cash };
        };

        return {
            daily: calculateRevenueForSet(daily),
            weekly: calculateRevenueForSet(weekly),
            monthly: calculateRevenueForSet(monthly),
            overall: calculateRevenueForSet(transactions)
        };
    };

    const revenues = calculateRevenue(filteredTransactions);

    return (
        <div className=" container mx-auto">
            <h1 className="text-4xl font-bold my-4">Transaction Management</h1>

            {/* Search and Filters */}
            <div className="mb-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Search by Name, Email, Phone, Transaction ID"
                            className="w-full p-2 pl-8 border-1 border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-2 top-3 text-gray-400" size={20} />
                    </div>

                    <select
                        className="w-full p-2 border rounded"
                        value={filters.paymentStatus}
                        onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
                    >
                        <option value="">All Payment Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="refunded">Refunded</option>
                    </select>
                    <select
                        className="w-full p-2 border rounded"
                        value={filters.paymentMethod}
                        onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    >
                        <option value="">All Payment Methods</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                    />
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                    />
                </div>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(revenues).map(([period, revenue]) => (
                    <div key={period} className="bg-white p-4 rounded shadow hover:shadow-md hover:ring-2 hover:ring-orange-500 hover:bg-orange-50">
                        <h3 className="font-semibold capitalize">{period} Revenue</h3>
                        <p>Online: ₹{revenue.online}</p>
                        <p>Cash: ₹{revenue.cash}</p>
                        <p>Total: ₹{revenue.total}</p>
                    </div>
                ))}
            </div>

            {/* Transactions Table */}
            <div className="bg-white shadow rounded">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Transaction ID</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Refund Amount</th>
                            <th className="p-3 text-left">Payment Method</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction, index) => (
                            <tr key={transaction.transactionId} onClick={()=>navigate(`/transactions/${index}`)} className="border-b hover:bg-orange-100">
                                <td className="p-3">{`${transaction.paymentBy.fullname.firstName} ${transaction.paymentBy.fullname.lastName}`}</td>
                                <td className="p-3">{transaction.paymentBy.email}</td>
                                <td className="p-3">{transaction.transactionId}</td>
                                <td className="p-3">₹{transaction.amount}</td>
                                <td className="p-3">₹{transaction.refundAmount}</td>
                                <td className="p-3">{transaction.paymentMethod.toUpperCase()}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded ${transaction.paymentStatus === 'paid'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-red-200 text-red-800'
                                        }`}>
                                        {transaction.paymentStatus.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionManagement;
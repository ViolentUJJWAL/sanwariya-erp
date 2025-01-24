import React, { useState, useMemo } from 'react';
import orders from './ordersDummyData';
import { Search } from 'lucide-react';

const OrderManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearchTerm = searchTerm.toLowerCase() === '' ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products[0].product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderTrack.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPaymentStatus = paymentStatus === '' || order.payment.status === paymentStatus;
      const matchPaymentMethod = paymentMethod === '' || order.payment.method === paymentMethod;
      const matchOrderStatus = orderStatus === '' || order.status === orderStatus;

      const matchDeliveryDate = (!startDate || new Date(order.estimatedDeliveryDate) >= new Date(startDate)) &&
        (!endDate || new Date(order.estimatedDeliveryDate) <= new Date(endDate));

      return matchSearchTerm &&
        matchPaymentStatus &&
        matchPaymentMethod &&
        matchOrderStatus &&
        matchDeliveryDate;
    });
  }, [searchTerm, paymentStatus, paymentMethod, orderStatus, startDate, endDate]);

  return (
    <div className="container mx-auto">
      <div className="">
        <h1 className="text-4xl font-bold my-4">Order Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by Name, Product, Order Track"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border-1 border-orange-500 rounded-lg ring-2 ring-orange-500 focus:outline-none"
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={20} />
          </div>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Payment Statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="dispatch">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Canceled</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Start Date"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="End Date"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Payment Status</th>
                <th className="p-2 border">Order Status</th>
                <th className="p-2 border">Estimated Delivery</th>
                <th className="p-2 border">Order Track</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-orange-100">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{order.user.name}</td>
                  <td className="p-2 border">{order.products[0].product.title}</td>
                  <td className="p-2 border text-right">₹{order.totalAmount}</td>
                  <td className="p-2 border">
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${order.payment.status === 'successful' ? 'bg-green-200 text-green-800' :
                        order.payment.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'}
                    `}>
                      {order.payment.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          order.status === 'dispatch' ? 'bg-blue-200 text-blue-800' :
                            'bg-red-200 text-red-800'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 border">{new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
                  <td className="p-2 border">{order.orderTrack.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No orders found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPage;
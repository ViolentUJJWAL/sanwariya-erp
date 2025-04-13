import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('today');
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    generateDummyData();
  }, [timeframe]);

  const generateDummyData = () => {
    const revenue = [
      { name: 'Jan', sales: 4000, orders: 2400 },
      { name: 'Feb', sales: 3000, orders: 1398 },
      { name: 'Mar', sales: 2000, orders: 9800 },
      { name: 'Apr', sales: 2780, orders: 3908 },
      { name: 'May', sales: 1890, orders: 4800 },
      { name: 'Jun', sales: 2390, orders: 3800 }
    ];
    setRevenueData(revenue);

    const products = [
      { name: 'Organic Coffee', sales: 450, revenue: 6750 },
      { name: 'Green Tea', sales: 350, revenue: 5250 },
      { name: 'Herbal Supplement', sales: 250, revenue: 3750 },
      { name: 'Protein Bars', sales: 200, revenue: 3000 },
      { name: 'Vitamin Supplements', sales: 180, revenue: 2700 }
    ];
    setTopProducts(products);

    const customers = [
      { name: 'John Doe', orders: 15, totalSpend: 4500 },
      { name: 'Jane Smith', orders: 12, totalSpend: 3600 },
      { name: 'Mike Johnson', orders: 10, totalSpend: 3000 },
      { name: 'Sarah Williams', orders: 8, totalSpend: 2400 },
      { name: 'David Brown', orders: 7, totalSpend: 2100 }
    ];
    setTopCustomers(customers);

    const recentOrders = [
      { id: 'ORD001', customer: 'John Doe', total: 350, date: '2024-01-22' },
      { id: 'ORD002', customer: 'Jane Smith', total: 250, date: '2024-01-22' },
      { id: 'ORD003', customer: 'Mike Johnson', total: 450, date: '2024-01-21' },
      { id: 'ORD004', customer: 'Sarah Williams', total: 200, date: '2024-01-21' },
      { id: 'ORD005', customer: 'David Brown', total: 300, date: '2024-01-20' }
    ];
    setOrders(recentOrders);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="container mx-auto p-6">
      {/* Time Frame Buttons */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setTimeframe('today')} 
          className={`px-4 py-2 mr-2 rounded ${timeframe === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Today
        </button>
        <button 
          onClick={() => setTimeframe('yesterday')} 
          className={`px-4 py-2 rounded ${timeframe === 'yesterday' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Yesterday
        </button>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <LineChart width={500} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{r: 8}} />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Top Products Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Top 5 Products</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={topProducts}
              cx={250}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="sales"
            >
              {topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Recent Orders and Top Customers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-right">Total</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2 text-right">${order.total}</td>
                  <td className="p-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Customers */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-center">Orders</th>
                <th className="p-2 text-right">Total Spend</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer) => (
                <tr key={customer.name} className="border-b">
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2 text-center">{customer.orders}</td>
                  <td className="p-2 text-right">${customer.totalSpend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
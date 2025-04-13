import api from './api'; // Your existing axios config file

// Admin Orders API Service

// Get all orders with optional filters
export const getAllOrders = async (filters = {}) => {
  try {
    const { status, startDate, endDate } = filters;
    let queryParams = new URLSearchParams();
    
    if (status) queryParams.append('status', status);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    
    const response = await api.get(`/admin/orders?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

// Update order by admin
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await api.put(`/admin/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order' };
  }
};

// Get order by ID 
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/admin/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch order details' };
  }
};
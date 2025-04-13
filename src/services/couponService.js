// src/services/couponService.js

import api from './api'; 

const API_URL = '/discount-coupons';

export const couponService = {
  // Get all valid coupons
  getValidCoupons: async () => {
    try {
      const response = await api.get(`${API_URL}/valid`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add a new coupon
  addCoupon: async (couponData) => {
    try {
      const response = await api.post(`${API_URL}`, couponData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update an existing coupon
  updateCoupon: async (id, couponData) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, couponData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete (deactivate) a coupon
  deleteCoupon: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Apply a coupon
  applyCoupon: async (code, totalAmount) => {
    try {
      const response = await api.post(`${API_URL}/apply`, { code, totalAmount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

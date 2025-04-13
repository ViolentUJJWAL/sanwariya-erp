// src/components/Coupons/AddCouponForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { couponService } from '../../services/couponService';
import CouponFormFields from './CouponFormFields';

const AddCouponForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minimumPurchase: '',
    maxDiscountAmount: '',
    usageLimit: '',
    expirationDate: '',
    applicableProducts: [],
    customerEligibility: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a copy of form data for submission
      const couponData = { ...formData };
      
      // Convert string values to appropriate types
      if (couponData.discountValue) couponData.discountValue = parseFloat(couponData.discountValue);
      if (couponData.minimumPurchase) couponData.minimumPurchase = parseFloat(couponData.minimumPurchase);
      if (couponData.maxDiscountAmount) couponData.maxDiscountAmount = parseFloat(couponData.maxDiscountAmount);
      if (couponData.usageLimit) couponData.usageLimit = parseInt(couponData.usageLimit);
      
      // Remove empty fields
      Object.keys(couponData).forEach(key => {
        if (couponData[key] === '' || couponData[key] === null) {
          delete couponData[key];
        }
      });

      await couponService.addCoupon(couponData);
      navigate('/coupons');
    } catch (err) {
      console.error('Failed to add coupon:', err);
      setError(err.error || 'Failed to add coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Coupon</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CouponFormFields 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate('/coupons')}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponForm;
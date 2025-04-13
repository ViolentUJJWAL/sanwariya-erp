import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { couponService } from '../../services/couponService';

const CouponsTable = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await couponService.getValidCoupons();
      setCoupons(response.coupons || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch coupons');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this coupon?')) return;
    
    try {
      await couponService.deleteCoupon(id);
      fetchCoupons();
    } catch (err) {
      setError('Failed to delete coupon');
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Coupons</h1>
        <Link 
          to="/coupons-add" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 text-sm rounded"
        >
          Add Coupon
        </Link>
      </div>

      {coupons.length === 0 ? (
        <div className="text-center p-4 bg-gray-50 rounded text-sm">
          No coupons found. Create one!
        </div>
      ) : (
        <div className="space-y-2">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="bg-white p-3 rounded shadow-sm border border-gray-100 hover:bg-gray-50">
              <div className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <span className="font-medium text-gray-800">{coupon.code}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {coupon.discountType === 'percentage' 
                      ? `${coupon.discountValue}%` 
                      : `$${coupon.discountValue}`}
                    {coupon.maxDiscountAmount && ` (max: $${coupon.maxDiscountAmount})`}
                  </span>
                  <div className="text-xs text-gray-600">
                    Min: ${coupon.minimumPurchase} | Expires: {coupon.expirationDate ? new Date(coupon.expirationDate).toLocaleDateString() : 'Never'}
                  </div>
                  <div className="text-xs text-gray-600">
                    Used: {coupon.usedCount}/{coupon.usageLimit || 'Unlimited'}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${coupon.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {coupon.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex space-x-1">
                    <Link
                      to={`/coupons-edit/${coupon._id}`}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-2 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CouponsTable;
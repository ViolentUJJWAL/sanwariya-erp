// src/components/Coupons/CouponFormFields.jsx
import React from 'react';

const CouponFormFields = ({ formData, handleChange, isEdit = false }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
          Coupon Code*
        </label>
        <input
          id="code"
          name="code"
          type="text"
          value={formData.code}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., SUMMER2025"
          required
          readOnly={isEdit} // Make read-only in edit mode
        />
        {isEdit && (
          <p className="text-xs text-gray-500 mt-1">Coupon code cannot be changed</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountType">
          Discount Type*
        </label>
        <select
          id="discountType"
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount ($)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountValue">
          Discount Value*
        </label>
        <input
          id="discountValue"
          name="discountValue"
          type="number"
          min="0"
          step={formData.discountType === 'percentage' ? '1' : '0.01'}
          value={formData.discountValue}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={formData.discountType === 'percentage' ? '10' : '10.00'}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.discountType === 'percentage' ? 'Percentage off the total' : 'Fixed amount off the total'}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minimumPurchase">
          Minimum Purchase ($)*
        </label>
        <input
          id="minimumPurchase"
          name="minimumPurchase"
          type="number"
          min="0"
          step="0.01"
          value={formData.minimumPurchase}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="0.00"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxDiscountAmount">
          Maximum Discount Amount ($)
        </label>
        <input
          id="maxDiscountAmount"
          name="maxDiscountAmount"
          type="number"
          min="0"
          step="0.01"
          value={formData.maxDiscountAmount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="(Optional) Maximum discount amount"
        />
        <p className="text-xs text-gray-500 mt-1">
          Only applicable for percentage discounts
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usageLimit">
          Usage Limit
        </label>
        <input
          id="usageLimit"
          name="usageLimit"
          type="number"
          min="1"
          step="1"
          value={formData.usageLimit}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="(Optional) Maximum times this coupon can be used"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
          Expiration Date
        </label>
        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          value={formData.expirationDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty for no expiration date
        </p>
      </div>
    </>
  );
};

export default CouponFormFields;
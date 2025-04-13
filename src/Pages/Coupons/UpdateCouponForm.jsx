import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { couponService } from "../../services/couponService";
import CouponFormFields from "./CouponFormFields";

const UpdateCouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minimumPurchase: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expirationDate: "",
    applicableProducts: [],
    customerEligibility: [],
    active: true,
  });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        setLoading(true);
        const response = await couponService.getValidCoupons();
        const coupon = response.coupons.find((c) => c._id === id);

        if (!coupon) {
          setError("Coupon not found");
          return;
        }

        let formattedCoupon = { ...coupon };
        if (formattedCoupon.expirationDate) {
          const date = new Date(formattedCoupon.expirationDate);
          formattedCoupon.expirationDate = date.toISOString().split("T")[0];
        }

        // Remove all read-only and non-updatable fields
        delete formattedCoupon._id;
        delete formattedCoupon.usedCount;
        delete formattedCoupon.createdAt;
        delete formattedCoupon.updatedAt;
        delete formattedCoupon.__v; // Remove __v here

        setFormData(formattedCoupon);
      } catch (err) {
        setError("Failed to fetch coupon details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let couponData = { ...formData };

      // Remove read-only or non-updatable fields before submission
      delete couponData._id;
      delete couponData.usedCount;
      delete couponData.createdAt;
      delete couponData.updatedAt;
      delete couponData.__v; // Ensure __v is not sent

      // Convert string values to appropriate types
      if (couponData.discountValue)
        couponData.discountValue = parseFloat(couponData.discountValue);
      if (couponData.minimumPurchase)
        couponData.minimumPurchase = parseFloat(couponData.minimumPurchase);
      if (couponData.maxDiscountAmount)
        couponData.maxDiscountAmount = parseFloat(couponData.maxDiscountAmount);
      if (couponData.usageLimit)
        couponData.usageLimit = parseInt(couponData.usageLimit);

      // Remove empty fields
      Object.keys(couponData).forEach((key) => {
        if (couponData[key] === "" || couponData[key] === null) {
          delete couponData[key];
        }
      });

      await couponService.updateCoupon(id, couponData);
      navigate("/coupons");
    } catch (err) {
      console.error("Failed to update coupon:", err);
      setError(err.error || "Failed to update coupon. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading)
    return <div className="flex justify-center p-8">Loading coupon details...</div>;
  if (error && !formData.code)
    return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Coupon</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <CouponFormFields
            formData={formData}
            handleChange={handleChange}
            isEdit={true}
          />

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="mr-2 h-5 w-5"
              />
              <span className="text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/coupons")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCouponForm;
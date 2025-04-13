import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder } from "../../services/orderAdminService";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    shippingMethod: "",
    trackingNumber: "",
    estimatedDeliveryDate: "",
    orderTracking: [],
    adminNote: ""
  });

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const result = await getOrderById(id);
        console.log('Single Order', result.order);
        setOrderData(result.order);
        
        // Initialize form with current data
        setFormData({
          status: result.status || "",
          shippingMethod: result.shipping?.method || "",
          trackingNumber: result.shipping?.trackingNumber || "",
          estimatedDeliveryDate: result.estimatedDeliveryDate ? 
            new Date(result.estimatedDeliveryDate).toISOString().split('T')[0] : "",
          orderTracking: result.orderTracking || [],
          adminNote: result.adminNote || ""
        });
        
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // Handle form updates
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle tracking location update
  const handleTrackingUpdate = (index, field, value) => {
    const updatedTracking = [...formData.orderTracking];
    if (!updatedTracking[index]) {
      updatedTracking[index] = { dateAndTime: new Date().toISOString(), location: "" };
    }
    updatedTracking[index][field] = value;
    setFormData(prev => ({
      ...prev,
      orderTracking: updatedTracking
    }));
  };

  // Add new tracking entry
  const addTrackingEntry = () => {
    setFormData(prev => ({
      ...prev,
      orderTracking: [
        ...prev.orderTracking,
        { dateAndTime: new Date().toISOString(), location: "" }
      ]
    }));
  };

  // Submit updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateOrder(id, formData);
      // Refresh order data
      const result = await getOrderById(id);
      setOrderData(result);
      alert("Order updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update order");
      alert("Failed to update order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !orderData) {
    return <div className="container mx-auto p-8">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
        <button 
          onClick={() => navigate('/orders')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  if (!orderData) {
    return <div className="container mx-auto p-8">Order not found</div>;
  }

  // Get order number or use ID substring
  const displayOrderNumber = orderData.orderNumber || `ORD-${id.substring(0, 8)}`;

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="bg-orange-50 shadow-lg rounded-lg p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-orange-600">{displayOrderNumber}</h2>
            <p className="text-sm text-gray-600">
              Created: {new Date(orderData.createdAt).toLocaleDateString()}
              {orderData.updatedAt && ` | Updated: ${new Date(orderData.updatedAt).toLocaleDateString()}`}
            </p>
          </div>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="px-4 py-1 bg-orange-500 text-white rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Product Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-orange-600 mb-3">
            Product Details
          </h3>
          {orderData.products && orderData.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-md rounded-md p-3 mb-3"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-md flex justify-center items-center mr-4">
                <img
                  src={item.product?.images?.[0]?.url || "/api/placeholder/80/80"}
                  alt={item.product?.title || "Product"}
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">
                  {item.product?.title || "Product"}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p>Category: {item.product?.category || "N/A"}</p>
                    <p>Quantity: {item.quantity}</p>
                    {item.product?.productVariety && (
                      <>
                        {item.product.productVariety.color && <p>Color: {item.product.productVariety.color}</p>}
                        {item.product.productVariety.size && <p>Size: {item.product.productVariety.size}</p>}
                        {item.product.productVariety.weightInGrams && <p>Weight: {item.product.productVariety.weightInGrams}g</p>}
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-700">
                      ₹{item.totalPrice || item.price?.sellingPrice || item.price}
                    </p>
                    {item.price?.mrp && item.price?.discountPercentage && (
                      <p className="text-sm text-gray-500">
                        <span className="line-through">₹{item.price.mrp}</span>
                        <span className="ml-2 text-green-600">{item.price.discountPercentage}% off</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-orange-600 mb-3">
            Customer Information
          </h3>
          <div className="bg-white shadow-md rounded-md p-3">
            <p>
              <span className="font-semibold">Name:</span> {orderData.userId?.fullName?.firstName} {orderData.userId?.fullName?.lastName || ""}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {orderData.userId?.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {orderData.userId?.phoneNo || "N/A"}
            </p>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-orange-600 mb-3">
            Delivery Address
          </h3>
          <div className="bg-white shadow-md rounded-md p-3">
            <p>{orderData.address?.flatNo}, {orderData.address?.street}</p>
            <p>{orderData.address?.city}, {orderData.address?.state} {orderData.address?.pincode}</p>
            <p>{orderData.address?.country}</p>
          </div>
        </div>

        {/* Discount & Payment Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-orange-600 mb-3">
            Payment Details
          </h3>
          <div className="bg-white shadow-md rounded-md p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Order Summary</p>
              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>₹{orderData.totalAmount || 0}</span>
              </div>
              {orderData.discount && (
                <div className="flex justify-between mb-1 text-green-600">
                  <span>Discount ({orderData.discount.code}):</span>
                  <span>-₹{orderData.discount.amount || 0}</span>
                </div>
              )}
              {orderData.shipping && (
                <div className="flex justify-between mb-1">
                  <span>Shipping ({orderData.shipping.method}):</span>
                  <span>₹{orderData.shipping.cost || 0}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Payable Amount:</span>
                <span>₹{orderData.payableAmount || orderData.totalAmount || 0}</span>
              </div>
            </div>
            <div>
              {orderData.refund && (
                <div className="bg-orange-100 p-2 rounded-md">
                  <p className="font-semibold">Refund Status:</p>
                  <p>{orderData.refund.isRefunded ? "Refunded" : "Not Refunded"}</p>
                  {orderData.refund.amount && <p>Amount: ₹{orderData.refund.amount}</p>}
                  {orderData.refund.reason && <p>Reason: {orderData.refund.reason}</p>}
                </div>
              )}
              {orderData.giftOptions && (
                <div className="mt-3">
                  <p className="font-semibold">Gift Options:</p>
                  <p>Is Gift: {orderData.giftOptions.isGift ? "Yes" : "No"}</p>
                  {orderData.giftOptions.message && <p>Message: {orderData.giftOptions.message}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <h3 className="text-lg font-medium text-orange-600 mb-3">
            Update Order Details
          </h3>
          <div className="bg-white shadow-md rounded-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping Method
                </label>
                <input
                  type="text"
                  value={formData.shippingMethod}
                  onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g. Standard, Express"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={formData.trackingNumber}
                  onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Tracking number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => handleInputChange("estimatedDeliveryDate", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Admin Note
              </label>
              <textarea
                value={formData.adminNote}
                onChange={(e) => handleInputChange("adminNote", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                rows="2"
                placeholder="Add notes about this order"
              ></textarea>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Order Tracking Updates
                </label>
                <button
                  type="button"
                  onClick={addTrackingEntry}
                  className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md"
                >
                  + Add Entry
                </button>
              </div>
              
              {formData.orderTracking.map((track, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 p-2 border rounded-md">
                  <div>
                    <label className="block text-xs font-medium mb-1">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={track.dateAndTime ? new Date(track.dateAndTime).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleTrackingUpdate(index, "dateAndTime", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={track.location}
                      onChange={(e) => handleTrackingUpdate(index, "location", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="e.g. Warehouse, In Transit"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md shadow-md disabled:opacity-70"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Order Summary Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Total Amount</h3>
            <p className="font-bold text-orange-600 text-xl">
              ₹{orderData.payableAmount || orderData.totalAmount}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Created On: {new Date(orderData.createdAt).toLocaleDateString()}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate('/orders')}
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
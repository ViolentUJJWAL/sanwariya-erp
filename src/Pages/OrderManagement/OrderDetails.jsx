import React, { useState } from "react";

const OrderDetails = () => {
  // Sample data
  const [orderData, setOrderData] = useState({
    products: [
      {
        product: {
          title: "Wireless Mouse",
          category: "Electronics",
        },
        productVariety: {
          additionalDesc: {
            weightInGrams: 150,
            color: "Black",
            size: "Medium",
          },
          stock: 50,
          price: {
            mrp: 1500,
            sellingPrice: 1200,
          },
        },
        quantity: 2,
        totalPrice: 2400,
      },
    ],
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    address: {
      flatNo: "101",
      street: "Baker Street",
      city: "London",
      state: "London",
      pincode: "NW16XE",
      country: "UK",
      category: "home",
    },
    totalAmount: 2400,
    estimatedDeliveryDate: new Date("2025-02-01"),
    description: "Order for a wireless mouse.",
    status: "pending",
    payment: {
      status: "successful",
      method: "Credit Card",
    },
    orderTrack: {
      dateAndTime: new Date(),
      location: "Warehouse",
    },
  });

  // Handlers for updating fields
  const handleUpdate = (field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOrderTrackUpdate = (field, value) => {
    setOrderData((prev) => ({
      ...prev,
      orderTrack: {
        ...prev.orderTrack,
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="bg-[#F8F5F1] shadow-lg rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-[#E68A00]">Order Details</h2>
          <select
            value={orderData.status}
            onChange={(e) => handleUpdate("status", e.target.value)}
            className="px-4 py-1 bg-orange-500 text-white font-bold rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="dispatched">Dispatched</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Product Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#E68A00] mb-4">
            Product Details
          </h3>
          {orderData.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-md rounded-md p-4 mb-4"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center mr-6">
                <img
                  src="/api/placeholder/100/100"
                  alt="Product"
                  className="w-16 h-16"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {item.product.title}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>Color: {item.productVariety.additionalDesc.color}</p>
                    <p>Size: {item.productVariety.additionalDesc.size}</p>
                    <p>
                      Weight: {item.productVariety.additionalDesc.weightInGrams}{" "}
                      g
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="line-through text-gray-500">
                      ₹{item.productVariety.price.mrp}
                    </p>
                    <p className="font-bold text-[#C03929]">
                      ₹{item.productVariety.price.sellingPrice}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#E68A00] mb-4">
            Customer Information
          </h3>
          <div className="bg-white shadow-md rounded-md p-4">
            <p>
              <span className="font-semibold">Name:</span> {orderData.user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {orderData.user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {orderData.user.phone}
            </p>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#E68A00] mb-4">
            Delivery Address
          </h3>
          <div className="bg-white shadow-md rounded-md p-4">
            <p>Flat No.: {orderData.address.flatNo}</p>
            <p>Street: {orderData.address.street}</p>
            <p>City: {orderData.address.city}</p>
            <p>State: {orderData.address.state}</p>
            <p>Pincode: {orderData.address.pincode}</p>
            <p>Country: {orderData.address.country}</p>
            <p>Category: {orderData.address.category}</p>
          </div>
        </div>

        {/* Update Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#E68A00] mb-4">
            Update Details
          </h3>
          <div className="bg-white shadow-md rounded-md p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Order Track Location
              </label>
              <input
                type="text"
                value={orderData.orderTrack.location}
                onChange={(e) =>
                  handleOrderTrackUpdate("location", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                value={
                  orderData.estimatedDeliveryDate.toISOString().split("T")[0]
                }
                onChange={(e) =>
                  handleUpdate(
                    "estimatedDeliveryDate",
                    new Date(e.target.value)
                  )
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-md shadow-md"
          >
            Submit Updates
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Total Amount</h3>
            <p className="font-bold text-[#C03929] text-xl">
              ₹{orderData.totalAmount}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Estimated Delivery: {orderData.estimatedDeliveryDate.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

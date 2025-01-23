import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate OTP sending logic
    console.log("OTP sent to:", email);
    setOtpSent(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log("Password reset for:", email, "with OTP:", otp);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={!otpSent ? handleSendOtp : handleResetPassword}
        className="relative w-[600px] overflow-hidden bg-white p-10 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl"
      >
        <div className="absolute -top-10 left-80 w-[600px] h-[600px] bg-[#E68A00] opacity-70 rounded-[40%_45%_40%_30%] animate-spin-slow-2 -z-10"></div>

        <img src=".\pnglogo.png" alt="logo" className="h-20 mx-auto mb-6" />

        {!otpSent ? (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border-2 rounded-md border-orange-500 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 border-2 rounded-md border-orange-500 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mb-4 border-2 rounded-md border-orange-500 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white uppercase rounded-md hover:bg-orange-600 transition-colors duration-300"
        >
          {!otpSent ? "Send OTP" : "Reset Password"}
        </button>

        <div className="mt-4 text-center">
          <Link to="/" className="text-lg hover:underline">
            Back to Login
          </Link>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 text-sm hover:text-gray-900 hover:underline transition-colors"
        >
          Our website
        </a>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

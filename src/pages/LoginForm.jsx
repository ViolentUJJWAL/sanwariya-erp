import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempted", { email, password });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="relative w-[600px] overflow-hidden bg-white p-10 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl"
      >
        {/* Background wave elements */}
        {/* <div className="absolute -top-10 left-56 w-[600px] h-[600px] w-full bg-yellow-500 opacity-15 rounded-[40%_45%_30%_45%] animate-spin-slow -z-10"></div> */}
        <div className="absolute -top-10 left-80  w-[600px] h-[600px] bg-[#E68A00] opacity-70 rounded-[40%_45%_40%_30%] animate-spin-slow-2 -z-10"></div>

        <img src=".\pnglogo.png" alt="logo" className="h-20 mx-auto mb-6" />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border-2 rounded-md border-orange-500 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border-2 rounded-md border-orange-500 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-20 py-3 bg-orange-500 text-white uppercase rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Login
          </button>
          <p>
            <Link to="/forgot-password" className="text-lg hover:underline">
              Forget password
            </Link>
          </p>
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

export default LoginForm;

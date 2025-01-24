import React, { useState } from "react";
import { Search, Bell, Mail, User, ChevronDown } from "lucide-react";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      className="
      bg-white 
      shadow-md 
      px-6 py-2 
      flex items-center 
      justify-between 
      border-b border-gray-200
    "
    >
      <div className="flex items-center space-x-4 w-full max-w-md">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search anything..."
            className="
              w-full 
              pl-10 
              pr-4 
              py-2 
              border 
              border-orange-300 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-red-400 
              focus:border-transparent 
              transition 
              duration-300
            "
          />
          <Search
            className="
            absolute 
            left-3 
            top-1/2 
            transform 
            -translate-y-1/2 
            text-red-400
          "
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* <div className="relative">
          <button
            className="
            relative 
            hover:bg-gray-100 
            p-2 
            rounded-full 
            transition 
            duration-300
          "
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span
              className="
              absolute 
              -top-1 
              -right-1 
              bg-orange-500 
              text-white 
              rounded-full 
              h-4 
              w-4 
              flex 
              items-center 
              justify-center 
              text-xs
            "
            >
              3
            </span>
          </button>
        </div> */}

        <div className="relative">
          <button
            className="
            relative 
            hover:bg-gray-100 
            p-2 
            rounded-full 
            transition 
            duration-300
          "
          >
            <Mail className="h-5 w-5 text-gray-600" />
            <span
              className="
              absolute 
              -top-1 
              -right-1 
              bg-orange-500   
              text-white 
              rounded-full 
              h-4 
              w-4 
              flex 
              items-center 
              justify-center 
              text-xs
            "
            >
              5
            </span>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="
              flex 
              items-center 
              space-x-2 
              hover:bg-gray-100 
              p-2 
              rounded-lg 
              transition 
              duration-300
            "
          >
            <User
              className="
              h-8 
              w-8 
              text-gray-600 
              bg-gray-200 
              rounded-full 
              p-1
            "
            />
            <div className="text-left">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <ChevronDown
              className="
              h-4 
              w-4 
              text-gray-400 
              transition 
              transform 
              duration-300 
              ml-2
              group-hover:rotate-180
            "
            />
          </button>

          {isDropdownOpen && (
            <div
              className="
              absolute 
              right-0 
              mt-2 
              w-48 
              bg-white 
              border 
              border-gray-200 
              rounded-lg 
              shadow-lg 
              py-1 
              z-50
            "
            >
              <Link
                to="/profile"
                className="
                block 
                px-4 
                py-2 
                text-sm 
                text-gray-700 
                hover:bg-gray-100
              "
              >
                Profile
              </Link>
              <div className="border-t border-gray-200"></div>
              <Link
                to="/"
                className="
                block 
                px-4 
                py-2 
                text-sm 
                text-red-600 
                hover:bg-gray-100
              "
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

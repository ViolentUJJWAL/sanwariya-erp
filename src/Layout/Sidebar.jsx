import React from "react";
import {
  Home,
  MessageSquare,
  Package,
  ListOrdered,
  DollarSign,
  Users,
} from "lucide-react";
import {Link} from "react-router-dom"

const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
      color: "text-white-500",
    },
    {
      icon: Package,
      label: "Products",
      href: "/products",
      color: "text-white-500",
    },
    {
      icon: ListOrdered,
      label: "Orders",
      href: "/orders",
      color: "text-white-500",
    },
    {
      icon: DollarSign,
      label: "Transection",
      href: "/transactions",
      color: "text-white-500",
    },
    {
      icon: Users,
      label: "Customers",
      href: "/customers",
      color: "text-white-500",
    },
    {
      icon: MessageSquare,
      label: "Contact Us",
      href: "/contact-us",
      color: "text-white-500",
    }
  ];

  return (
    <div
      className={`
      fixed 
      top-0 
      left-0 
      h-full 
      bg-gradient-to-b 
      to-[#8d5b3a] 
      from-orange-500 
      text-white 
      transition-all 
      duration-300 
      shadow-xl
      ${isOpen ? "w-56" : "w-16"}
      flex 
      flex-col 
      z-50
    `}
    >
      <div
        className="
        flex 
        items-center 
        justify-between 
        px-6 
        py-5 
        border-b 
        border-white/10
      "
      >
        {isOpen && (
          <img src=".\pnglogo.png" alt="logo" className="w-36" />
        )}
        <button
          onClick={onToggle}
          className="
            flex 
            items-center 
            justify-center 
            p-2 
            hover:bg-white/10 
            rounded-full 
            transition 
            duration-300"
        >
          <svg
            className={`
              h-6 
              w-6
              text-white 
              transition-transform 
              duration-300
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`
                rounded-lg 
                transition 
                duration-300 
                hover:bg-white/10
                ${isOpen ? "px-3" : "px-2"}
              `}
            >
              <Link
                to={item.href}
                className={`
                  flex 
                  items-center 
                  py-3 
                  ${isOpen ? "gap-4 justify-start" : "justify-center"}
                  group
                `}
              >
                <item.icon
                  className={`
                  h-6 
                  w-6 
                  ${item.color} 
                  group-hover:scale-110 
                  transition
                `}
                />
                {isOpen && (
                  <span
                    className="
                    text-sm 
                    font-medium 
                    text-white/80 
                    group-hover:text-white 
                    transition
                  "
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

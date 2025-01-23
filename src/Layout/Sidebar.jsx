import React from "react";
import {
  Home,
  User,
  Settings,
  PieChart,
  Calendar,
  Folder,
  MessageSquare,
} from "lucide-react";

const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: PieChart,
      label: "Analytics",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: User,
      label: "Profile",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: Folder,
      label: "Projects",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: Calendar,
      label: "Calendar",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "#",
      color: "text-white-500",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "#",
      color: "text-white-500",
    },
  ];

  return (
    <div
      className={`
      fixed 
      top-0 
      left-0 
      h-full 
      bg-gradient-to-b 
      from-[#8d5b3a] 
      to-orange-500 
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
          <div
            className="
            text-xl 
            font-bold 
            tracking-wider 
            text-white/90 
            flex-grow 
            text-left
          "
          >
            Dhazia
          </div>
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
              <a
                href={item.href}
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
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

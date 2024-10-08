// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "Work Related",
    "Personal Development",
    "Household Chores",
    "Social Tasks",
    "Administrative Tasks",
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 shadow-md z-50">
      {categories.map((category) => (
        <span
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`cursor-pointer p-2 mx-1 rounded transition-all duration-300 ease-in-out transform ${
            selectedCategory === category
              ? "font-bold bg-white text-blue-500 scale-105"
              : "hover:bg-blue-200 hover:text-blue-500 hover:font-semibold hover:scale-105"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default Navbar;

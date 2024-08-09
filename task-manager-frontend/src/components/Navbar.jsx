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
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 shadow-md">
      {categories.map((category) => (
        <span
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`cursor-pointer p-2 mx-1 rounded ${
            selectedCategory === category ? "font-bold" : ""
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default Navbar;

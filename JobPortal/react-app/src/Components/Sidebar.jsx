import React from "react";

const categories = [
    "All",
    "Software Engineer",
    "Product Manager",
    "Data Analyst",
    "Designer",
];
function Sidebar({ activeCategory, onCategoryChange }) {
    return (
        <div className="bg-gray-100 h-full w-60 p-6">
            <h2 className="text-xl font-bold mb-4">Job Categories</h2>
            <ul className="list-none p-0">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`mb-2 ${
                            category === activeCategory
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        <button
                            className="w-full py-2 px-4 text-left font-medium focus:outline-none"
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;

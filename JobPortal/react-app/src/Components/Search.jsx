import React from "react";

function Search({ value, onChange }) {
    return (
        <div className="flex items-center justify-center w-full mt-4">
            <input
                type="text"
                className="px-4 py-2 bg-gray-200 rounded-l-md focus:outline-none focus:bg-white"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
            >
                Search
            </button>
        </div>
    );
}

export default Search;

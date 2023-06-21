import React from "react";
import Search from "./Search";
//import { useNavigate } from "react-router-dom";

function Navbar() {
    //const history = useNavigate();

    // const handleClick = () => {
    //     history("/signup");
    // };

    return (
        <div className="w-full flex flex-row items-center justify-center">
            <Search />
            <div className="flex">
                <button
                    onClick={() => {}}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 mt-5 h-fit w-fit"
                >
                    SignUp
                </button>
                <button
                    onClick={() => {}}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-5 mr-5 h-fit w-fit"
                >
                    login
                </button>
            </div>
        </div>
    );
}

export default Navbar;

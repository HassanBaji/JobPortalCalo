import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Main from "../Components/Main";
export default function Dash() {
    return (
        <div className="flex flex-col items-center h-full w-full">
            <Navbar />
            <div className="flex flex-row w-full items-center px-64 mt-8 justify-between">
                <Sidebar />
                <Main />
            </div>
        </div>
    );
}

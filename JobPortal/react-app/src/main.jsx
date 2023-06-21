import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { ContextProvider } from "./ContextProvider";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
            {/* <App /> */}
        </ContextProvider>
    </React.StrictMode>
);

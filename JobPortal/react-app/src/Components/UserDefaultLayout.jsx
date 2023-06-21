import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/hassanhaji/Documents/MyProjects/Sapwood/BlackVelvet/Black_Velvet/react-app/src/index.css";

export default function UserDefaultLayout() {
    const {
        admin,
        adminToken,
        adminEmail,
        setAdminEmail,
        setAdmin,
        setAdminToken,
        notification,
        setNotification,
        user,
        token,
        e,
    } = useStateContext();
    const [adminCheck, setAdminCheck] = useState([]);
    const navigate = useNavigate();

    return <div>UserDefaultLayout</div>;
}

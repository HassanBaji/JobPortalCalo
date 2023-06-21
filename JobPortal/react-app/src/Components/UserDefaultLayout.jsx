import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import "/Users/hassanhaji/Documents/MyProjects/Sapwood/BlackVelvet/Black_Velvet/react-app/src/index.css";

export default function UserDefaultLayout() {
    const {
        admin,
        adminToken,
        adminEmail,
        setAdminEmail,
        setAdmin,
        setAdminToken,
        setUser,
        setToken,
        setUserEmail,
        notification,
        setNotification,
        user,
        token,
        userEmail,
        role,
        setRole,
    } = useStateContext();
    const [adminCheck, setAdminCheck] = useState([]);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [animated, setAnimated] = useState(false);
    const containerRef = useRef(null);
    const location = useLocation();
    const [usersCheck, setUsersCheck] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data);
                const myUsers = Object.keys(data).map((key) => {
                    return {
                        ...data[key],
                        id: key,
                    };
                });
                setUsersCheck(myUsers);
            })

            .catch(() => {});
    }, []);

    useEffect(() => {
        const myUser = usersCheck.find((a) => a.role === "job_seeker");
        const myEmployer = usersCheck.find((a) => a.role === "Employer");

        if (myUser) {
            setUser(myUser);
            setRole("job_seeker");
            setLoggedInUser(true);
            console.log(user);
            // console.log(user.email);
        }

        if (myEmployer) {
            setUser(myEmployer);
            setRole("Employer");
            setLoggedInUser(true);
            console.log(user);
            // console.log(user.email);
        }
    }, [usersCheck]);

    const onLogout = (ev) => {
        ev.preventDefault();

        setAdmin(null);
        setAdminToken(null);
        setAdminEmail(null);
        setUser(null);
        setUserEmail(null);
        setToken(null);
        navigate("/");
    };

    const goToLogin = () => {
        navigate("/login");
    };
    const goToSignup = () => {
        navigate("/signup");
    };

    return (
        <div ID="defaultLayout">
            <aside>
                <Link to="/jobs">jobs</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Job Portal</div>
                    <div>
                        {adminToken && admin.name}
                        {token && user.name}
                        {token && (
                            <a
                                href="#"
                                onClick={onLogout}
                                className="btn-logout"
                            >
                                Logout
                            </a>
                        )}
                        {!token && (
                            <>
                                <a
                                    href="#"
                                    onClick={goToLogin}
                                    className="btn-logout"
                                >
                                    Login
                                </a>
                                <a
                                    href="#"
                                    onClick={goToSignup}
                                    className="btn-logout"
                                >
                                    Register
                                </a>
                            </>
                        )}
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

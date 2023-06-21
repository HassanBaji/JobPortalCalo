import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "/Users/hassanhaji/Documents/MyProjects/Sapwood/BlackVelvet/Black_Velvet/react-app/src/index.css";

export default function Login() {
    const { token, adminToken } = useStateContext();
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState();
    const { setUserEmail, setToken } = useStateContext();
    const [adminCheck, setAdminCheck] = useState([]);
    const { setAdmin, setAdminEmail, setAdminToken } = useStateContext();
    const [url, setUrl] = useState();
    const { from } = location.state || { from: { pathname: "/" } };

    //    const fromPathname = location.state && location.state.from && location.state.from.pathname;
    // const { from } = { pathname: fromPathname || '/' };

    if (token) {
        navigate("/");
    }
    if (adminToken) {
        navigate("/admin");
    }

    useEffect(() => {
        setUrl(from);
        console.log(from);
        console.log(url);
        if (token) {
            navigate(url);
        }

        if (adminToken) {
            navigate("/admin");
        }
    }, [token, adminToken]);

    // useEffect(() => {
    //     axiosClient
    //         .get("/admins")
    //         .then(({ data }) => {
    //             console.log(data);
    //             const myAdmins = Object.keys(data).map((key) => {
    //                 return {
    //                     ...data[key],
    //                     id: key,
    //                 };
    //             });
    //             setAdminCheck(myAdmins);
    //         })

    //         .catch(() => {});
    // }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);

        const admin = adminCheck.find((a) => a.email === payLoad.email);

        if (admin) {
            axiosClient
                .post("/signin", payLoad)

                .then(({ data }) => {
                    setAdminToken(data["token"]);
                    setAdminEmail(admin.email);
                    setAdmin(admin);
                    console.log(data);
                })

                .catch((err) => {
                    const response = err.response;
                    if (response) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else if (response.data.message) {
                            setErrors({
                                email: [response.data.message],
                            });
                        }
                    }
                });
        } else if (!admin) {
            axiosClient
                .post("/signin", payLoad)

                .then(({ data }) => {
                    setToken(data["token"]);
                    setUserEmail(payLoad.email);
                    // history.goBack();
                })

                .catch((err) => {
                    const response = err.response;
                    if (response) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else if (response.data.message) {
                            setErrors({
                                email: [response.data.message],
                            });
                        }
                    }
                });
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown ">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Passowrd"
                    />
                    <button className="btn btn-block">Login</button>
                </form>
            </div>
        </div>
    );
}

import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Navigate } from "react-router-dom";

export default function Signup() {
    const { token, adminToken } = useStateContext();
    if (token || adminToken) {
        return <Navigate to="/" />;
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const [errors, setErrors] = useState();
    const { setUser, setToken, setUserEmail } = useStateContext();
    const [usersCheck, setUsersCheck] = useState([]);

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

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payLoadAuth = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        const payLoadCreate = {
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            name: nameRef.current.value,
        };
        setErrors(null);

        if (passwordRef.current.value != passwordConfirmRef.current.value) {
            setErrors({
                password: ["Password Do not match"],
            });
            return;
        }

        axiosClient
            .post("/signup", payLoadAuth)

            .then(({ data }) => {
                setToken(data["idToken"]);
                //setUser(data['firebase_user_id'])
                setUserEmail(payLoadAuth.email);
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
        // }else {
        //   setErrors("user is not an admin or credentail are wrong")
        // }

        const user = usersCheck.find((a) => a.email === payLoadCreate.email);

        if (!user) {
            axiosClient
                .post(`/users`, payLoadCreate)
                .then(() => {
                    console.log("user was added to database");
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            console.log("user already existed in database");
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown ">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Register</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input ref={nameRef} placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={phoneRef} placeholder="Phone Number" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Passowrd"
                    />
                    <input
                        ref={passwordConfirmRef}
                        type="password"
                        placeholder="Passowrd Confirmation"
                    />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Registred? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

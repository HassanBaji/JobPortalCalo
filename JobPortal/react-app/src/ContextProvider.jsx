import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    admin: null,
    adminEmail: null,
    token: null,
    adminToken: null,
    notification: null,
    setUser: () => {},
    setAdminEmail: () => {},
    setAdmin: () => {},
    setToken: () => {},
    setAdminToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userEmail, _setUserEmail] = useState(localStorage.getItem("USER"));
    const [admin, setAdmin] = useState({});
    const [adminEmail, _setAdminEmail] = useState(
        localStorage.getItem("ADMIN")
    );
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [adminToken, _setAdminToken] = useState(
        localStorage.getItem("ACCESS_TOKEN_ADMIN")
    );

    const setAdminEmail = (adminEmail) => {
        _setAdminEmail(adminEmail);
        if (adminEmail) {
            localStorage.setItem("ADMIN", adminEmail);
        } else {
            localStorage.removeItem("ADMIN");
        }
    };

    const setUserEmail = (userEmail) => {
        _setUserEmail(userEmail);
        if (userEmail) {
            localStorage.setItem("USER", userEmail);
        } else {
            localStorage.removeItem("USER");
        }
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    const setAdminToken = (token) => {
        _setAdminToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN_ADMIN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN_ADMIN");
        }
    };

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                userEmail,
                admin,
                adminEmail,
                token,
                adminToken,
                setUser,
                setUserEmail,
                setAdmin,
                setAdminEmail,
                setToken,
                setAdminToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

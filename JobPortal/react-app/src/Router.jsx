import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <UserDefaultLayout />,
    //     children: [

    //     ],
    // },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

export default router;

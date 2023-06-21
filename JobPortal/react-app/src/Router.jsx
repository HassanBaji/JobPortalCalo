import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import PostJobForm from "./views/PostJobForm";
import Jobs from "./views/Jobs";

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
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/post-form/new",
        element: <PostJobForm key="postCreate" />,
    },
    {
        path: "/post-form/:id",
        element: <PostJobForm key="postUpdate" />,
    },
    {
        path: "/jobs",
        element: <Jobs />,
    },
]);

export default router;

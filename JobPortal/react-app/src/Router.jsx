import { Navigate, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserDefaultLayout />,
        children: [],
    },
]);

export default router;

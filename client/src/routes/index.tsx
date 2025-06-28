import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/UserLayout";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const routes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
];

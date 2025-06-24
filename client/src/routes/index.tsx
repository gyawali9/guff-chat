import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

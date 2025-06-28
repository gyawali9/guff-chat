import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { getUserProfileThunk } from "@/store/slice/user/user.thunk";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { token, authUser, screenLoading } = useAppSelector(
    (state) => state.user
  );
  // const token = localStorage.getItem("token");

  console.log(token, authUser, screenLoading, "finalshow");

  useEffect(() => {
    if (token && !authUser) {
      dispatch(getUserProfileThunk());
    }
  }, [token, authUser, dispatch]);

  if (screenLoading) return null;

  return token ? children : <Navigate to="/login" />;
};

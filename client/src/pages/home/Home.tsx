import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/react-redux";
import { logoutUserThunk } from "@/store/slice/user/user.thunk";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const res = await dispatch(logoutUserThunk());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };
  return (
    <>
      <p>home</p>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button className="cursor-pointer" onClick={handleLogout}>
          log out
        </Button>
      </div>
    </>
  );
};

export default Home;

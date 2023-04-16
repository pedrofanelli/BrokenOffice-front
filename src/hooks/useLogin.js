import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../state/user";

const useLogin = () => {
  const ROUTE = process.env.REACT_APP_ROUTE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const userData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const loggedUser = await axios.post(`${ROUTE}/user/login`, userData, {
        withCredentials: true,
      });
      dispatch(setUser(loggedUser.data));
      navigate("/");
    } catch (err) {
      toast.error("Wrong email or password");
      console.error(err);
    }
  };

  return {
    handleSubmit,
  };
};
export default useLogin;

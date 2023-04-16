import axios from "axios";
import { useEffect, useState } from "react";

const useUser = (id) => {
  const [singleUser, setSingleUser] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROUTE}/collaborators/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSingleUser(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return {
    singleUser,
  };
};
export default useUser;

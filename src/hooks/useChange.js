import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/user";

const useChange = () => {
  const user = useSelector((state) => state.user);
  const ROUTE = process.env.REACT_APP_ROUTE;
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [inputName, setInputName] = useState(user?.name);
  const [inputLastName, setInputLastName] = useState(user?.lastName);
  const [inputRole, setInputRole] = useState(user?.role);
  const [inputAddress, setInputAddress] = useState(user?.addressName);
  const [inputOffice, setInputOffice] = useState(user?.office);
  const [addressCoor, setAddressCoor] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  //   EDIT PASS
  const handleEditPassSubmit = async () => {
    if (newPassword !== repeatPassword)
      return toast.error("The new password does not match");

    try {
      await axios.put(
        `${ROUTE}/user/edit/password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Password changed successfully");
      handleClose();
    } catch (err) {
      toast.error("Password is incorrect");
    }
  };

  //   EDIT PROFILE

  function handleAddressChange(value) {
    if (value) {
      setInputAddress(value?.description);
    } else {
      setInputAddress("");
    }
    const lat = value?.geometry.location.lat();
    const lng = value?.geometry.location.lng();
    setAddressCoor([lng, lat]);
    if (!value) toast.error("Address not valid");
  }

  const handleChangeInput = async (e) => {
    try {
      var formData = new FormData();
      formData.append("file", e.target.files[0]);
      handleClose();
      const { data } = await axios.post(
        `${ROUTE}/user/edit/picture`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      dispatch(setUser(data));
    } catch (err) {
      console.error("desde PROFILE,index", err);
    }
  };

  const handleSubmit = async () => {
    if (inputName === "" || inputLastName === "" || inputRole === "")
      return toast.error("Please enter required data");

    const obj = {
      name: inputName,
      lastName: inputLastName,
      role: inputRole,
      addressName: inputAddress,
      addressCoor: { type: "Point", coordinates: addressCoor },
      office: inputOffice,
    };

    try {
      const { data } = await axios.put(`${ROUTE}/user/edit/profile`, obj, {
        withCredentials: true,
      });
      dispatch(setUser(data));
      toast.success("Profile changed successfully");
      handleClose();
    } catch (err) {
      toast.error("Could not change Profile");
      console.error(err);
    }
  };

  return {
    handleOpen,
    handleClose,
    handleSubmit,
    setOldPassword,
    setNewPassword,
    setRepeatPassword,
    setInputName,
    setInputLastName,
    setInputRole,
    setInputOffice,
    handleAddressChange,
    handleEditPassSubmit,
    handleChangeInput,
    open,
    inputName,
    inputLastName,
    inputRole,
    inputOffice,
  };
};

export default useChange;

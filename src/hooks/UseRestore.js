import { useState } from "react";
import toast from "react-hot-toast";
import { axiosPostGenerateRestoreLink } from "../utils/axios";

const useRestore = () => {
  const [emailToRestore, setEmailToRestore] = useState("");
  const [open, setOpen] = useState(false);

  const handleRestorePass = async () => {
    const mailValidation = new RegExp(
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$/
    );
    if (!mailValidation.test(emailToRestore))
      return toast.error("Write a valid email");
    try {
      const link = await axiosPostGenerateRestoreLink(emailToRestore);
      if (link.error) return;
      toast.success("Check your email to restore");
      setOpen(false);
      setEmailToRestore("");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return {
    setEmailToRestore,
    handleRestorePass,
    setOpen,
    open
  };
};

export default useRestore;

import { Button } from "@mui/material";
import React from "react";
import { muiBtnOfficeDelete } from "../utils/styleMUI";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export const AddBtn = ({ href, text }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      sx={muiBtnOfficeDelete}
      onClick={() => navigate(href)}
    >
      {text}
      <AddIcon />
    </Button>
  );
};

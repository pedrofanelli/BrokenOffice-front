import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { AddBtn } from "../../../commons/AddBtn";

import Table from "./Table/index";
import RadioGroup from "../../../commons/RadioGroup";

import { muiOfficeBar } from "../../../utils/styleMUI";

const AdminView = () => {
  const [type, setType] = useState(localStorage.getItem("value") || "all");
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          gap: 2,
        }}
      >
      </Box>
      <Box sx={muiOfficeBar}>
        <Typography variant="h4" color='text.primary'>Users</Typography>
        <AddBtn href="/admin/users/register" text="New User" />
      </Box>
        <RadioGroup setForType={[type, setType]} />
      <Table filterForType={type} />
    </div>
  );
};
export default AdminView
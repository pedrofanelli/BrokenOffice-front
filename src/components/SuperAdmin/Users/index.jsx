import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { AddBtn } from "../../../commons/AddBtn";

import RadioGroup from "../../../commons/RadioGroup";

import { muiOfficeBar } from "../../../utils/styleMUI";

import Table from "../../Admin/Users/Table";

const SuperAdminView = () => {
  const userType = useSelector((state) => state.user.type);

  const [type, setType] = useState(localStorage.getItem("type") || "all");

  return (
    <Box sx={{
      mt: 4,
      minHeight: '90vh',
      color: 'text.primary'
    }}>
       <Box sx={muiOfficeBar}>
        <Typography variant="h4" sx={{marginLeft:"40px"}}>Users</Typography>
        <AddBtn href="/superadmin/users/register" text="New User" />
      </Box>
        <RadioGroup setForType={[type, setType]} />
      <Table type={userType} filterForType={type} />
      </Box>
)
}
export default SuperAdminView
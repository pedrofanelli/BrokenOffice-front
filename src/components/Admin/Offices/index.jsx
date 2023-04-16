import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import {  setOffices } from "../../../state/office";
import { muiOfficeBar } from "../../../utils/styleMUI";
import {  axiosGetAllOffices } from "../../../utils/axios";
import { AddBtn } from "../../../commons/AddBtn";
import Table from "./Table"

export default function OfficeList() {
  const userType = useSelector((state) => state.user.type);
  const dispatch = useDispatch();
  const offices = useSelector((state) => state.office);
  useEffect(() => {
    const offices = axiosGetAllOffices();
    offices.then((offices) => dispatch(setOffices(offices)));
  }, [dispatch]);

  return (
    <>
      <Box sx={muiOfficeBar}>
      <Typography variant="h4" color='text.primary' sx={{marginLeft:"30px"}} >Offices</Typography>

        <AddBtn href="/admin/offices/register" text='New Office' />
      </Box>
      <Table type={userType} offices={offices}/>
    </>
  );
}

import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ReportData } from "./ReportData";
import { BackLink } from "../../../commons/BackLink";

const SingleTicket = () => {
  const { id } = useParams();

  const [singleReport, setSingleReport] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROUTE}/reports/single/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSingleReport(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Box
      sx={{
        mt: 4,
        color: "text.primary",
        minHeight: "89vh",
        paddingBottom:"30px"
      }}
    >
      <Box marginLeft={"30px"}>
        <BackLink text="Back to History" href="/user/history" />
      </Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Report
      </Typography>
      {singleReport ? (
        <ReportData singleReport={singleReport} />
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};
 export default SingleTicket
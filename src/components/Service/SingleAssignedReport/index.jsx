
import { Button, IconButton, Modal, TextField, Typography, LinearProgress } from "@mui/material";



import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BackLink } from "../../../commons/BackLink";
import { ReportDataService } from "./ReportData";
import { AddTask } from "@mui/icons-material";
import { styleEditProfile } from "../../../utils/styleMUI";
import { toast } from "react-hot-toast";
import { axiosGetInboxIssuer, axiosGetInboxSolver, axiosPutReportStatus } from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusReport } from "../../../state/updatedStatusReport";

const SingleTicketService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleReport = useSelector((state) => state.updateStatusReport)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROUTE}/reports/single/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(updateStatusReport(res.data))
      })
      .catch((err) => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleConfirm = async () => {
    
    try {
      const updtReport = await axiosPutReportStatus(id, {status: "in progress"})
      dispatch(updateStatusReport(updtReport))
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong...")
    }

  }

  return (
    <Box
      sx={{
        mt: 4,
        minHeight: '90vh',
        color: 'text.primary',
        paddingBottom:"30px"
      }}
    >
      <Box sx={{ ml: 2 }}>
        <BackLink text="Back to Assigned Reports" href="/service/report/all" />
      </Box>
      <Typography variant="h4" gutterBottom>
        Report
      </Typography>
      <Modal open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={styleEditProfile} component="form">
          <Typography variant="h5" gutterBottom sx={{textAlign:"center"}}>
            Are you sure to accept this report?
          </Typography>
          <Button
              onClick={handleConfirm}
              variant="contained"
              sx={{ mt: 2, mx: "auto" }}
            >
              Confirm
            </Button>
          </Box>
      </Modal>
      {
        singleReport?.status === "issued" && (
          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <Box sx={{width:"100%"}}>
            <IconButton
              sx={{ padding: 0, width:"50px" }}
              onClick={(event) => {
                setOpen(true)
              }}
            >
              <AddTask sx={{ fontSize: 50 }} color="primary" />
            </IconButton>
            </Box>
            <Typography variant="body" gutterBottom sx={{textAlign:"center", color:"grey"}}>
            Click to resolve issued report
          </Typography>
        </Box>
        )
      }
      {singleReport.image ? <ReportDataService singleReport={singleReport} />: <LinearProgress />}
    </Box>
  );
};

export default SingleTicketService
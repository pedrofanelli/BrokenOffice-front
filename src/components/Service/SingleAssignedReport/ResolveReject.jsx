import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { styleEditProfile } from "../../../utils/styleMUI";
import { toast } from "react-hot-toast";
import { axiosPutReportStatus } from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusReport } from "../../../state/updatedStatusReport";

export default function ResolveRejectBtn() {
  const dispatch = useDispatch();
  const singleReport = useSelector((state) => state.updateStatusReport)
  const [open, setOpen] = useState(false);
  const handleOpen = (e, status) => {
    setStatus(status)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    if(!title || !description) return toast.error('Description and Title must be filled')
    const obj = {status: status, title: title, description: description}
    try {
      const updtReport = await axiosPutReportStatus(singleReport._id, obj)
      dispatch(updateStatusReport(updtReport))
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong...")
    }
    
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          flexWrap: "wrap",
          gap: "2rem",
          
        }}
      >
        <Button variant="contained" onClick={(e) => handleOpen(e, 'resolved')}>
          Resolve
        </Button>
        <Button variant="contained" color="error" onClick={(e) => handleOpen(e, 'rejected')}>
          Reject
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <Typography variant="h6">Send an Email to the Issuer*</Typography>
          <Typography variant="subtitle1">
            *Please we need you to submit a descriptive reason of why the report
            was REJECTED or RESOLVED
          </Typography>
          <Divider></Divider>
          <TextField
            id="standard-multiline-static"
            label="Recipient"
            multiline
            placeholder="Recipient"
            variant="standard"
            value={singleReport.issuer.email}
            sx={{ my: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="Title"
            multiline
            placeholder="Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            multiline
            id="standard-multiline-static"
            label="Description"
            placeholder="Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2, mx: "auto" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { muiModal } from "../../../utils/styleMUI";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  axiosGetAssignedReportsService,
  axiosPutReportStatus,
} from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { setAssignedReports } from "../../../state/service";

export default function ModalEditStatus({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = React.useState(data.status);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.stopPropagation();
    handleOpen();
  }

  function handleSubmit(e) {
    e.preventDefault();
    axiosPutReportStatus(data?._id, { status: status }, handleClose);
    axiosGetAssignedReportsService().then((reports) => {
      dispatch(setAssignedReports(reports));
    });
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={(e) => handleClick(e)}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={muiModal}>
          <Box component="form" sx={{ textAlign: "center" }}>
            <Typography variant="h6">Report Status</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={data?.status}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  onChange={(e) => setStatus(e.target.value)}
                  value="in progress"
                  control={<Radio />}
                  label="In progress"
                />
                <FormControlLabel
                  onChange={(e) => setStatus(e.target.value)}
                  value="closed"
                  control={<Radio />}
                  label="Closed"
                />
                <FormControlLabel
                  onChange={(e) => setStatus(e.target.value)}
                  value="issued"
                  control={<Radio />}
                  label="Issued"
                />
              </RadioGroup>
              <Button onClick={handleSubmit} variant="contained" sx={{ mt: 1 }}>
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

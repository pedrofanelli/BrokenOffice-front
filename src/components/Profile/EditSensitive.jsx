import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styleEditProfile } from "../../utils/styleMUI";
import { Button, Link, TextField } from "@mui/material";
import useChange from "../../hooks/useChange";

export default function EditSensitive() {
  const {
    handleOpen,
    handleClose,
    handleEditPassSubmit,
    setOldPassword,
    setNewPassword,
    setRepeatPassword,
    open,
  } = useChange();

  return (
    <div>
      <Link
        component="button"
        variant="body2"
        onClick={handleOpen}
        sx={{ mt: 2 }}
        color="error"
      >
        Change Password
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <TextField
            id="standard-multiline-static"
            label="Old Password"
            multiline
            variant="standard"
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="New Password"
            multiline
            variant="standard"
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="Repeat Password"
            multiline
            variant="standard"
            onChange={(e) => setRepeatPassword(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <Button
            onClick={handleEditPassSubmit}
            variant="contained"
            sx={{ mt: 2, mx: "auto" }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styleEditProfile } from "../../utils/styleMUI";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import AddressAutocomplete from "mui-address-autocomplete";
import useChange from "../../hooks/useChange";

export default function EditProfile() {
  const offices = useSelector((state) => state.office);

  const {
    setInputName,
    setInputLastName,
    setInputRole,
    setInputOffice,
    handleAddressChange,
    handleOpen,
    handleClose,
    handleSubmit,
    open,
    user,
    inputName,
    inputLastName,
    inputRole,
    inputOffice,
  } = useChange();

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mt: "1rem", borderRadius: 20 }}
        onClick={handleOpen}
      >
        EDIT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <TextField
            id="standard-multiline-static"
            label="Name"
            multiline
            placeholder="New name..."
            variant="standard"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="Last Name"
            multiline
            placeholder="New lastName..."
            variant="standard"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="Role"
            multiline
            placeholder="New role..."
            variant="standard"
            value={inputRole}
            onChange={(e) => setInputRole(e.target.value)}
            sx={{ mb: ".5rem" }}
          />

          <Typography color="text.primary">
            Current Office:{" "}
            {user?.office?.address?.street
              ? user.office.address.street
              : "You haven't set an default office"}
            {user?.office?.name}
          </Typography>

          <TextField
            sx={{ mt: 1 }}
            select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputOffice}
            label="Office"
            name="Office"
            onChange={(e) => setInputOffice(e.target.value)}
          >
            {offices?.map((office) => (
              <MenuItem
                value={office?._id}
                key={office?._id}
              >{`${office?.name}, ${office?.address.street}`}</MenuItem>
            ))}
          </TextField>
          <Typography color="text.primary">
            Current Address:{" "}
            {user?.addressName
              ? user?.addressName
              : "You haven't set an address yet"}
          </Typography>
          <AddressAutocomplete
            sx={{ mt: 2 }}
            apiKey={process.env.REACT_APP_API_KEY}
            label="Address"
            fields={["geometry"]} // fields will always contain address_components and formatted_address, no need to repeat them
            onChange={(_, value) => {
              handleAddressChange(value);
            }}
          />
          <Button
            onClick={handleSubmit}
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

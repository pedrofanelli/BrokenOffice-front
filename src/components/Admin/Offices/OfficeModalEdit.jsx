import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Link, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styleEditProfile } from "../../../utils/styleMUI";
import { muiBtnOfficeDelete } from "../../../utils/styleMUI.js";
import { axiosPutOffice } from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateOffices } from "../../../state/office";
import AddressAutocomplete from "mui-address-autocomplete";

export default function OfficeModalEdit({ office }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const [region, setRegion] = React.useState(office.name);
  const [street, setStreet] = React.useState(office.address?.street);
  const [zip, setZip] = React.useState(office.address?.zip);
  const [floor, setFloor] = React.useState(office.address?.floor);
  const [coords, setCoords] = React.useState([]);

  function handleStreetChange(value) {
    if (value) {
      setStreet(value?.description);
      setRegion(value?.description.split(",")[1]);
    } else {
      setStreet("");
      setRegion("");
    }
    const lat = value?.geometry.location.lat();
    const lng = value?.geometry.location.lng();
    setCoords([lng, lat]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedOffice = {
      ...office,
      name: region,
      address: {
        street: street,
        zip: Number(zip),
        floor: floor,
      },
      location: { type: "Point", coordinates: coords },
    };
    axiosPutOffice(office._id, updatedOffice);
    dispatch(updateOffices(updatedOffice));
  }

  return (
    <div>
      <Link
        component="button"
        variant="body2"
        onClick={handleOpen}
        sx={{ mt: 2, color: "text.primary" }}
      >
        <EditIcon />
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form" onSubmit={handleSubmit}>
          <AddressAutocomplete
            apiKey={process.env.REACT_APP_API_KEY}
            label="Street"
            fields={["geometry"]}
            onChange={(_, value) => {
              handleStreetChange(value);
            }}
          />
          <TextField
            id="standard-multiline-static"
            label="Zip"
            multiline
            placeholder="New zip..."
            variant="standard"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <TextField
            id="standard-multiline-static"
            label="Floor"
            multiline
            placeholder="New floor..."
            variant="standard"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            sx={{ mb: ".5rem" }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={muiBtnOfficeDelete}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { axiosPostOffice } from "../../../../utils/axios";
import { muiBtnOfficeDelete } from "../../../../utils/styleMUI.js";
import { useDispatch } from "react-redux";
import { addOffice } from "../../../../state/office";
import AddressAutocomplete from "mui-address-autocomplete";
import { useNavigate } from "react-router";

export const OfficeAddForm = () => {
  const [region, setRegion] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [coords, setCoords] = React.useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  async function handleSubmit(e) {
    e.preventDefault();

    const newOffice = {
      name: region,
      address: {
        street: street,
        zip: Number(zip),
        floor: floor,
      },
      location: { type: "Point", coordinates: coords },
    };
    const newOfficeBack = await axiosPostOffice(newOffice);
    dispatch(addOffice(newOfficeBack));
    setStreet("");
    setRegion("");
    setZip("");
    setFloor("");
    setCoords([]);
    navigate("/admin/offices")
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "70%", color:'text.primary', display:"flex", flexDirection:"column", gap:2 }}
      >
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
          label="Region"
          multiline
          fullWidth
          placeholder="New region..."
          variant="standard"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          sx={{ mb: ".5rem" }}
        />
        <TextField
          id="standard-multiline-static"
          label="Zip"
          multiline
          fullWidth
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
          fullWidth
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
          style={{marginTop:"15px"}}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

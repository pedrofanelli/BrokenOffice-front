import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import getGeolocation from "../../../utils/geoLocation";
import {
  axiosGetAddressFromCoord,
  axiosGetClosestOffices,
} from "../../../utils/axios";
import AddressAutocomplete from "mui-address-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setOffice } from "../../../state/newReport";

export default function LocationForm() {
  const [choice, setChoice] = React.useState("currentAddress");
  const [geolocation, setGeolocation] = React.useState({});
  const [address, setAddress] = React.useState("");
  const [closestOffice, setClosestOffice] = React.useState([]);
  const [chosenOffice, setChosenOffice] = React.useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (choice === "currentAddress") {
      dispatch(setOffice(user.office));
    }
    if (choice === "newAddress") {
      getGeolocation()
        .then((position) => {
          setGeolocation(position);
          axiosGetAddressFromCoord(position.lat, position.lng).then((address) =>
            setAddress(address)
          );
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [choice, dispatch, user.office]);

  React.useEffect(() => {
    if (choice === "newAddress") {
      if (geolocation.lat && geolocation.lng) {
        axiosGetClosestOffices(geolocation.lat, geolocation.lng).then(
          (closestOffice) => setClosestOffice(closestOffice)
        );
      }
    }
  }, [choice, geolocation.lat, geolocation.lng, user.office]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Location
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="currentAddress"
              name="radio-buttons-group"
              onChange={(e) => {
                setChoice(e.target.value);
              }}
            >
              <FormControlLabel
                value="currentAddress"
                control={<Radio />}
                label="Keep my current preferred office"
              />
              <FormControlLabel
                value="newAddress"
                control={<Radio />}
                label="Geolocate me"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {choice === "newAddress" ? (
          <>
            <Grid item xs={12} md={12}>
              <Typography>{`Result address: ${address}`}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Not correct?</Typography>
              <AddressAutocomplete
                sx={{ mt: 2 }}
                apiKey={process.env.REACT_APP_API_KEY}
                label="Address"
                fields={["geometry"]} // fields will always contain address_components and formatted_address, no need to repeat them
                onChange={(_, value) => {
                  if (value) {
                    setAddress(value.formatted_address);
                    setGeolocation({
                      lat: value.geometry.location.lat(),
                      lng: value.geometry.location.lng(),
                    });
                  }
                }}
              />
            </Grid>
            <Grid sx={{ mt: 2 }} item xs={12} fullWidth>
              <Typography>
                {" "}
                Please choose the Office that suits you best:
              </Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ mt: 2 }} id="demo-simple-select-label">
                  Desk
                </InputLabel>
                <Select
                  sx={{ mt: 2 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chosenOffice}
                  label="Desk"
                  onChange={(e) => {
                    setChosenOffice(e.target.value);
                    dispatch(setOffice(e.target.value));
                  }}
                >
                  {closestOffice?.map((office) => (
                    <MenuItem key={office._id} value={office}>
                      <ListItemText
                        primary={`${office.address.street}, ${office.address.zip}, ${office.name}`}
                        secondary={`Open Reports: ${office.openReports}`}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        ) : (
          <>
            <Grid sx={{ mt: 2 }} item xs={12}>
              <Typography sx={{ fontWeight: "600" }} gutterBottom>
                {" "}
                Preferred office state:{" "}
              </Typography>
              {user?.office.address ? (
                <>
                  <Typography>{`${user.office.address.street}, ${user.office.address.zip}, ${user.office.name}`}</Typography>
                  <Typography>{`Open Reports: ${user.office.openReports}`}</Typography>
                </>
              ) : (
                <>
                  <Typography>
                    Sorry you have no default office! You can modify this on
                    your profile
                  </Typography>
                  <Typography>
                    Please choose <u>Geolocate me</u>
                  </Typography>
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}

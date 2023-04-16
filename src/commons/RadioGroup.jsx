import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import checkType from "../utils/checkType";

export default function RowRadioBRuttonsGroup({ setForType }) {
  const [type, setType] = setForType;
  const userType = useSelector((state) => state.user.type);

  React.useEffect(() => {
    if (checkType(userType) === 32) {
      if (localStorage.getItem("type")) {
        localStorage.removeItem("type");
        localStorage.setItem("type", type);
      } else {
        localStorage.setItem("type", type);
      }
    } else if (checkType(userType) === 66) {
      if (localStorage.getItem("value")) {
        localStorage.removeItem("value");
        localStorage.setItem("value", type);
      } else {
        localStorage.setItem("value", type);
      }
    }
  }, [type, userType]);

  return (
    <FormControl sx={{color:'text.primary'}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={type}
      >
        <FormControlLabel
          onChange={(e) => setType(e.target.value)}
          value="all"
          control={<Radio />}
          label="All"
        />
        <FormControlLabel
          onChange={(e) => setType(e.target.value)}
          value="standard"
          control={<Radio />}
          label="Standard"
        />
        <FormControlLabel
          onChange={(e) => setType(e.target.value)}
          value="service"
          control={<Radio />}
          label="Service"
        />
        <FormControlLabel
          onChange={(e) => setType(e.target.value)}
          value="admin"
          control={<Radio />}
          label="Admin"
        />
      </RadioGroup>
    </FormControl>
  );
}

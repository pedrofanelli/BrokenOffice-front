import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export const Form = ({ handleSubmit }) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: "70%", color: "text.primary" }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="Name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="lastName"
        label="Last Name"
        type="text"
        id="lastName"
        autoComplete="Last Name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email"
        type="email"
        id="Email"
        autoComplete="Email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="Password"
        autoComplete="Password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="repeatPassword"
        label="Repeat Password"
        type="password"
        id="Password"
        autoComplete="Password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="role"
        label="Role"
        type="text"
        id="role"
        autoComplete="Role"
      />
      <FormLabel radioGroup="true" id="demo-radio-buttons-group-label">
        Type
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="standard"
        name="type"
      >
        <FormControlLabel
          sx={{ m: "0 auto" }}
          value="standard"
          control={<Radio />}
          label="Standard"
        />
        <FormControlLabel
          sx={{ m: "0 auto" }}
          value="service"
          control={<Radio />}
          label="Service"
        />
      </RadioGroup>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
    </Box>
  );
};

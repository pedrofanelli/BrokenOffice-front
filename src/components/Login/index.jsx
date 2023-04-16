import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Container,
  InputAdornment,
  Modal,
  LinearProgress,
} from "@mui/material";
import { muiStyleLoginBtn, styleEditProfile } from "../../utils/styleMUI";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useRestore from "../../hooks/UseRestore";
import useImg from "../../hooks/useImg";

export default function SignInSide() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit } = useLogin();
  const { img } = useImg(
    "url(https://statics.globant.com/production/public/2023-02/Ref-Globant-Canada-2.jpg)"
  );
  const { setEmailToRestore, handleRestorePass, setOpen, open } = useRestore();

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEmailToRestore("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <TextField
            label="email to restore password"
            onChange={(e) => setEmailToRestore(e.target.value)}
          />
          <Button
            onClick={handleRestorePass}
            variant="contained"
            sx={{ mt: 2, mx: "auto" }}
          >
            Send
          </Button>
        </Box>
      </Modal>
      <Container component="main" maxWidth="lg" sx={{ minHeight: "86vh" }}>
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: img,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {img === "" && <LinearProgress />}
            </Grid>
            <Grid item xs={12} sm={8} md={5} elevation={6} square="true">
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={() => setShowPassword((i) => !i)}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log in
                  </Button>
                  <Grid sx={muiStyleLoginBtn}>
                    <Grid item xs>
                      <Link
                        variant="body1"
                        style={{ textDecoration: "none" }}
                        onClick={() => setOpen(true)}
                      >
                        <Typography color="text.primary">
                          Forgot your password?
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

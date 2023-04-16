import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const theme = useSelector(state => state.theme.mode)

  return (
    <Box className={theme === 'light' ? 'header-container-home home-text' : 'header-container-home-dark home-text'} >
      <Box sx={{ mt: 4 , color:'text.primary'}}>
        <Typography  variant="h3">Hey Glober!</Typography>
        <Typography variant="h6">
          Looks like you are not signed in...
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 20, mt: 3, backgroundColor: "white" }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Home
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useSelector(state => state.theme.mode)
  return (
      <Box className={theme === 'light' ? 'header-container-home home-text' : 'header-container-home-dark home-text'} >
        <Typography variant="h3" color={"text.primary"}>Error 404: Page not found</Typography>
        <Typography variant="h6" color={"text.primary"}>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 20, mt: 3, backgroundColor: "white" }}
          onClick={() => navigate("/")}
        >
          HOME PAGE
        </Button>
      </Box>
  );
};

export default NotFoundPage;

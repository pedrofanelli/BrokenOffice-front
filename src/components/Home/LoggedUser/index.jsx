import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import checkType from "../../../utils/checkType";
import { DashboardAdmin } from "./Dashboards/Admin/Dashboard";
import { DashboardService } from "./Dashboards/Service/Dashboard";
import { DashboardUser } from "./Dashboards/Standard/Dashboard";
import { DashboardSuperAdmin } from "./Dashboards/SuperAdmin/Dashboard";


const UserHome = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.mode);

  return (
    <Box
      className={
        theme === "light"
          ? "header-container-home home-text"
          : "header-container-home-dark home-text"
      }
      sx={{ color: "text.primary" }}
    >
      {checkType(user?.type) === 21 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", mb: "1rem" }}
          >{`Hey ${user.name} ${user.lastName}!`}</Typography>
          <DashboardUser />
        </Box>
      )}

      {checkType(user?.type) === 14 && (
        <Box sx={{ m: 4,}}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", mb: "1rem" }}
          >{`Hey ${user.name} ${user.lastName}!`}</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <DashboardService />
            </Grid>
            <Grid item xs={12} md={5}>
              <DashboardUser />
            </Grid>
          </Grid>
        </Box>
      )}

      {checkType(user?.type) === 66 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", mb: "1rem" }}
          >{`Hey ${user.name} ${user.lastName}!`}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <DashboardAdmin />
            </Grid>
            <Grid item xs={12} md={5}>
              <DashboardUser />
            </Grid>
          </Grid>
        </Box>
      )}

      {checkType(user?.type) === 32 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", mb: "1rem" }}
          >{`Hey ${user.name} ${user.lastName}!`}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <DashboardSuperAdmin />
            </Grid>
            <Grid item xs={12} md={5}>
              <DashboardUser />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default UserHome;

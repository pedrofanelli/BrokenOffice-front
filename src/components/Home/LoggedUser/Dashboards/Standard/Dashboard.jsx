import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { muiDashboardHome } from "../../../../../utils/styleMUI";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { ReportListHomeUser } from "./ReportListHome";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router";

export const DashboardUser = () => {
  const navigate = useNavigate();

  return (

    <Box sx={muiDashboardHome}>
      <Card sx={{ width: 345, height: 210, display:'flex', flexDirection:'column', justifyContent:'center' }} onClick={() => navigate("/user/new-ticket")}>
        <CardActionArea>
          <CardContent>
            <BuildCircleIcon />
            <Typography gutterBottom variant="h5" component="div">
              New Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Report an incident with your office supplies
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>

      <Card
        sx={{
          minWidth: 345,
          maxWidth:345,
          mt: "1rem",
        }}
      >
        <CardActionArea>

          <CardContent>

            <HistoryIcon />
            <Typography
              sx={{ p: 0, m: 0 }}
              gutterBottom
              variant="h5"
              component="div"
            >
              History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get access to your issued report history
            </Typography>
          </CardContent>
          <CardContent>
            <ReportListHomeUser />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

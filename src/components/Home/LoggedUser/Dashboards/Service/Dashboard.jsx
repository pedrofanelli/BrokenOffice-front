import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { muiDashboardHome } from "../../../../../utils/styleMUI";
import HistoryIcon from "@mui/icons-material/History";
import { ReportListHomeService } from "./ReportsListHome";


export const DashboardService = () => {
  return (
    <Box sx={muiDashboardHome}>
      <Card sx={{ width: 345, minHeight: 210}}>
        <CardActionArea>
          <CardContent>
            <HistoryIcon />
            <Typography  variant="h5" >
              Pending Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access the reports assigned to you
            </Typography>
          </CardContent>
          <CardContent >
            <ReportListHomeService />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

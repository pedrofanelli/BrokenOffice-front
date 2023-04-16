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
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import checkType from "../../../../../utils/checkType";

export const DashboardSuperAdmin = () => {
  const navigate = useNavigate();
  const userType = useSelector(state => state.user.type)

  let num = checkType(userType)
  return (
    <Box sx={muiDashboardHome}>
      <Card
        sx={{ minWidth: 345, height: 210, display:'flex', flexDirection:'column', justifyContent:'center' }}
        onClick={() => navigate("/admin/offices")}
      >
        <CardActionArea>
          <CardContent>
            <BusinessIcon />
            <Typography gutterBottom variant="h5" component="div">
              Globant Offices
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {num === 66 ? 'View, create and delete offices':'View, create, edit and delete offices'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>

      <Card
        sx={{ minWidth: 345, height: 210, mt: "1rem", display:'flex', flexDirection:'column', justifyContent:'center' }}
        onClick={() => navigate(`/${num === 66 ? "admin": "superadmin"}/users`)}
      >
        <CardActionArea>
          <CardContent>
            <PeopleAltIcon />
            <Typography gutterBottom variant="h5" component="div">
              Globant Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {num === 66 ? 'View, create and delete users':'View, create, edit and delete users'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

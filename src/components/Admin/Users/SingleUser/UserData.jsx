import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import checkType from "../../../../utils/checkType";

export const UserData = ({ singleUser }) => {
  function checkSingleUserType(type) {
    switch (checkType(type)) {
      case 66:
        return "Admin";

      case 14:
        return "Service";

      case 21:
        return "Standard";

      case 32:
        return "SuperAdmin";

      default:
        break;
    }
  }

  const imageSrc =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={16}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: { xs: "85%", sm: "80%" }, margin: "0 auto" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            alt="Input Image"
            src={singleUser.user.picture ? singleUser.user.picture : imageSrc}
            sx={{ maxWidth: "70%" }}
          ></Box>
        </Grid>

        <Grid item xs={16} md={8}>
          <Divider></Divider>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0  }}>
              <ListItemText primary="ID:" sx={{ maxWidth: '5rem'}} />
              <Typography
                variant="subtitle1"
                sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}
              >
                {singleUser?.user._id}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Name:" sx={{ maxWidth: '5rem'}} />
              <Typography
                variant="subtitle1"
                sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}
              >{`${singleUser?.user.name} ${singleUser?.user.lastName}`}</Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Email:" sx={{ maxWidth: '5rem'}} />
              <Typography
                variant="subtitle1"
                sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}
              >
                {singleUser?.user.email}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Address:" sx={{ maxWidth: '5rem'}} />
              <Typography
                variant="subtitle1"
                sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}
              >
                {singleUser?.user.addressName}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Role:" sx={{maxWidth: '5rem'}} />
              <Typography
                variant="subtitle1"
                sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}
              >
                {singleUser?.user.role}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Type:" sx={{ maxWidth: '5rem'}} />
              <Typography  variant="subtitle1">
                {singleUser?.user.type &&
                  checkSingleUserType(singleUser.user.type)}
              </Typography>
            </ListItem>
            <Divider></Divider>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

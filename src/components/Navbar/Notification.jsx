import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useImg from "../../hooks/useImg";
import { muiInboxCircle } from "../../utils/styleMUI";

export const Notification = ({ notification }) => {
  const { img } = useImg(
    "https://statics.globant.com/production/public/2022-12/Mask%20Group%2061.jpeg"
  );

  return (
    <>
      <Box sx={{ mr: 2 }} >
        <Avatar
          src={notification.senderPic ? notification.senderPic : img}
        ></Avatar>
      </Box>

      <Box sx={{ mr: 2, width: "13rem" }}>
        <Typography sx={{ fontWeight: "600" }}>
          {notification.sender}
        </Typography>
        <Typography variant="subtitle2">
          {notification.lastMessage.length > 20
            ? notification.lastMessage.substring(0, 20)
            : notification.lastMessage}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: "9", opacity: "0.9" }}>
          {new Date(notification.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Typography>
        <Box sx={muiInboxCircle}>
          <Typography>{notification.notifications}</Typography>
        </Box>
      </Box>
    </>
  );
};

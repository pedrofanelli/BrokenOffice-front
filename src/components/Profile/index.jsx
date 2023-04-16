import {
  Avatar,
  Input,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import {useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import EditSensitive from "./EditSensitive";
import { Box } from "@mui/system";
import { styleEditProfile } from "../../utils/styleMUI";
import useImg from "../../hooks/useImg";
import useChange from "../../hooks/useChange";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [hover, setHover] = useState(false);

  
  const {handleChangeInput, open, handleOpen, handleClose} = useChange()

  const { img } = useImg(
    "https://statics.globant.com/production/public/2022-12/Mask%20Group%2061.jpeg"
  );

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <Input type="file" onChange={handleChangeInput} />
        </Box>
      </Modal>
      <div className="header-container">
        <div className="header-profile">
          <img
            className="header-image"
            src={img === "" ? <LinearProgress /> : img}
            alt="header profile"
          />
        </div>
      </div>

      <div className="header-avatar">
        {hover ? (
          <Avatar
            sx={{
              backgroundColor: "gray",
              width: "10rem",
              height: "10rem",
              cursor: "pointer",
            }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
            onMouseOut={() => setHover(false)}
            onClick={handleOpen}
          >
            <EditIcon onMouseEnter={() => setHover(true)} />
          </Avatar>
        ) : (
          <Avatar
            src={user.picture ? user.picture : ""}
            onMouseEnter={() => setHover(true)}
            sx={{ width: "10rem", height: "10rem" }}
          ></Avatar>
        )}
      </div>

      <div className="profile-data">
        <Typography color="text.primary" variant="h6">
          {" "}
          {user?.name}{" "}
        </Typography>
        <Typography color="text.primary" variant="h6">
          {" "}
          {user?.lastName}{" "}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#666666" }}>
          {user?.role}
        </Typography>
        <Typography color="text.primary">{user?.email}</Typography>
        <Typography variant="p">{user?.address}</Typography>
      </div>

      <EditProfile />
      <EditSensitive />
    </Box>
  );
};

export default Profile;

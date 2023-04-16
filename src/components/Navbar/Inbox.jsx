import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, ButtonGroup, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Notification } from "./Notification";
import { useNavigate } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import { axiosGetInboxIssuer, axiosGetInboxSolver } from "../../utils/axios";
import { notificationsIssuer, notificationsSolver } from "../../state/chat";

export default function Inbox() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [serviceOption, setServiceOption] = React.useState("assigned");
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const serviceNot = useSelector((state) => state.chat.notificationsSolver);
  const standardNot = useSelector((state) => state.chat.notificationsIssuer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTotalNotifications = () => {
    if (user?.type === process.env.REACT_APP_BETA) {
      if (serviceNot?.total && standardNot?.total) {
        return serviceNot?.total + standardNot?.total;
      } else if (!serviceNot?.total || !standardNot?.total) {
        if (serviceNot?.total) return serviceNot?.total;
        if (standardNot?.total) return standardNot?.total;
      } else {
        return 0;
      }
    } else {
      return standardNot?.total;
    }
  };

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (user) {
      if (user?.type === process.env.REACT_APP_BETA) {
        axiosGetInboxSolver().then((res) => dispatch(notificationsSolver(res)));
        axiosGetInboxIssuer().then((res) => dispatch(notificationsIssuer(res)));
      } else {
        axiosGetInboxIssuer().then((res) => dispatch(notificationsIssuer(res)));
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (id) => {
    if (user?.type === process.env.REACT_APP_BETA) {
      if (serviceOption === "issued") {
        navigate(`/user/ticket/${id}`);
      } else {
        navigate(`/service/ticket/${id}`);
      }
    } else {
      navigate(`/user/ticket/${id}`);
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={getTotalNotifications()} color="primary">
          <EmailIcon></EmailIcon>
        </Badge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {user?.type === process.env.REACT_APP_BETA ? (
          <div>
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              sx={{ p: 1, width: "100%" }}
            >
              <Button
                sx={{
                  background: serviceOption === "assigned" && "#39B54A",
                  color: serviceOption === "assigned" && "black",
                  width: "12rem",
                }}
                onClick={() => setServiceOption("assigned")}
              >
                Assigned Reports
              </Button>
              <Button
                sx={{
                  background: serviceOption === "issued" && "#39B54A",
                  color: serviceOption === "issued" && "black",
                  width: "12rem",
                }}
                onClick={() => setServiceOption("issued")}
              >
                My Reports
              </Button>
            </ButtonGroup>

            {serviceOption === "issued" ? (
              standardNot?.notifications ? (
                standardNot.notifications?.map((notification, index) => (
                  <>
                    <MenuItem
                      key={index}
                      onClick={(e) =>
                        handleNotificationClick(notification.report)
                      }
                      id={notification?.report}
                    >
                      {notification && (
                        <Notification notification={notification} />
                      )}
                    </MenuItem>
                    <Divider></Divider>
                  </>
                ))
              ) : (
                <Box sx={{ p: 1 }}>
                  <Typography sx={{ ml: 1 }}>{standardNot}...</Typography>
                </Box>
              )
            ) : serviceNot?.notifications ? (
              serviceNot.notifications?.map((notification, index) => (
                <>
                  <MenuItem
                    key={index}
                    onClick={(e) =>
                      handleNotificationClick(notification.report)
                    }
                    id={notification?.report}
                  >
                    {notification && (
                      <Notification notification={notification} />
                    )}
                  </MenuItem>
                  <Divider></Divider>
                </>
              ))
            ) : (
              <Typography sx={{ p: 1, ml: 1 }}>{serviceNot}...</Typography>
            )}
          </div>
        ) : standardNot?.notifications ? (
          standardNot.notifications?.map((notification, index) => (
            <>
              <MenuItem
                key={index}
                onClick={(e) => handleNotificationClick(notification.report)}
              >
                {notification && <Notification notification={notification} />}
              </MenuItem>
              <Divider></Divider>
            </>
          ))
        ) : (
          <Typography sx={{ p: 1, mx: 1 }}>{standardNot}...</Typography>
        )}
      </Menu>
    </div>
  );
}

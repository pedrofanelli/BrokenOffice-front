import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../state/user";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import checkType from "../../utils/checkType";
import EngineeringIcon from "@mui/icons-material/Engineering";

export default function MenuNav() {
  const user = useSelector((state) => state.user);
  const ROUTE = process.env.REACT_APP_ROUTE;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    handleClose();
    try {
      const user = await axios.post(
        `${ROUTE}/user/logout`,
        {},
        { withCredentials: true }
      );
      if (user) dispatch(setUser({}));
      localStorage.removeItem("userPWA");
      localStorage.removeItem("officesPWA");
      localStorage.removeItem("personalReportsPWA");
      localStorage.removeItem("serviceReportsPWA");
      localStorage.removeItem("allUsersPWA");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {user?.email ? (
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={user.picture ? user.picture : ""}
                  sx={{ width: 32, height: 32 }}
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/user/profile");
              }}
            >
              <Avatar src={user.picture ? user.picture : ""} /> Profile
            </MenuItem>
            <Divider />
            {checkType(user.type) === 14 && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/service/report/all");
                }}
              >
                <ListItemIcon>
                  <EngineeringIcon fontSize="small" />
                </ListItemIcon>
                Assigned Reports
              </MenuItem>
            )}

            {checkType(user.type) === 66 && (
              <div>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/admin/users");
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  Users
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/admin/offices");
                  }}
                >
                  <ListItemIcon>
                    <AddLocationIcon fontSize="small" />
                  </ListItemIcon>
                  Offices
                </MenuItem>
              </div>
            )}

            {checkType(user.type) === 32 && (
              <div>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/superadmin/users");
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  Users
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/admin/offices");
                  }}
                >
                  <ListItemIcon>
                    <AddLocationIcon fontSize="small" />
                  </ListItemIcon>
                  Offices
                </MenuItem>
              </div>
            )}

            {checkType(user.type) !== 404 && (
              <div>
                <MenuItem
                  onClick={() => {
                    navigate("/user/new-ticket");
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <AddCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  New Report
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/user/history");
                  }}
                >
                  <ListItemIcon>
                    <ConfirmationNumberIcon fontSize="small" />
                  </ListItemIcon>
                  Reports
                </MenuItem>
              </div>
            )}

            <MenuItem onClick={() => handleLogout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/login")} className="btn-login">
            LOGIN
          </button>
        </div>
      )}
    </>
  );
}

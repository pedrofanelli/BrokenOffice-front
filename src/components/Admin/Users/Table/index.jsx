import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import {
  axiosDeleteUser,
  axiosGetAllUsers,
  axiosPutUserType,
} from "../../../../utils/axios";
import { deleteUser, setAllUsers } from "../../../../state/allUsers";


import { Columns } from "./Columns";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styleEditProfile } from "../../../../utils/styleMUI";
import checkType from "../../../../utils/checkType";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import filter from "../../../../utils/filter";

export default function BasicExampleDataGrid({ type, filterForType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.changeType);
  const [userType, setUserType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [data, setData] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleClick = (user) => {
    if (
      user.type === process.env.REACT_APP_ALPHA &&
      userType !== process.env.REACT_APP_OMEGA
    )
      return toast.error("You can't delete another admin");
    if (
      user.type === process.env.REACT_APP_OMEGA
    )
      return toast.error("Can't delete the owner");
    handleConfirm(user.email)
  };

  const handleConfirm = (data) => {
    setOpen2(true);
    setData(data);
  }


  const handleSubmit = () => {
    const obj = { email: user.email, type: userType };
    axiosPutUserType(obj)
      .then((res) => {
        toast.success(res);
        handleClose();
        axiosGetAllUsers().then((users) => dispatch(setAllUsers(users)));
      })
      .catch(() => toast.error("Invalid Changes"));
  };

  React.useEffect(() => {
    axiosGetAllUsers().then((users) => {
      dispatch(setAllUsers(users))
      localStorage.setItem("allUsersPWA", JSON.stringify(users))
    }).catch(() => {
      const userss = JSON.parse(localStorage.getItem("allUsersPWA"));
      if (userss) dispatch(setAllUsers(userss))
    })
  }, [dispatch]);

  const columns = Columns(type, handleOpen, handleClick);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{color:"text.primary"}} />
        <GridToolbarFilterButton sx={{color:"text.primary"}} />
        <GridToolbarExport sx={{color:"text.primary"}} />
      </GridToolbarContainer>
    );
  }


  


  const submitConfirm = async () => {
    await axiosDeleteUser(data);
    dispatch(deleteUser(data));
    setOpen2(false)
    setData("")
  }

  return (
    <Box sx={{ height: '77vh', width: "100%", backgroundColor:'secondary.main'}}>
      <Modal open={open2}
        onClose={() => {
          setOpen2(false);
          
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={styleEditProfile} component="form">
          <Typography variant="h5" gutterBottom sx={{textAlign:"center"}}>
            Are you sure to delete this user?
          </Typography>
          <Button
              onClick={submitConfirm}
              variant="contained"
              sx={{ mt: 2, mx: "auto" }}
            >
              Confirm
            </Button>
          </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEditProfile} component="form">
          <FormControl
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "secondary.main",
            }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={userType}
              name="radio-buttons-group"
            >
              <FormControlLabel
                onChange={(e) => setUserType(e.target.value)}
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                onChange={(e) => setUserType(e.target.value)}
                value="service"
                control={<Radio />}
                label="Service"
              />
              <FormControlLabel
                onChange={(e) => setUserType(e.target.value)}
                value="standard"
                control={<Radio />}
                label="Standard"
              />
            </RadioGroup>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 2, mx: "auto" }}
            >
              Confirm
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <DataGrid
        sx={{ padding: 1, backgroundColor: "secondary.main" }}
        columns={columns}
        rows={filterForType === "all" ? users : filter(filterForType, users)}
        rowHeight={80}
        getRowId={(row) => row._id}
        slots={{ toolbar: CustomToolbar }}
        onRowClick={(event, rowData) => {
          navigate(`/admin/user/${event.id}`);
        }}
      />
    </Box>
  );
}

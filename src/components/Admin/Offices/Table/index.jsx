import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { Columns } from "./Columns";
import { axiosDeleteOffice } from "../../../../utils/axios";
import { deleteOffice } from "../../../../state/office";
import { Button, Modal, Typography } from "@mui/material";
import { styleEditProfile } from "../../../../utils/styleMUI";

export default function BasicExampleDataGrid({ type, offices }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState("")

  function handleClick(id) {
    setId(id);
    setOpen(true);
  }

  const columns = Columns(type, handleClick);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{color:"text.primary"}} />
        <GridToolbarFilterButton sx={{color:"text.primary"}} />
        <GridToolbarExport sx={{color:"text.primary"}} />
      </GridToolbarContainer>
    );
  }

  const handleConfirm = async () => {
    await axiosDeleteOffice(id);
    dispatch(deleteOffice(id));
    setId("")
    setOpen(false)
  }

  return (
    <Box sx={{ height: "85vh", width: "100%", backgroundColor:'secondary.main' }}>
      <Modal open={open}
        onClose={() => {
          setOpen(false);
          setId("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={styleEditProfile} component="form">
          <Typography variant="h5" gutterBottom sx={{textAlign:"center"}}>
            Are you sure to delete this office?
          </Typography>
          <Button
              onClick={handleConfirm}
              variant="contained"
              sx={{ mt: 2, mx: "auto" }}
            >
              Confirm
            </Button>
          </Box>
      </Modal>
      <DataGrid
        sx={{ padding: 1, backgroundColor: "secondary.main" }}
        columns={columns}
        rows={offices}
        rowHeight={80}
        getRowId={(row) => row._id}
        slots={{ toolbar: CustomToolbar }}
      />
    </Box>
  );
}

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
import { Columns } from "./Columns";
import { axiosGetAssignedReportsService } from "../../../utils/axios";
import { setAssignedReports } from "../../../state/service";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function ServerReportList() {
  const reports = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.user.type);
  const columns = Columns(type);
  const navigate = useNavigate()

  React.useEffect(() => {
    axiosGetAssignedReportsService().then((reports) => {
      dispatch(setAssignedReports(reports));
      localStorage.setItem("serviceReportsPWA", JSON.stringify(reports))
    }).catch(() => {
      const reportss = JSON.parse(localStorage.getItem("serviceReportsPWA"));
      dispatch(setAssignedReports(reportss));
    })
  }, [dispatch]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{color:"text.primary"}} />
        <GridToolbarFilterButton sx={{color:"text.primary"}} />
        <GridToolbarExport sx={{color:"text.primary"}} />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ height: "85vh", width: "100%", backgroundColor:'secondary.main' }}>
        <Typography variant="h4" color='secondary.dark' sx={{py: 2}}>Assigned Reports</Typography>
      <DataGrid
        sx={{ padding: 1, backgroundColor:'secondary.main' }}
        columns={columns}
        rows={reports}
        rowHeight={80}
        getRowId={(row) => row._id}
        slots={{ toolbar: CustomToolbar }}
        onRowClick={(event, rowData) => {
            navigate(`/service/ticket/${event.id}`);
          }}
      />
    </Box>
  );
}

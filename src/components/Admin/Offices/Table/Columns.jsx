import {  IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import DeleteBtn from "../../../../commons/DeleteBtn";
import checkType from "../../../../utils/checkType";
import OfficeModalEdit from "../OfficeModalEdit";

export const Columns = (type, handleClick) => {
  let columns = [];

  const number = checkType(type);
  return number === 32
    ? (columns = [
        {
          field: "name",
          headerName: "Region",
          headerAlign: "center",
          align: "center",
          sortable: true,
          editable: false,
          flex: 0.5,
        },
        {
          field: "a",
          headerName: "Address",
          headerAlign: "center",
          align: "center",
          flex: 0.5,
          sortable: true,
          editable: false,
          renderCell: (params) =>
            params.row.address.street.length > 14 ? (
              <Tooltip title={params.row.address.street} arrow>
                <span>{`${params.row.address.street.slice(0, 14)}...`}</span>
              </Tooltip>
            ) : (
              params.row.address.street
            ),
        },
        {
          field: "b",
          headerName: "Edit",
          headerAlign: "center",
          align: "center",
          sortable: false,
          editable: false,
          flex: 0.5,
          renderCell: (params) => <OfficeModalEdit office={params.row} />,
        },
        {
          field: "c",
          headerName: "Delete",
          headerAlign: "center",
          align: "center",
          sortable: false,
          flex: 0.5,
          editable: false,
          renderCell: (params) => (
            <IconButton onClick={() => handleClick(params.row._id)}>
              <DeleteBtn />
            </IconButton>
          ),
        },
      ])
    // eslint-disable-next-line no-unused-vars
    : (columns = [
        {
          field: "name",
          headerName: "Region",
          headerAlign: "center",
          align: "center",
          sortable: true,
          editable: false,
          flex: 0.5,
        },
        {
          field: "a",
          headerName: "Address",
          headerAlign: "center",
          align: "center",
          flex: 0.5,
          sortable: true,
          editable: false,
          renderCell: (params) =>
            params.row.address.street.length > 14 ? (
              <Tooltip title={params.row.address.street} arrow>
                <span>{`${params.row.address.street.slice(0, 14)}...`}</span>
              </Tooltip>
            ) : (
              params.row.address.street
            ),
        },
        {
          field: "c",
          headerName: "Delete",
          headerAlign: "center",
          align: "center",
          sortable: false,
          flex: 0.5,
          editable: false,
          renderCell: (params) => (
            <IconButton onClick={() => handleClick(params.row._id)}>
              <DeleteBtn />
            </IconButton>
          ),
        }
      ]);
};

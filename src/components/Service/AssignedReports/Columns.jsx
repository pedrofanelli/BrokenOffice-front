import checkType from "../../../utils/checkType";

export const Columns = (type, handleOpen) => {
  const number = checkType(type);

  return (
    number === 14 && [
      {
        field: "Date",
        headerName: "Date",
        headerAlign: "center",
        align: "center",
        description: "This column has a value getter and is not sortable.",
        sortable: true,
        flex: 0.5,
        valueGetter: (params) => `${params.row.date?.substring(0, 10) || ""}`,
      },
      {
        field: "Title",
        headerName: "Title",
        headerAlign: "center",
        align: "center",
        description: "This column has a value getter and is not sortable.",
        sortable: true,
        flex: 0.5,
        valueGetter: (params) => `${params.row?.title || ""}`,
      },
      {
        field: "Sender",
        headerName: "Sender",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
        editable: false,
        valueGetter: (params) =>
          `${params.row?.issuer?.name || ""} ${params.row?.issuer?.lastName || ""}`,
      },
      {
        field: "Status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
        editable: false,
        valueGetter: (params) =>
          `${params.row?.status || ""}`,
      },
    ]
  );
};

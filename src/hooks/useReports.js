import { useEffect, useState } from "react";

const useReports = (reports, reportsOtherUser) => {
  const [rowData, setRowData] = useState("");

  useEffect(() => {
    reportsOtherUser ? setRowData(reportsOtherUser) : setRowData(reports);
  }, [reports, reportsOtherUser]);
  return {
    rowData,
  };
};

export default useReports;

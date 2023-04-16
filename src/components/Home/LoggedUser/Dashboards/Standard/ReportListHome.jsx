import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CardBtn from "../../../../../commons/CardBtn";
import { setAllReports } from "../../../../../state/allReports";
import { axiosGetReportHistory } from "../../../../../utils/axios";

export const ReportListHomeUser = () => {
  const [handleClick, setHandleClick] = useState(false);
  const reports = useSelector((state) => state.allReports);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosGetReportHistory().then((data) => dispatch(setAllReports(data)));
  }, [dispatch]);

  return (
    <div>
      <CardBtn
        text={"History"}
        rute={"/user/history"}
        handleClick={handleClick}
        setHandleClick={setHandleClick}
      />
      <TableContainer sx={handleClick ? { maxHeight: 250 } : { height: 12 }}>
        {handleClick && (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ minWidth: 100 }}
                  align={"center"}
                  sx={{ }}
                >
                  Title
                </TableCell>
                <TableCell
                  style={{ minWidth: 100 }}
                  align={"center"}
                  sx={{  }}
                >
                  State
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={
                handleClick
                  ? { overflow: "auto" }
                  : { overflow: "auto", display: "none" }
              }
            >
              {reports.map((ticket) => {
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={ticket._id}
                      onClick={() => navigate(`/user/ticket/${ticket._id}`)}
                    >
                      <TableCell key={ticket._id} align={"center"}>
                        {ticket.title}
                      </TableCell>

                      <TableCell key={ticket._id} align={"center"}>
                        {ticket.status}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

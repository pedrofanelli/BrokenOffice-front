import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CardBtn from "../../../../../commons/CardBtn";
import { setAssignedReports } from "../../../../../state/service";
import { axiosGetAssignedReportsService } from "../../../../../utils/axios";


export const ReportListHomeService = () => {
  const [handleClick, setHandleClick] = useState(false);
  const reports = useSelector((state) => state.service);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    axiosGetAssignedReportsService().then((reports) => {
      dispatch(setAssignedReports(reports));
    });
  }, [dispatch]);

  return (
    <div>
      <CardBtn text={'All Reports'} rute={'/service/report/all'} handleClick={handleClick} setHandleClick={setHandleClick}/>
      <TableContainer sx={handleClick ? { maxHeight: 250 } : { height: 12 }}>
        {handleClick && (<Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 100 }} align={"center"}>
                Title
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align={"center"}>
                Issuer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
          style={
            handleClick
              ? { overflow: "auto" }
              : { overflow: "auto", display: "none" }
          }
          >
            {reports
              .filter((ticket) => ticket.status === "issued")
              .map((ticket) => {
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={ticket._id}
                      onClick={() => navigate(`/service/ticket/${ticket._id}`)}
                    >
                      <TableCell key={(ticket.date)} align={"center"} >
                        {ticket.title}
                      </TableCell>

                      <TableCell key={(ticket.title)} align={"center"}>
                        {ticket.issuer.name} {ticket.issuer.lastName}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>)}
      </TableContainer>
    </div>
  );
};

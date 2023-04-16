import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function ReviewNewTicket() {
  const newReport = useSelector(state => state.newReport)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Title:' />
          <Typography variant="subtitle1" sx={{ maxWidth: '80%', wordWrap: "break-word" }}>{newReport.title}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Description:' />
          <Typography variant="subtitle1" sx={{ maxWidth: '80%', wordWrap: "break-word" }}>{newReport.description}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Image:" />
          <Box component="img" alt="Report" src={newReport.image} sx={{maxWidth: '20vh', maxHeight: '20vh'}}></Box>
        </ListItem>
        
      <ListItem sx={{ py: 1, px: 0 }} >
          <ListItemText primary='Office:'  />
          <Typography align='right' variant="subtitle1">{`${newReport.office.address.street}, ${newReport.office.address.zip}, ${newReport.office.name}`}</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

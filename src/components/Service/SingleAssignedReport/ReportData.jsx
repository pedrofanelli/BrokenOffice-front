import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Chat from "../../Chat";
import ResolveRejectBtn from "./ResolveReject";
import { useSelector } from "react-redux";

export const ReportDataService = () => {
  const singleReport = useSelector((state) => state.updateStatusReport)
  const imageSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
  return (
    <div>
      {" "}
      <Grid
        container
        spacing={2}
        columns={16}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: "70%", margin: "0 auto" }}
      >
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            alt="Input Image"
            src={singleReport.image ? singleReport?.image : imageSrc}
            sx={{ maxWidth: "250px" }}
          ></Box>
        </Grid>

        <Grid item xs={16} md={8}>
          <Divider></Divider>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="ID:" sx={{ maxWidth: "7rem" }} />
              <Typography variant="subtitle1" sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}>{singleReport?._id}</Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Issuer:" sx={{ maxWidth: "7rem" }} />
              <Typography
                align="right"
                variant="subtitle1"
                sx={{ maxWidth: "80%" }}
              >
                {singleReport.issuer
                  ? `${singleReport?.issuer.name} ${singleReport?.issuer.lastName}`
                  : ""}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Title:" sx={{ maxWidth: "7rem" }} />
              <Typography variant="subtitle1">{singleReport?.title}</Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Description:" sx={{ maxWidth: "7rem" }} />
              <Typography
                variant="subtitle1"
                maxWidth={"50%"}
                sx={{ wordWrap: "break-word", textAlign: "right" }}
              >
                {singleReport?.description}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Date of issue:" sx={{ maxWidth: "7rem" }} />
              <Typography
                variant="subtitle1"
                maxWidth={"50%"}
                sx={{ wordWrap: "break-word", textAlign: "right" }}
              >
                {singleReport?.date?.substring(0, 10)}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Office:" sx={{ maxWidth: "7rem" }} />
              <Typography variant="subtitle1" sx={{
                  wordWrap: "break-word",
                  maxWidth: { xs: "60%", sm: "80%" },
                }}>
                {singleReport.office &&
                  `${singleReport?.office.address.street}, ${singleReport?.office.address.zip}, ${singleReport?.office.address.floor} ${singleReport.office.name}`}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Product:" sx={{ maxWidth: "7rem" }} />
              <Typography align="right" variant="subtitle1">
                {singleReport?.product}
              </Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Status:" sx={{ maxWidth: "7rem" }} />
              <Typography align="right" variant="subtitle1">
                {singleReport?.status}
              </Typography>
            </ListItem>
            <Divider></Divider>
            
            {
              singleReport.status === "in progress" && (<>
                <ListItem sx={{ py: 2, px: 0 }}>
              <ListItemText primary="Resolve:" />
              {singleReport && <ResolveRejectBtn singleReport={singleReport} />}
            </ListItem>
            <Divider></Divider>
            </>
              )
            }

            {
              (singleReport.status === "resolved" || singleReport.status === "rejected") && (<>
                <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText sx={{ maxWidth: "7rem" }} primary={singleReport.status === "resolved" ? `Resolved title:` : `Rejected title:`} />
              <Typography variant="subtitle1">{singleReport?.reason.title}</Typography>
            </ListItem>
            <Divider></Divider>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText sx={{ maxWidth: "7rem" }} primary={singleReport.status === "resolved" ? `Resolved description:` : `Rejected description:`} />
              <Typography
                variant="subtitle1"
                maxWidth={"50%"}
                sx={{ wordWrap: "break-word", textAlign: "right" }}
              >
                {singleReport?.reason.description}
              </Typography>
            </ListItem>
            <Divider></Divider>
              </>)
            }
            
          </List>
          {singleReport.status === "in progress" && <Chat report={singleReport?._id} chatType={"assigned"}/>}
        </Grid>
      </Grid>
    </div>
  );
};

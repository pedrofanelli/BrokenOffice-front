import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DescriptionForm from "./DescriptionForm";
import LocationForm from "./LocationForm";
import ReviewNewTicket from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { axiosGetReportHistory, axiosPostNewReport } from "../../../utils/axios";
import { clearReport } from "../../../state/newReport";
import { setAllReports } from "../../../state/allReports";

const steps = ["Description", "Location", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DescriptionForm />;
    case 1:
      return <LocationForm />;
    case 2:
      return <ReviewNewTicket />;
    default:
      throw new Error("Unknown step");
  }
}

export default function NewTicketForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const report = useSelector((state) => state.newReport);
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (activeStep === 0) {
      if (report.title && report.description && report.image) {
        setActiveStep(activeStep + 1);
      } else {
        toast.error(`Input cannot be null`);
      }
    }
    if (activeStep === 1) {
      if (report.office.address) {
        setActiveStep(activeStep + 1);
      } else {
        toast.error(`Input cannot be null`);
      }
    }
    if (activeStep === 2) {
      try {
        const data = await axiosPostNewReport({ ...report, office: report.office._id });
        if (data.name === "AxiosError") return toast.error(`Already exist a report open`);
        dispatch(clearReport());
        const newData = await axiosGetReportHistory();
        dispatch(setAllReports(newData))
        setActiveStep(activeStep + 1);
      } catch (error) {
        console.error(error)
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          zIndex: "-1",
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{   minHeight: '87vh'}}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            New Report
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your Report.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your report confirmation, and will send you an
                update check the app or your inbox for updates.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </>
  );
}

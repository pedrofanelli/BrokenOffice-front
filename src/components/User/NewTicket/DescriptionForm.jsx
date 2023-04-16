import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch } from "react-redux";
import {
  setDescription,
  setImage,
  setProductTag,
  setTitle,
} from "../../../state/newReport";
import * as ml5 from "ml5";
import { Box } from "@mui/system";
import { productOpt } from "../../../utils/productOptions";
import axios from "axios";

export default function DescriptionForm() {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productLabel, setProductLabel] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);

      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      axios
        .post(`${process.env.REACT_APP_ROUTE}/reports/create/img`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => dispatch(setImage(res.data)))
        .catch((err) => console.error(err));
    }
  };

  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      setProductLabel(results[0].label);
      dispatch(setProductTag(results[0].label));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (imageSrc !== "") {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        let classifier = ml5.imageClassifier(
          "https://teachablemachine.withgoogle.com/models/PcNBqmMqD/",
          function () {
            console.log("Model loaded.");
          }
        );
        classifier.predict(img, gotResult);
      };
      img.src = imageSrc;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Incident Description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            multiline
            fullWidth
            id="newTicketTitle"
            label="Title"
            name="title"
            type="text"
            autoFocus
            helperText="Provide a brief and descriptive title"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            name="newTicketDescription"
            label="Description"
            type="text"
            id="newTicketDescription"
            helperText="Provide an explanation of what happened"
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button>
            <TextField
              variant="outlined"
              type="file"
              helperText="Files up to 2MB or 2000x2000"
              fullWidth
              onChange={(e) => handleFileChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <AttachFileIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                accept: ".jpg",
              }}
            />
          </Button>

          {isLoading && (
            <>
              <LinearProgress />
            </>
          )}

          {file && (
            <Box
              component="img"
              alt="Input Image"
              src={imageSrc}
              sx={{ maxWidth: "100%", mt: 1 }}
            />
          )}

          {!isLoading && productLabel && (
            <>
              <Typography>
                We think your image is a{" "}
                <span style={{ fontWeight: "bold" }}>{productLabel}</span> *
              </Typography>
              <Typography sx={{ mt: 2 }}>* Not Right? </Typography>
              <Autocomplete
                disablePortal
                onInputChange={(event, newInputValue) => {
                  dispatch(setProductTag(newInputValue));
                }}
                fullWidth={true}
                id="combo-box-demo"
                options={productOpt}
                renderInput={(params) => (
                  <TextField {...params} label="Product" />
                )}
              />
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

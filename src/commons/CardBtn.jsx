import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CardBtn = ({ text, rute, handleClick, setHandleClick }) => {
  const theme = useSelector(state => state.theme.mode)
  const navigate = useNavigate();

  return (
    <Box
      sx={handleClick ? {
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }: {marginBottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 3,}}
    >
      <Button
        color="secondary"
        sx={{
        
          borderRadius: 20,
          color: 'text.primary',
          border: `1px solid ${theme === 'light' ? 'black' : 'white'}`,
          width: 104,
          '&:hover': {
            backgroundColor: 'primary.main', 
            color: 'black', 
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
          },
        }}
        onClick={() => setHandleClick(!handleClick)}
      >
        <Typography
          sx={{ margin: 0 }}
          variant="caption"
          display="block"
          gutterBottom
        >
          {handleClick ? "Less Details" : "More Details"}
        </Typography>
      </Button>
      <Button
        color="secondary"
        sx={{
      
          borderRadius: 20,
          color: 'text.primary',
          border: `1px solid ${theme === 'light' ? 'black' : 'white'}`,
          width: 100,
          '&:hover': {
            backgroundColor: 'primary.main', 
            color: 'black', 
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
          },
        }}
        onClick={() => navigate(rute)}
      >
        <Typography
          sx={{ margin: 0 }}
          variant="caption"
          display="block"
          gutterBottom
        >
          {`View ${text}`}
        </Typography>
      </Button>
    </Box>
  );
};

export default CardBtn;

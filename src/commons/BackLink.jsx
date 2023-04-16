//import { Link } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { muiBackLink } from '../utils/styleMUI'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


export const BackLink = ({text, href}) => {
  return (
    <>
    <Box sx={muiBackLink}>
          <ArrowBackIosIcon />
        <Link underline="hover" to={href} style={{color: 'text.primary', textDecoration:'none'}}>
          <Typography color='text.primary'>{text}</Typography>
        </Link>
      </Box>
    </>
  )
}

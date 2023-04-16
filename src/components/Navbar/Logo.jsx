
import React from "react";
import logoGlobant from '../../assets/logoShort/ShortOriginal.svg'
import logoGlobantWhite from '../../assets/logoShort/Short-White-Green.svg'
import { useSelector } from "react-redux";


export const Logo = () => {
  const theme = useSelector(state => state.theme.mode)
  return (
    <div style={{width: '3rem'}}>
    <img src={theme === 'light' ? logoGlobant : logoGlobantWhite} alt="SVG"  />
    </div>
  );
};

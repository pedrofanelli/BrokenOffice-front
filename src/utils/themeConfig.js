
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          contrastThreshold: 4.5,
          primary: {
            main: "#BFD732", // globant green
            dark: "#39B54A", // dark green
          },
          secondary: {
            main: "#FFFFFF", // white
            dark: "#444444", // black
          },
          text: {
            primary: "#444444",
          },
          typography: {
            fontFamily: "Heebo",
          }
        }
      : {
          // palette values for dark mode
          contrastThreshold: 4.5,
          primary: {
            main: "#BFD732",
            dark: "#39B54A",
          },
          secondary: {
            main: "#1E1E1E",
            dark: "#FFFFFF",
          },
          text: {
            primary: "#FFFFFF",
          },
          typography: {
            fontFamily: "Heebo",
          }
        }),
  },
});

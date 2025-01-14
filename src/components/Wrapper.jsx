import { Box } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={{
        // background: "url(./assets/bg.svg)",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        backdropFilter: "blur(5px)",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;

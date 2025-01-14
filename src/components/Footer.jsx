import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    // position: "fixed",
    // bottom: 0,
    // width: "100%",
    // zIndex: 10, // Ensures it stays above other content
    // backgroundColor: "white", // Set a background to avoid transparencyx: 1,

    <Box display="flex" justifyContent={"center"} py={5}>
      <Typography
        sx={{
          fontSize: {
            xs: 10,
            sm: 15,
          },
        }}
      >
        &copy; {new Date().getFullYear()} Weather App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

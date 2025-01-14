import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    // <Box
    //   sx={
    //     {
    //       // position: "sticky",
    //       // top: 0,
    //       // zIndex: 10,
    //       // background: "white",
    //       // display: "flex",
    //       // width: "100%",
    //     }
    //   }
    // >
    <Typography
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        fontWeight: "bold",
        py: 5,
      }}
      variant="h4"
    >
      Weather App
    </Typography>
    // </Box>
  );
};

export default Header;

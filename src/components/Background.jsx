import React from "react";
import { Box,Container } from "@mui/material";

function Background(props) {
    return (
        <Box
                sx={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.jpg')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                  color: "white",
                  py: 4,
                }}
              >
                
                    {props.children}
              </Box>)
}

export default Background;
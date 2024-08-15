import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const SubmitLoader = () => {
  return (
    <Box sx={{
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#c4c4c4db",
    }}>
      <CircularProgress />
    </Box>
  );
};

export default SubmitLoader;

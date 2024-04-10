import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

type AlertProps = {
  descr: string;
  title: "success" | "error" | "warning" | "info";
};

const AlertModal: React.FC<AlertProps> = ({ descr, title }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: "-21px",
      right: "20px",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    }}
  >
    <Alert severity={title}>{descr}</Alert>
  </Box>
);

export default AlertModal;

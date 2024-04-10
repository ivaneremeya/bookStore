import React from "react";
import "./Cart.scss";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Cart = () => (
  <Grid container justifyContent="center">
    <Grid item xs={12} sm={8}>
      <Box>
        <Outlet />
      </Box>
    </Grid>
  </Grid>
);

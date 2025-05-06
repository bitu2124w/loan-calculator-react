// src/pages/About.jsx
import React from "react";
import { Typography, Container } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>About This App</Typography>
      <Typography paragraph>
        This Loan Calculator App is a modern single-page web application built using React and Material UI.
        It allows users to calculate loan EMIs, view amortization schedules, and convert EMI values to live currency rates.
      </Typography>
      <Typography paragraph>
        Features include real-time currency conversion, light/dark mode, responsive design, error handling, and more.
        Technologies used include React, React Router, Context API, Material UI, and the ExchangeRate API.
      </Typography>
    </Container>
  );
}

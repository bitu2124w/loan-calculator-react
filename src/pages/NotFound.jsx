// src/pages/NotFound.jsx
import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>404 - Page Not Found</Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Container>
  );
}

// NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../components/footer/Footer";

const NotFound = () => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px", height: "54vh" }}>
        <Typography variant="h1" color="primary">
          404 Not Found
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Oops! The page you are looking for doesn't exist.
        </Typography>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Go to Home
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

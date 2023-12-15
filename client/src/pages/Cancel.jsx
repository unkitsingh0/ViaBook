import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

/**
 * PaymentFailure component represents the page displayed when a payment fails.
 * It provides information about the failed payment and allows the user to go back to the home page.
 */
const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* // Container to control the maximum width of the content */}
        <Container maxWidth="sm" style={{ marginTop: "50px", height: "54vh" }}>
          {/* Heading indicating payment failure */}
          <Typography variant="h4" gutterBottom style={{ color: "#3f51b5" }}>
            Payment Failed
          </Typography>

          {/* Paragraph informing the user about the unsuccessful payment */}
          <Typography variant="body1" paragraph>
            We're sorry, but your payment was not successful. Your money will be
            refunded.
          </Typography>

          {/* Additional paragraph indicating that the ticket is not booked */}
          <Typography variant="body1" paragraph>
            Unfortunately, your ticket is not booked.
          </Typography>

          {/* Message for the user, expressing apologies */}
          <Typography variant="body2" color="textSecondary" paragraph>
            Sorry for the inconvenience.
          </Typography>

          {/* Button to navigate back to the home page */}
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => navigate("/")}
          >
            Go Back
          </Button>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailure;

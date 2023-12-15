import React from "react";
import { Card, CardContent, Avatar, Typography, Rating } from "@mui/material";

/**
 * This component renders a customer review card with their name, avatar, rating, and message.
 * @param {string} customerName - The name of the customer
 * @param {string} avatarSrc - The URL of the customer's avatar image
 * @param {number} rating - The customer's rating (out of 5)
 * @param {string} message - The customer's review message
 */
const CustomerReviewCard = ({ customerName, avatarSrc, rating, message }) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "10px" }}>
      {/* Create a card with a maximum width of 345 pixels and a margin of 10px */}
      <CardContent sx={{ width: 350 }}>
        {/* Create the card content with a width of 350 pixels */}
        <Avatar
          alt={customerName}
          src={avatarSrc}
          sx={{ margin: "auto", padding: "2rem" }}
        />
        {/* Display the customer's avatar image */}
        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          {/* Display the customer's name */}
          {customerName}
        </Typography>
        <Rating value={rating} readOnly precision={0.5} />
        {/* Display the customer's rating (out of 5) */}
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: 10 }}
        >
          {/* Display the customer's review message */}
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;

import * as React from "react"; // Import the React library
import Card from "@mui/material/Card"; // Import the Card component from Material UI
import CardContent from "@mui/material/CardContent"; // Import the CardContent component from Material UI
import CardMedia from "@mui/material/CardMedia"; // Import the CardMedia component from Material UI
import Typography from "@mui/material/Typography"; // Import the Typography component from Material UI
import { CardActionArea } from "@mui/material"; // Import the CardActionArea component from Material UI

// Define the ActionAreaCard component
export default function ActionAreaCard({ img, alt, heading, para }) {
  // This function takes four props: img, alt, heading, and para
  // img: The image URL
  // alt: The alternative text for the image
  // heading: The card heading
  // para: The card paragraph

  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "10px" }}>
      {/* Create a card with a maximum width of 345 pixels and a margin of 10px */}
      <CardActionArea sx={{ width: 350 }}>
        {/* Create a card action area with a width of 350 pixels */}
        <CardMedia component="img" height="200" image={img} alt={alt} />
        {/* Display the image with a height of 200 pixels */}
        <CardContent>
          {/* Create the card content */}
          <Typography gutterBottom variant="h6" component="div">
            {/* Display the card heading */}
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Display the card paragraph */}
            {para}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

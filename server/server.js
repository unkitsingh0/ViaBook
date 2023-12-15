// Import the Express framework
import express from "express";
import dotenv from "dotenv";

// Import routers for different routes
import bookTicketsRouter from "./routes/ticketsRouter.js";
import districtNameRouter from "./routes/districtNameRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

// Import the function to connect to the database
import { connectToDb } from "./Database/database.js";
// Import cors to enable Cross-Origin Resource Sharing (CORS)
import cors from "cors";

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the Express application
const app = express();
// Define the port number for the server, using the provided PORT or defaulting to 8035
const PORT = process.env.PORT || 8035;

// Connect to the database
connectToDb();

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.static("public"));

// Routes
app.use("/api/bk_tic", bookTicketsRouter); // Route for booking tickets from the API
app.use("/api/district_name", districtNameRouter); // Route for getting district names from the API
app.use("/api/payment", paymentRouter); // Route for handling payment-related operations

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log("server has started on PORT Number", PORT);
});

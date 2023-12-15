// Import the Express framework
import express from "express";

// Import the trip-related handling controllers
import {
  handelGetTrips,
  handelPostTrip,
  handelSaveBooking,
} from "../controller/ticketsController.js";

// Create a new Express Router instance
const router = express.Router();

// Define routes for handling trip-related operations
router.route("/").post(handelPostTrip).get(handelGetTrips);

// Define a route for saving booking information
router.route("/saveBooking").post(handelSaveBooking);

// Export the router for use in other parts of the application
export default router;

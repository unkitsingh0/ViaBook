// Import the Express framework
import express from "express";

// Import the district name handling controller
import { handelGetCityName } from "../controller/districtNameController.js";

// Create a new Express Router instance
const router = express.Router();

// Define a route for handling district name requests
router.route("/:district").get(handelGetCityName);

// Export the router for use in other parts of the application
export default router;

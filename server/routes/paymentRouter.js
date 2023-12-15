// Import the Express framework
import express from "express";

// Import the payment handling controller
import { handelPayment } from "../controller/paymentController.js";

// Create a new Express Router instance
const router = express.Router();

// Define a route for creating a checkout session and handling payments
router.route("/create-checkout-session").post(handelPayment);

// Export the router for use in other parts of the application
export default router;

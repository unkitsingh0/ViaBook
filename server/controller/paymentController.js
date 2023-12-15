// Import the 'stripe' library
import stripe from "stripe";

// Create a Stripe instance with the provided Stripe token
let stripeInstance = stripe(process.env.STRIPTOKEN);

// Controller function to handle the payment process using Stripe Checkout
let handelPayment = async (req, res) => {
  // Define the frontend domain for success and cancel URLs
  const DOMAIN = "https://resonant-macaron-2d2bb4.netlify.app/#";
  // const DOMAIN = "http://localhost:8035";

  // Extract data from the request body
  let data = req.body;

  // Create a new Stripe Checkout session
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        // Define the details of the purchased item
        price_data: {
          currency: "inr",
          unit_amount: data.businfo.busDetails.busFare * 100,
          product_data: {
            name: data.businfo.busDetails.busName,
            description: `Bus Ticket of ${data.businfo.busDetails.busName} from ${data.businfo.busDetails.from} to ${data.businfo.busDetails.to} Seat No ${data.businfo.SeatNo}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/receipt`, // Redirect URL on successful payment
    cancel_url: `${DOMAIN}/cancel`, // Redirect URL on canceled payment
  });

  // Send the Checkout session ID as a JSON response
  res.json({ id: session.id });
};

// Export the handelPayment function for use in other parts of the application
export { handelPayment };

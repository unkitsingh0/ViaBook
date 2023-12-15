// Import the getDistrictName function from the database model
import { getDistrictName } from "../Database/database.js";

// Controller function to handle the request for getting city names based on the district
let handelGetCityName = async (req, res) => {
  // Extract the district name from the request parameters
  let userInput = req.params.district;

  try {
    // Call the getDistrictName function to retrieve city names based on the district
    let response = await getDistrictName(userInput);

    // Send the retrieved city names as a JSON response
    res.json(response);
  } catch (error) {
    // Handle errors by sending the error message as a JSON response
    res.json(error.message);
  }
};

// Export the handelGetCityName function for use in other parts of the application
export { handelGetCityName };

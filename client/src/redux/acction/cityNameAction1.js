// actions.js

import BaseApiUrl from "../../components/BaseApiUrl";

// Action creator function for initiating a request to fetch City1 data
export const fetchCity1Request = () => {
  return {
    type: "FETCH_City1_REQUEST", // Action type indicating the start of the request
  };
};

// Action creator function for successful retrieval of City1 data
export const fetchCity1Success = (posts) => {
  return {
    type: "FETCH_City1_SUCCESS", // Action type indicating the success of the request
    payload: posts, // Payload containing the retrieved data
  };
};

// Action creator function for handling errors during City1 data fetching
export const fetchCity1Error = (error) => {
  return {
    type: "FETCH_City1_ERROR", // Action type indicating an error during the request
    payload: error, // Payload containing the error message
  };
};

// Thunk action creator for fetching City1 data asynchronously
export const fetchCity1 = (userInput) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCity1Request()); // Dispatch the fetchCity1Request action to indicate the start of the request
      // Make an asynchronous request to fetch City1 data
      let response = await fetch(
        `${BaseApiUrl}/api/district_name/${userInput}`
      );
      // Parse the response as JSON
      const data = await response.json();

      // Dispatch the fetchCity1Success action with the retrieved data
      dispatch(fetchCity1Success(data));
    } catch (error) {
      // Dispatch the fetchCity1Error action with the error message if an error occurs
      dispatch(fetchCity1Error(error.message));
    }
  };
};

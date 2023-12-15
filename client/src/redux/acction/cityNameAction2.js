// actions.js

import BaseApiUrl from "../../components/BaseApiUrl";

// Action creator function for initiating a request to fetch City2 data
export const fetchCity2Request = () => {
  return {
    type: "FETCH_City2_REQUEST", // Action type indicating the start of the request
  };
};

// Action creator function for successful retrieval of City2 data
export const fetchCity2Success = (posts) => {
  return {
    type: "FETCH_City2_SUCCESS", // Action type indicating the success of the request
    payload: posts, // Payload containing the retrieved data
  };
};

// Action creator function for handling errors during City2 data fetching
export const fetchCity2Error = (error) => {
  return {
    type: "FETCH_City2_ERROR", // Action type indicating an error during the request
    payload: error, // Payload containing the error message
  };
};
// Thunk action creator for fetching City2 data asynchronously
export const fetchCity2 = (userInput) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCity2Request()); // Dispatch the fetchCity2Request action to indicate the start of the request

      // Make an asynchronous request to fetch City2 data
      let response = await fetch(
        ` ${BaseApiUrl}/api/district_name/${userInput}`
      );

      // Parse the response as JSON
      const data = await response.json();

      // Dispatch the fetchCity2Success action with the retrieved data
      dispatch(fetchCity2Success(data));
    } catch (error) {
      // Dispatch the fetchCity2Error action with the error message if an error occurs
      dispatch(fetchCity2Error(error.message));
    }
  };
};

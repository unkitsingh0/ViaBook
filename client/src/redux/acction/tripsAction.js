// actions.js

import BaseApiUrl from "../../components/BaseApiUrl";

// Action creator function for initiating a request to fetch trips data
export const fetchTripsRequest = () => {
  return {
    type: "FETCH_Trips_REQUEST", // Action type indicating the start of the request
  };
};

// Action creator function for successful retrieval of trips data
export const fetchTripsSuccess = (data) => {
  return {
    type: "FETCH_Trips_SUCCESS", // Action type indicating the success of the request
    payload: data, // Payload containing the retrieved data
  };
};

// Action creator function for handling errors during trips data fetching
export const fetchTripsError = (error) => {
  return {
    type: "FETCH_Trips_ERROR", // Action type indicating an error during the request
    payload: error, // Payload containing the error message
  };
};

// Thunk action creator for fetching trips data asynchronously
export const fetchTrips = (inputValue1, inputValue2, selectedDate) => {
  return async (dispatch) => {
    try {
      dispatch(fetchTripsRequest()); // Dispatch the fetchTripsRequest action to indicate the start of the request
      // Make an asynchronous request to fetch trips data
      let response = await fetch(
        `${BaseApiUrl}/api/bk_tic?from=${inputValue1}&to=${inputValue2}&date=${selectedDate}`
      );

      // Parse the response as JSON
      const data = await response.json();

      // Dispatch the fetchTripsSuccess action with the retrieved data
      dispatch(fetchTripsSuccess(data));
    } catch (error) {
      // Dispatch the fetchTripsError action with the error message if an error occurs
      dispatch(fetchTripsError(error.message));
    }
  };
};

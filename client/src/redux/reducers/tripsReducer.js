// tripsReducer.js

// Initial state of the reducer
const initialState = {
  posts: [], // Array to hold trips data
  loading: false, // Flag to indicate whether data is being loaded
  error: null, // Holds any error that may occur during data fetching
};

// Reducer function for handling actions related to trips data
const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for handling the "FETCH_Trips_REQUEST" action type
    case "FETCH_Trips_REQUEST":
      return { ...state, loading: true, error: null }; // Set loading to true and clear any previous errors

    // Case for handling the "FETCH_Trips_SUCCESS" action type
    case "FETCH_Trips_SUCCESS":
      return { ...state, loading: false, posts: action.payload }; // Set loading to false and update posts with the retrieved data

    // Case for handling the "FETCH_Trips_ERROR" action type
    case "FETCH_Trips_ERROR":
      return { ...state, loading: false, error: action.payload }; // Set loading to false and update the error with the provided message

    // Default case for handling other action types
    default:
      return state; // Return the current state if the action type is not recognized
  }
};

// Export the reducer function as the default export of the file
export default tripsReducer;

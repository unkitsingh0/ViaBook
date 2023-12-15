// cityNameReducer2.js

// Initial state of the reducer
const initialState = {
  posts: [], // Array to hold City1 data
  loading: false, // Flag to indicate whether data is being loaded
  error: null, // Holds any error that may occur during data fetching
};
// Reducer function for handling actions related to City2 data
const cityNameReducer2 = (state = initialState, action) => {
  switch (action.type) {
    // Case for handling the "FETCH_City2_REQUEST" action type
    case "FETCH_City2_REQUEST":
      return { ...state, loading: true, error: null }; // Set loading to true and clear any previous errors

    // Case for handling the "FETCH_City2_SUCCESS" action type
    case "FETCH_City2_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    // Case for handling the "FETCH_City2_ERROR" action type
    case "FETCH_City2_ERROR":
      return { ...state, loading: false, error: action.payload };

    // Default case for handling other action types
    default:
      return state;
  }
};

// Export the reducer function as the default export of the file
export default cityNameReducer2;

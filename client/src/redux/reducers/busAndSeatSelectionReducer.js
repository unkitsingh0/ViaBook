// busAndSeatSelectionReducer.js

// Initial state of the reducer
const initialState = {
  info: { busDetails: {}, SeatNo: "" }, // Initial data structure for bus details and seat number
  loading: false, // Flag to indicate whether data is being loaded
  error: null, // Holds any error that may occur during data fetching
};

// Reducer function for handling actions related to bus and seat selection
const busAndSeatSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for handling the "SelectedData" action type
    case "SelectedData":
      return {
        ...state,
        loading: false, // Set loading to false as data has been successfully loaded

        info: {
          busDetails: action.payload.busDetails, // Update bus details in the state
          SeatNo: action.payload.SeatNo, // Update selected seat number in the state
        },
      };

    // Default case for handling other action types
    default:
      return state; // Return the current state if the action type is not recognized
  }
};

// Export the reducer function as the default export of the file
export default busAndSeatSelectionReducer;

// actions.js

// Action creator function for setting selected data
export const SelectedData = (busData, seatNo) => {
  return {
    type: "SelectedData", // Action type indicating the action being performed
    payload: { busDetails: busData, SeatNo: seatNo }, // Payload containing data to be stored in the state
  };
};

// Thunk action creator for handling asynchronous operations
export const selectedBusAndSeat = (busData, seatNo) => {
  return async (dispatch) => {
    // Dispatch the SelectedData action with the provided data
    dispatch(SelectedData(busData, seatNo));
  };
};

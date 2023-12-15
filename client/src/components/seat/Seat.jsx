import React from "react";
import "./css/seat.css";
// // This component renders a single seat in the seating chart.
function Seat({ seatStlye }) {
  return (
    <div className={`outer ${seatStlye}`}>
      {/* Create the outer container for the seat with the specified CSS class */}
      <div className="inner"></div>
      {/* Create the inner div for the seat */}
    </div>
  );
}

export default Seat;

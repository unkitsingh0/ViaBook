import React from "react";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
/**
 * This component renders the footer section of the ViaBook website.
 */
function Footer() {
  return (
    <footer className="footer" style={{ padding: 10 }}>
      {/* Create the footer container with a class of "footer" */}
      <div className="firstHalf">
        {/* Create a section for the main footer content */}
        <h3>
          {/* Display the ViaBook logo using the DirectionsBusFilledIcon component */}
          <DirectionsBusFilledIcon style={{ fontSize: 30 }} />
          ViaBook
        </h3>
        {/* Display a tagline for ViaBook */}
        <p>When you have a chois .Chose ViaBook </p>

        {/* Provide a brief description of ViaBook's services */}
        <p>
          ViaBook offer bus ticket booking through its website ,IOS,and android
          mobile apps for all major cities.
        </p>

        {/* Display the company email address for customer support */}
        <p>viabooking.suport@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;

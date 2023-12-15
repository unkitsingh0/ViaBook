import React, { useState } from "react"; // Import React and its Hooks
import { useDispatch, useSelector } from "react-redux"; //// Import the useDispatch and useSelector hooks from Redux
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import Accordion from "@mui/material/Accordion"; //Import accordion from material ui
import AccordionDetails from "@mui/material/AccordionDetails"; //Import accordion Details from material ui
import AccordionSummary from "@mui/material/AccordionSummary"; //Imort accordion Summary from material ui
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Import star icon from material icons
import Button from "@mui/material/Button"; //Material ui button
import Seat from "../components/seat/Seat"; // Import Seat component
import { selectedBusAndSeat } from "../redux/acction/busAndSeatSelectionAction"; // Import selected Bus and Seat action
import { Oval } from "react-loader-spinner"; //Import react loader spinner
import { Toaster, toast } from "react-hot-toast"; //Import toast for alret
import Footer from "../components/footer/Footer";
import "./css/trips.css"; //Import css

// Define the Trips component
function Trips() {
  // Initialize the useDispatch hook
  let dispatch = useDispatch();
  // Initialize the navigate hook
  let navigate = useNavigate();

  let trips = useSelector((state) => state.trips.posts); // Get the Trips data from the Redux store

  const [expanded, setExpanded] = useState(false); //State to expand accordion

  // Handle changes in the Accordion panels
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // State for managing selected seats
  const [selectedSeat, setSelectedSeat] = useState("");

  // Function to convert Unix time to a readable format
  let convertUnixTime = (time) => {
    let monthShortForm = {
      1: "JAN",
      2: "FEB",
      3: "MAR",
      4: "APR",
      5: "MAY",
      6: "Jun",
      7: "JUL",
      8: "AUG",
      9: "SEP",
      10: "OCt",
      11: "NOV",
      12: "DEC",
    };
    let newTime = new Date(time * 1000);

    return `${newTime.getHours()}:${newTime.getMinutes()},${newTime.getDate()} ${
      monthShortForm[newTime.getMonth() + 1]
    }`;
  };
  // Function to calculate travel time between two timestamps
  let calTravelTime = (startTime, endTime) => {
    const timestamp1InMilliseconds = startTime * 1000;
    const timestamp2InMilliseconds = endTime * 1000;
    const differenceInMilliseconds =
      timestamp2InMilliseconds - timestamp1InMilliseconds;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    // const differenceInMinutes = differenceInSeconds / 60;

    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}hrs${formattedMinutes}mins`;
  };
  // Function to handle the booking process when proceeding to book
  let handelProceedBooking = (busDataIndex, selecetedSeatNO) => {
    if (!selecetedSeatNO) return toast.error("Please select at least one seat");
    dispatch(selectedBusAndSeat(trips[busDataIndex], selecetedSeatNO));
    navigate("/info");
  };

  // Seat categories for the bus
  const UL1 = ["UL11", "UL12", "UL13", "UL14", "UL15", "UL16", "UL17"];
  const UL2 = ["UL21", "UL22", "UL23", "UL24", "UL25", "UL26", "UL27"];
  const UL3 = ["UL31", "UL32", "UL33", "UL34", "UL35"];
  const LL1 = ["LL11", "LL12", "LL13", "LL14", "LL15", "LL16", "LL17"];
  const LL2 = ["LL21", "LL22", "LL23", "LL24", "LL25", "LL26", "LL27"];
  const LL3 = ["LL31", "LL32", "LL33", "LL34", "LL35"];

  // Loading state when trips are being fetched
  if (trips.length === 0) {
    return (
      <>
        <div className="Loader">
          <Oval
            height={150}
            width={150}
            color="#0dc60d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <h1>Searching !!</h1>
        </div>
      </>
    );
  }
  // Main component rendering trips, seats, and other information
  return (
    <>
      <div className="trips">
        {/* All Trips */}
        <div className="allTrips">
          {trips &&
            trips.map((trip, index) => {
              return (
                <>
                  <Accordion
                    expanded={expanded === `panel${trip._id}`}
                    onChange={handleChange(`panel${trip._id}`)}
                    style={{ border: "1px solid gray", margin: 10 }}
                    key={trip._id}
                  >
                    {/* Accordion Summary Section */}
                    <AccordionSummary
                      aria-controls={`panel${trip._id}bh-content`}
                      id={`panel${trip._id}bh-header`}
                      // Reset selected seat when the accordion summary is clicked
                      onClick={(e) => {
                        setSelectedSeat("");
                      }}
                    >
                      {/* Outer Container for Trip Data */}
                      {/* Heading */}
                      <div className="tripdata">
                        <div className="info">
                          {/* Trip Information: Bus Name, Rating, and Type */}
                          <h5>
                            {trip.busName}
                            <span className="rating">
                              {/* Star icon for rating */}
                              <StarBorderIcon
                                style={{ marginBottom: "2px", fontSize: 20 }}
                              />
                              {trip.rating}
                            </span>
                            <span
                              style={{
                                fontWeight: "normal",
                                fontSize: 13,
                                marginLeft: 4,
                              }}
                            >
                              Ratings
                            </span>
                          </h5>

                          {/* Bus type and available seats */}
                          <p>
                            {trip.category
                              ? trip.category
                              : "A/C Sleeper (2+1) "}
                            | {trip.totalSeats} seats left
                          </p>
                          {/* Trip Timing */}
                          <h4>
                            {convertUnixTime(trip.startTime)} ----
                            {calTravelTime(trip.startTime, trip.EndTime)}----
                            {convertUnixTime(trip.EndTime)}
                          </h4>
                          {/* Amenities List */}
                          <ul className="animeties">
                            {trip.animeties_list.map((list) => {
                              return (
                                <>
                                  <li key={list}>{list}</li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="priceAndSeats">
                          <h6>Trip Cost</h6>
                          <p>Starting From</p>
                          <h5>₹{trip.busFare}</h5>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#fb9156" }}
                          >
                            {expanded === `panel${trip._id}`
                              ? "Hide Seats"
                              : "View Seats"}
                          </Button>
                        </div>
                      </div>
                    </AccordionSummary>
                    {/* Accordion Details Section */}
                    <AccordionDetails
                      style={{ borderTop: "1px solid #3f51b5" }}
                    >
                      {/* Inner Layer for Seat Selection and Booking Details */}
                      <h3>Select Seats</h3>
                      <div className="selectSeat">
                        <div className="busSeats">
                          {/* Upper Deck of Bus */}
                          <div className="upperDeck">
                            <p>Upper Deck</p>
                            {/* ... (Code for rendering upper deck seats) */}
                            <div className="L1">
                              {UL1.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L2">
                              {UL2.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L3">
                              {UL3.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          {/* Lower deck of bus */}
                          <div className="lowerDeck">
                            <p>Lower Deck</p>
                            {/* ... (Code for rendering lower deck seats) */}
                            <div className="L1">
                              {LL1.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L2">
                              {LL2.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L3">
                              {LL3.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Summary Section */}
                        <div className="summary">
                          <h5>Boarding & Dropping</h5>
                          {/* Boarding Details */}
                          <div className="from">
                            <div>
                              <h6>{trip.from.split(",")[0]} </h6>
                              <p>{trip.from}</p>
                            </div>
                            <h6>
                              {convertUnixTime(trip.startTime).split(",")[0]}
                            </h6>
                          </div>
                          {/* Dropping Details */}
                          <div className="to">
                            <div>
                              <h6>{trip.to.split(",")[0]}</h6>
                              <p>{trip.to}</p>
                            </div>
                            <h6>
                              {convertUnixTime(trip.EndTime).split(",")[0]}
                            </h6>
                          </div>
                          <hr />
                          {/* Selected Seat Details */}
                          <div className="seatNo">
                            <h6>Seat No.</h6>
                            <h6>
                              {selectedSeat ? selectedSeat : "No Seat Selected"}
                            </h6>
                          </div>
                          <hr />
                          {/* Fare Details */}
                          <div className="fareDetails">
                            <h6>Fare Details</h6>
                            <div>
                              <p>Amount</p>
                              <h6>{trip.busFare}</h6>
                            </div>
                            {/* Button to Proceed Booking */}
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#fb9156",
                                margin: "auto",
                                width: "100%",
                              }}
                              onClick={(e) =>
                                handelProceedBooking(index, selectedSeat)
                              }
                            >
                              Proceed To Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
        </div>
        <div>
          <Toaster />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trips;

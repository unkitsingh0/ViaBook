// Import necessary functions and modules
import handelEmailService from "../helper/emailServices.js";
import {
  getBusOwnerData,
  getTripsData,
  postTrips,
  saveBooking,
} from "../Database/database.js";

// Controller function to handle the creation of a new trip
const handelPostTrip = async (req, res) => {
  try {
    // Extract data from the request body
    let {
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      bus_no,
      animeties_list,
      busFare,
      busName,
    } = req.body;
    // Call the postTrips function to add a new trip to the database
    let postTripsResponse = await postTrips(
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      bus_no,
      animeties_list,
      busFare,
      busName
    );
    // Check if the trip creation was successful and send an appropriate response
    if (postTripsResponse.acknowledged) {
      res.status(201).json({ status: "ok" });
    } else {
      res.json({ status: "fail" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

// Controller function to handle the retrieval of trips based on query parameters
const handelGetTrips = async (req, res) => {
  try {
    // Extract query parameters from the request
    const {
      from,
      to,
      date,
      arrival,
      departure,
      startRating,
      endRating,
      operators,
    } = req.query;

    // Create a filter object based on the provided query parameters
    const filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;
    //+ is converting date from string to number
    if (date) filter.date = date;
    if (arrival) filter.arrival = arrival;
    if (departure) filter.departure = departure;
    if (startRating && endRating)
      filter.rating = {
        $gte: parseFloat(startRating),
        $lte: parseFloat(endRating),
      };
    if (operators) filter.operator = { $in: operators.split(",") };

    // Retrieve trip data based on the filter
    let tripData = await getTripsData(filter);

    // If no trips are found and 'from' and 'to' are specified, generate random trips
    if (tripData.length === 0 && filter.from && filter.to) {
      let busOnwerData = await getBusOwnerData();
      let randomTimer = +date;
      for (let i = 0; i < busOnwerData.length; i++) {
        let SeatBooked = [];
        await postTrips(
          date,
          from,
          to,
          busOnwerData[i]._id,
          randomTimer,
          randomTimer + 3600,
          busOnwerData[i].category,
          SeatBooked,
          busOnwerData[i].totalSeats,
          "MH01AA1000",
          busOnwerData[i].animeties,
          890,
          busOnwerData[i].name,
          busOnwerData[i].rating
        );
        randomTimer += 7500;
      }
      let tripDataAgain = await getTripsData(filter);

      // Send the retrieved trip data as a JSON response
      return res.json(tripDataAgain);
    }
    // Send the retrieved trip data as a JSON response
    res.json(tripData);
  } catch (error) {
    res.json(error.message);
  }
};
// Controller function to handle the saving of a new booking
let handelSaveBooking = async (req, res) => {
  try {
    // Call the saveBooking function with the booking details
    let response = await saveBooking(req.body);
    // Extract relevant details from the request body
    let { name, gender, age, email, mobile } = req.body.passengerData; // Passenger Details
    let {
      _id,
      date,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      bus_no,
      busFare,
      busName,
      newUniId,
    } = req.body.businfo.busDetails; //Trip details

    let seatNo = req.body.businfo.SeatNo; //Seat No

    // Check if the booking was successful and send confirmation email
    if (response.acknowledged) {
      //Sending Email passenger confirmation of ticket booking
      let subject = `Your Bus Ticket is Booked from ${from} to ${to}`;
      //   let text = `
      // Dear Passenger,

      // Thank you for booking with us. Here are your booking details:

      // Passenger Information:
      // - Name: ${name}
      // - Gender: ${gender}
      // - Age: ${age}

      // Booking Details:
      // - Booking ID: ${seatNo}${newUniId}
      // - Date: ${new Date(date * 1000)}
      // - From: ${from}
      // - To: ${to}
      // - Bus Owner ID: ${busOwnerID}
      // - Departure: ${new Date(startTime * 1000)}
      // - Arrival: ${new Date(EndTime * 1000)}
      // - Bus Number: ${bus_no}
      // - Bus Fare: ${busFare}
      // - Bus Name: ${busName}

      // Seat Number: ${seatNo}

      // Thank you for choosing our service. Have a safe journey!

      // Best regards,
      // ViaBook
      // `;
      const getTimeInIST = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      };

      const text = `
    Dear Passenger,
    
    Thank you for booking with us. Here are your booking details:
    
    Passenger Information:
    - Name: ${name}
    - Gender: ${gender}
    - Age: ${age}
    
    Booking Details:
    - Booking ID: ${seatNo}${newUniId}
    - Date: ${getTimeInIST(date)}
    - From: ${from}
    - To: ${to}
    - Bus Owner ID: ${busOwnerID}
    - Departure: ${getTimeInIST(startTime)}
    - Arrival: ${getTimeInIST(EndTime)}
    - Bus Number: ${bus_no}
    - Bus Fare: ${busFare}
    - Bus Name: ${busName}
    
    Seat Number: ${seatNo}
    
    Thank you for choosing our service. Have a safe journey!
    
    Best regards,
    ViaBook
    `;

      // Call the email service to send the confirmation email
      handelEmailService(email, subject, text);

      //Returing response to client. Booking is confirmed
      res.status(201).json({
        status: "Booked",
        data: { ticketId: response.insertedID, otherData: req.body },
      });
    } else {
      //Sends if booking is failed
      res.json({ status: "Fail" });
    }
  } catch (error) {
    // Catching error
    res.json({ status: "Fail", message: error.message });
  }
};

// Exporting all controller function
export { handelPostTrip, handelGetTrips, handelSaveBooking };

// Import necessary modules
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI loaded from environment variables
const uri = process.env.DataBaseURI;

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Asynchronous function to establish a connection to the database
async function connectToDb() {
  await client.connect();
  console.log("connected to database");
}

// Select the "trips" database
let db = client.db("trips");

// Function to post trips data to the database
async function postTrips(
  date,
  from,
  to,
  busOwnerID,
  startTime,
  EndTime,
  category,
  SeatBooked,
  totalSeats,
  bus_no,
  animeties_list,
  busFare,
  busName,
  rating
) {
  try {
    let collection = db.collection("trips");
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let unixDate = currentDate.getTime();

    // Generate a unique ID for the trip based on various parameters
    let newUniId = `${startTime}${EndTime}${from.split(",")[0]}${
      to.split(",")[0]
    }${busName.split(" ")[0]}`;

    // Insert trip data into the "trips" collection
    let sendBookingData = collection.insertOne({
      date: date ? date : Math.floor(unixDate / 1000),
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      totalSeats,
      bus_no,
      animeties_list,
      busFare,
      busName,
      rating,
      newUniId,
    });

    return sendBookingData;
  } catch (error) {
    return error.message;
  }
}

// Function to retrieve trips data based on provided filters
async function getTripsData(filters) {
  try {
    let collection = db.collection("trips");

    // Limit the result to 50 records and convert to an array
    return collection.find(filters).limit(50).toArray();
  } catch (error) {
    return error.message;
  }
}

// Function to retrieve bus owner data from the "bus_owner" collection
async function getBusOwnerData() {
  try {
    let collection = db.collection("bus_owner");
    return collection.find().toArray();
  } catch (error) {
    return error.message;
  }
}
// Function to save booking details to the database
async function saveBooking(body) {
  //  userId, tripId, seatNumber, bookingDate, paymentMethod,amountPaid,;

  try {
    // Extract relevant details from the request body
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
    } = body.businfo.busDetails;

    // Update SeatBooked and totalSeats in the "trips" collection
    let seatNo = body.businfo.SeatNo;
    let { name, gender, age, email, mobile } = body.passengerData;

    let tripBus = db.collection("trips");
    let check = await tripBus.findOne({ newUniId });
    await tripBus.updateOne(
      { newUniId },
      {
        $set: {
          SeatBooked: [...check.SeatBooked, seatNo],
          totalSeats: check.totalSeats - 1,
        },
      }
    );
    // Insert the booking details into the "bookings" collection
    const result = await db.collection("bookings").insertOne({
      tripId: _id,
      date,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      bus_no,
      busFare,
      busName,
      seatNo,
      name,
      gender,
      age,
      email,
      mobile,
    });

    return result;
  } catch (error) {
    return error.message;
  }
}

// Function to get district names based on user input
async function getDistrictName(userInput) {
  userInput = userInput.toLowerCase();
  try {
    const collection = db.collection("state_district");

    // Retrieve districts data from the "state_district" collection
    const districtsData = await collection.find().toArray();
    // Filter matching districts based on user input
    const matchingDistricts = districtsData.flatMap((state) =>
      state.districts
        .filter((district) => district.toLowerCase().startsWith(userInput))
        .map((matchingDistrict) => ({
          district: matchingDistrict,
          state: state.state,
        }))
    );

    return matchingDistricts;
  } catch (error) {
    return error.message;
  }
}

// Export database-related functions for use in other modules
export {
  connectToDb,
  postTrips,
  getTripsData,
  saveBooking,
  getBusOwnerData,
  getDistrictName,
};

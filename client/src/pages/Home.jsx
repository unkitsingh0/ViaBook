import React, { useState, useEffect } from "react"; // Import React and its Hooks
import TextField from "@mui/material/TextField"; // Import the TextField component from MUI
import Autocomplete from "@mui/material/Autocomplete"; // Import the Autocomplete component from MUI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the AdapterDayjs for datepicker from MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Import the LocalizationProvider for datepicker from MUI
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Import the DatePicker component from MUI
import { useDispatch, useSelector } from "react-redux"; // Import the useDispatch and useSelector hooks from Redux
import { fetchCity1 } from "../redux/acction/cityNameAction1"; // Import the fetchCity1 action from the Redux store
import { fetchCity2 } from "../redux/acction/cityNameAction2"; // Import the fetchCity2 action from the Redux store
import LoadingButton from "@mui/lab/LoadingButton"; // Import the LoadingButton component from MUI
import { fetchTrips } from "../redux/acction/tripsAction"; // Import the fetchTrips action from the Redux store
import ActionAreaCard from "../components/card/ActionAreaCard"; // Import the ActionAreaCard component from the components folder
import Container from "@mui/material/Container"; // Import the Container component from MUI
import bus from "../images/bus.jpg"; // Import the bus image
import people from "../images/people.jpg"; // Import the people image
import ticket from "../images/ticket.jpg"; // Import the ticket image
import CustomerReviewCard from "../components/card/reviewCard"; // Import the CustomerReviewCard component from the components folder
import Footer from "../components/footer/Footer"; // Import the Footer component from the components folder
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router DOM
import { Toaster, toast } from "react-hot-toast"; // Import the Toaster and toast components from react-hot-toast
import "./css/home.css"; // Import the home.css stylesheet

// Define the Home component
const Home = () => {
  // Initialize the navigate hook
  let navigate = useNavigate();
  // Initialize the useDispatch hook
  let dispatch = useDispatch();

  let from = useSelector((state) => state.from.posts); // Get the from cities from the Redux store
  let to = useSelector((state) => state.to.posts); // Get the to cities from the Redux store
  let loading = useSelector((state) => state.trips.loading); // Get the loading state from the Redux store

  const [inputValue1, setInputValue1] = useState(""); // State for the input value of the first Autocomplete
  const [inputValue2, setInputValue2] = useState(""); // State for the input value of the second Autocomplete
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date

  // Handle the date change in the DatePicker
  const handleDateChange = (date) => {
    let newDate = new Date(date);
    const unixTimestamp = newDate.getTime();

    // Convert to seconds by dividing by 1000
    const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000);

    setSelectedDate(unixTimestampInSeconds); // Handle the date change in the DatePicker
  };
  // Handle the search button click
  let handelSearch = async (e) => {
    // Check if all fields are filled
    if (!inputValue1 || !inputValue2 || !selectedDate)
      return toast.error("Please enter a value!"); // Display an error toast if missing fields

    // Dispatch the fetchTrips action with the user input

    dispatch(fetchTrips(inputValue1, inputValue2, selectedDate));
  };
  // useEffect to debounce the city fetching
  useEffect(() => {
    if (!inputValue1) return; //Return if no input value
    let deboucing = setTimeout(() => {
      dispatch(fetchCity1(inputValue1));
    }, 500);
    return () => clearTimeout(deboucing);
  }, [dispatch, inputValue1]);

  // useEffect to debounce the city fetching
  useEffect(() => {
    if (!inputValue2) return; // Return if no input value
    let deboucing = setTimeout(() => {
      dispatch(fetchCity2(inputValue2));
    }, 500);
    return () => clearTimeout(deboucing);
  }, [dispatch, inputValue2]);

  //useEffect to check if the loading state is true then it will redirect to next page that is trips
  useEffect(() => {
    if (loading) {
      navigate("/trips");
    }
  }, [loading, navigate]);
  // Render the JSX content
  return (
    <div className="Home">
      {/* Bus Search */}
      <div className="busSearch">
        <form className="busSearchForm">
          <div className="from">
            {/* Auto complete city first names */}
            <Autocomplete
              id="disable-close-on-select"
              options={from}
              getOptionLabel={(option) => `${option.district}, ${option.state}`}
              style={{ width: 250 }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) =>
                setInputValue1(newInputValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="From" variant="standard" />
              )}
            />
          </div>
          <div className="to">
            {/* Auto complete second city name */}
            <Autocomplete
              id="combo-box-demo2"
              options={to}
              getOptionLabel={(option) => `${option.district}, ${option.state}`}
              style={{ width: 250 }}
              inputValue={inputValue2}
              onInputChange={(event, newInputValue) =>
                setInputValue2(newInputValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="To" variant="standard" />
              )}
            />
          </div>
          {/* Date picker */}
          <div className="datePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker variant="standard" onChange={handleDateChange} />
            </LocalizationProvider>
          </div>
        </form>
        {/* Button to search trips  */}
        <LoadingButton
          variant="contained"
          loading={loading}
          style={{ padding: "20px 8px", marginLeft: ".3rem" }}
          onClick={handelSearch}
          sx={{
            backgroundColor: "#3f51b5", // Set your desired background color
            "&:hover": {
              backgroundColor: "#2c3e50", // Set a different color for hover if needed
            },
          }}
          className="homeLoadingButton"
        >
          Search
        </LoadingButton>
      </div>
      {/*achievement*/}
      <Container>
        <h2 style={{ marginTop: 2, color: "#3f51b5" }}>
          Your Road to Joyful Journeys!
        </h2>
        <div className="achievement">
          <ActionAreaCard
            img={bus}
            alt={"Bus Image"}
            heading={"1000+"}
            para={"Bus Collection"}
          />
          <ActionAreaCard
            img={people}
            alt={"Happy Customer"}
            heading={"1+ Millon"}
            para={"Happy Customera"}
          />
          <ActionAreaCard
            img={ticket}
            alt={"Ticket"}
            heading={"2000+"}
            para={"Tickets book everyday"}
          />
        </div>
      </Container>
      {/* Customer review */}
      <div className="review">
        <h2>Here's what a few of our customers </h2>
        <h2>have to say about us </h2>

        <div className="customerReview">
          <Container>
            <div className="childCustomerReview">
              <CustomerReviewCard
                customerName="Aarav Sharma"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4.5}
                message="Awesome travel experience with viaBook. Excellent staff."
              />
              <CustomerReviewCard
                customerName="Isha Singh"
                avatarSrc="https://example.com/avatar.jpg"
                rating={5}
                message="Amazing service. Always a best time with viaBook."
              />
              <CustomerReviewCard
                customerName="Arjun Patel"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4}
                message="Bus was clean and the journey was smooth . Reached on time ."
              />
            </div>
          </Container>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Home;

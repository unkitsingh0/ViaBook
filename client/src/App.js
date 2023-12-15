import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Info from "./pages/Info";
import Receipt from "./pages/Receipt";
import Cancel from "./pages/Cancel";
import ContactUs from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      {/* Initialize HashRouter for managing navigation */}
      <HashRouter>
        {/* Include the Navbar component for navigation */}
        <Navbar />
        {/* Define the routes and their corresponding components */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/contact" element={<ContactUs />} />{" "}
          {/* ContactUs page route */}
          <Route path="/trips" element={<Trips />} /> {/* Trips page route */}
          <Route path="/info" element={<Info />} /> {/* Info page route */}
          {/* Receipt page route */}
          <Route path="/receipt" element={<Receipt />} />
          {/* Cancel page route */}
          <Route path="/cancel" element={<Cancel />} />
          {/* Add a catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

// Export the App component as the default export of the file
export default App;

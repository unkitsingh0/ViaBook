import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

// Create a React root to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the main App component wrapped with the Redux Provider for state management
root.render(
  <>
    {/* Use the 'Provider' component to provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* Render the main App component */}
      <App />
    </Provider>
  </>
);

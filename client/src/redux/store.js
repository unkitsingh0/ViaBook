// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./rootReducers";

// Create the Redux store with the combined rootReducers and apply the 'redux-thunk' middleware
const store = createStore(rootReducers, applyMiddleware(thunk));

// Export the configured store for use in the application
export default store;

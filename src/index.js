import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { products } from "./reducers";

const combinedReducer = combineReducers({
	products,
});

const store = configureStore({
	reducer: combinedReducer,
	middleware: [thunk, logger],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

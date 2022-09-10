import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes.js";
import { ToastContainer } from 'react-toastify';
import "./index.sass";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ToastContainer />
		<Routes />
	</React.StrictMode>
);

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

export default function Index() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

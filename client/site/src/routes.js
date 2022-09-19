import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";


export default function Index() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/cadastro" exact element={<Cadastro />} />

			</Routes>
		</BrowserRouter>
	);
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Recuperar from "./pages/recuperar-senha"
import RecuperarCodigo from './pages/recuperar-senha/recuperar-senha-codigo'
import Alterar from './pages/recuperar-senha/senha-nova'

export default function Index() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/cadastro" exact element={<Cadastro />} />
				<Route path="/recuperar" exact element={<Recuperar/>} />
				<Route path="/code" exact element={<RecuperarCodigo/>} />
				<Route path="/alterar-senha" exact element={<Alterar/>} />
			</Routes>
		</BrowserRouter>
	);
}

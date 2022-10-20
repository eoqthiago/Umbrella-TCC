import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Inicial from "./pages/chats/home";
import Pesquisa from "./pages/pesquisa";
import Config from "./pages/config";
import Amizades from "./pages/amizades";
import CommunitiesInfo from "./pages/communities-info";
import ChatComunidade from "./pages/chats/comunidades";
import ComunidadeConfig from "./pages/comunidade-config";
import NotFound from "./pages/notFound";
import LoginAdmin from "./pages/admin/login";
import Recuperar from "./pages/recuperar-senha/page-inicial-recuperar";
import RecuperarCodigo from "./pages/recuperar-senha/recuperar-senha-codigo";
import Alterar from "./pages/recuperar-senha/senha-nova";
import AlterarEmail from "./pages/alterar-email/page-alterar-email"
import EmailConfirm from "./pages/alterar-email/alterar-email"
import ChatPrivado from "./pages/chats/privado"

export default function Index() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' exact element={<Home />} />
				<Route path='/login' exact element={<Login />} />
				<Route path='/cadastro' exact element={<Cadastro />} />
				<Route path='/home' exact element={<Inicial />} />
				<Route path='/pesquisa' exact element={<Pesquisa />} />
				<Route path='/code' exact element={<RecuperarCodigo />} />
				<Route path='/alterar-senha' exact element={<Alterar />} />
				<Route path='/settings' exact element={<Config />} />
				<Route path='/amizades' exact element={<Amizades />} />
				<Route path='/comunidade/:idParam/info' exact element={<CommunitiesInfo />} />
				<Route path='/chat/comunidade/:id' exact element={<ChatComunidade />} />
				<Route path='/comunidade/:id/settings' exact element={<ComunidadeConfig />} />
				<Route path='/admin/login' exact element={<LoginAdmin />} />
				<Route path="/recuperar" exact element={<Recuperar />} />
				<Route path="/code" exact element={<RecuperarCodigo />} />
				<Route path="/alterar-senha" element={<Alterar />} />
				<Route path="/alterar-email" exact element={<AlterarEmail />} />
				<Route path="/chat/conversa/:id" exact element={<ChatPrivado />} />
				<Route path="/email-novo" exact element={<EmailConfirm />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

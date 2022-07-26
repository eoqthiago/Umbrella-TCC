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
import ChatComunidade from "./pages/chats/comunidade";
import ComunidadeConfig from "./pages/comunidade-config";
import UsuarioConfig from "./pages/usuario-config";
import NotFound from "./pages/notFound";
import LoginAdmin from "./pages/admin/login";
import Recuperar from "./pages/recuperar-senha/page-inicial-recuperar";
import RecuperarCodigo from "./pages/recuperar-senha/recuperar-senha-codigo";
import Alterar from "./pages/recuperar-senha/senha-nova";
import AlterarEmail from "./pages/alterar-email/page-alterar-email"
import EmailConfirm from "./pages/alterar-email/alterar-email"
import HomeAdm from "./pages/admin/dashboard"
import ChatPrivado from "./pages/chats/privado"
import AdminCadastro  from "./pages/admin/cadastro"
import AdminLogin from "./pages/admin/login";
import DenunciasUsuarios from "./pages/admin/denuncias/usuarios"
import DenunciasComunidades from "./pages/admin/denuncias/comunidades"

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
				<Route path='/usuario/:id' exact element={<UsuarioConfig />} />
				<Route path='/admin/login' exact element={<LoginAdmin />} />
				<Route path="/recuperar" exact element={<Recuperar />} />
				<Route path="/code" exact element={<RecuperarCodigo />} />
				<Route path="/alterar-senha" element={<Alterar />} />
				<Route path="/alterar-email" exact element={<AlterarEmail />} />
				<Route path="/chat/conversa/:id" exact element={<ChatPrivado />} />
				<Route path="/email-novo" exact element={<EmailConfirm />} />
				<Route path="/admin/dashboard" exact element={<HomeAdm />} />
				<Route path="/admin/cadastro" exact element={<AdminCadastro />} />
				<Route path="/admin/login" exact element={<AdminLogin />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/admin/denuncias/usuarios' exact element={<DenunciasUsuarios />} />
				<Route path='/admin/denuncias/comunidades' exact element={<DenunciasComunidades />} />
			</Routes>
		</BrowserRouter>
	);
}

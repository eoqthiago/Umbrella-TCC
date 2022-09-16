import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "local-storage";
import { toast } from "react-toastify";
import { userConsulta, userImagem } from "../../api/userApi";
import { useJwt } from "react-jwt";
import "./index.sass";

export default function Index() {
	const navigate = useNavigate();
	const [user, setUser] = useState({ imagem: "/assets/images/user.png" });
	const { decodedToken, isExpired } = useJwt(storage("user").token);
	const token = storage("user").token;

	useEffect(() => {
		if (isExpired || !storage("user")) {
			storage.remove("user");
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

	async function consultar() {
		const r = await userConsulta(storage("user").id);
		setUser(r);
	}

	useEffect(() => {
		consultar();
	}, []);

	function logout() {
		storage.remove("user");
		toast.success("Logout feito com sucesso!");
		navigate("/");
	}

	return (
		<div className="comp-menu" id="comp-menu-id">
			<button className="comp-menu-exit" onClick={() => document.getElementById("comp-menu-id").classList.remove("comp-menu-ativo")} />
			<section className="comp-menu-chats">
				<div className="comp-menu-search">
					<input type="text" placeholder="Pesquisar" />
					<img src="/assets/icons/search.svg" alt="Pesquisar" />
				</div>

				Comunidades
				
			</section>

			<section className="comp-menu-config">
				<img src="/assets/icons/create.svg" alt="Criar comunidade" title="Criar comunidade" />
				<img src="/assets/icons/edit.svg" alt="Configurações" title="Configurações" />
				<img src="/assets/icons/exit.svg" alt="Sair" title="Sair" onClick={() => logout()} />
				<hr />
				{user.imagem ? (
					<img src="/assets/images/user.png" alt="Usuário" className="comp-menu-img-user" />
				) : (
					<img src={userImagem(user.imagem)} alt="Usuário" title={user.nome} className="comp-menu-img-user" onClick={() => navigate(`/usuario/${user.id}`)} />
				)}
			</section>
		</div>
	);
}

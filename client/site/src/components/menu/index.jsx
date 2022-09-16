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

	return (
		<div className="comp-menu" id="comp-menu-id">
			<button className="comp-menu-exit" onClick={() => document.getElementById("comp-menu-id").classList.remove("comp-menu-ativo")} />
			<div className="comp-menu-search">
				<input type="text" placeholder="Pesquisar" />
				<img src="/assets/icons/search.svg" alt="Pesquisar" />
			</div>

			<section className="comp-menu-chats">Comunidades</section>

			<section className="comp-menu-config">
				{!user.imagem ? (
					<img src="/assets/images/user.png" alt="Usuário" />
				) : (
					<img src={userImagem(user.imagem)} alt="Usuário" title={user.nome} className="comp-menu-img-user" onClick={() => navigate(`/usuario/${user.id}`)} />
				)}
			</section>
		</div>
	);
}

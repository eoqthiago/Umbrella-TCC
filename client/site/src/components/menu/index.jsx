import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "local-storage";
import { toast } from "react-toastify";
import { userConsulta, userImagem } from "../../api/userApi";
import { useJwt } from "react-jwt";
import "./index.sass";

const token = storage('user').token

export default function Index() {
	const navigate = useNavigate();
	const [user, setUser] = useState({imagem: '/assets/images/user.png'});
	const { decodedToken, isExpired } = useJwt(token);

	async function consultar() {
		const r = await userConsulta(decodedToken.id, token);
		setUser(r);
	}

	useEffect(() => {
		if (isExpired) storage.remove("user");
		if (!storage("user")) {
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

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
				<img src={userImagem(user.imagem)} alt="Imagem de usuário" title={user.nome} className="comp-menu-img-user" onClick={() => navigate(`/usuario/${user.id}`)} />
			</section>
		</div>
	);
}

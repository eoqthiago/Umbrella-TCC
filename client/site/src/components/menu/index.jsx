import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localstorage from "local-storage";
import { toast } from "react-toastify";
import { userConsulta } from "../../api/userApi";
import { useJwt } from "react-jwt";
import "./index.sass";

export default function Index() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const { decodedToken, isExpired } = useJwt(localstorage("user").token);

	async function consultar() {
		const r = await userConsulta(decodedToken.id, localstorage("user").token);
		setUser(r);
	}

	useEffect(() => {
		if (isExpired) localstorage.remove("user");
		if (!localstorage("user")) {
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	}, []);

	useEffect(() => {
		consultar();
	}, []);

	return (
		<div className="comp-menu" id="comp-menu-id">
			<button className="comp-menu-exit" onClick={() => document.getElementById("comp-menu-id").classList.remove("comp-menu-ativo")} />

			<section className="comp-menu-chats">Comunidades</section>
			<section className="comp-menu-config">
				<img src={user.imagem} alt="Imagem de usuário" title={user.nome} />
			</section>
		</div>
	);
}

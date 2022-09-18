import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "local-storage";
import { toast } from "react-toastify";
import { userConsulta, userImagem } from "../../api/userApi";
import "./index.sass";

export default function Index({ ativo, alterar }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	function logout() {
		storage.remove("user");
		toast.success("Logout feito com sucesso!");
		navigate("/");
	}

	useEffect(() => {
		if (!storage('user')) {
			storage.remove("user");
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

	useEffect(() => {
		async function consultar() {
			const r = await userConsulta(storage('user').id);
			setUser(r);
		}
		consultar()
	}, []);

	return (
		<div className={(ativo && "comp-menu-ativo") + " comp-menu"}>
			<section className="comp-menu-chats">
				<div className="comp-menu-search">
					<input type="text" placeholder="Pesquisar" />
					<img src="/assets/icons/search.svg" alt="Pesquisar" />
				</div>
				<div>Comunidades</div>
			</section>

			<section className="comp-menu-config">
				<button className="comp-menu-exit" onClick={() => alterar(!ativo)} />

				<img src="/assets/icons/create.svg" alt="Criar comunidade" title="Criar comunidade" />
				<img src="/assets/icons/edit.svg" alt="Configurações" title="Configurações" />
				<img src="/assets/icons/exit.svg" alt="Sair" title="Sair" onClick={() => logout()} />
				<hr />

				<img
					src={!user.imagem ? "/assets/images/user.png" : userImagem(user.imagem)}
					alt="Usuário"
					title={user.nome}
					className="comp-menu-img-user"
					onClick={() => navigate(`/usuario/${user.id}`)}
				/>
			</section>
		</div>
	);
}

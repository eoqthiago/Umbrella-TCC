import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "local-storage";
import { toast } from "react-toastify";
import { userConsulta, userImagem } from "../../api/userApi";
import CadastrarComunidade from "../modals/cadastrarComunidade";
import "./index.sass";

export default function Index({ ativo, alterar }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [comunidade, setComunidade] = useState(false);

	function logout() {
		storage.remove("user");
		toast.success("Logout feito com sucesso!");
		navigate("/");
	}

	function exibirImagem() {
		try {
			if (!user.imagem) throw new Error("Imagem não encontrada");
			return userImagem(user.imagem);
		} catch (err) {
			return "/assets/images/user.png";
		}
	}

	useEffect(() => {
		if (!storage("user")) {
			storage.remove("user");
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

	useEffect(() => {
		async function consultar() {
			const r = await userConsulta(storage("user").id);
			setUser(r);
		}
		consultar();
	}, []);

	useEffect(() => {
		if (ativo) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [ativo]);

	return (
		<div className={ativo ? "comp-menu-bg" : undefined}>
			<CadastrarComunidade ativo={comunidade} state={setComunidade} />
			<main className={(ativo && "comp-menu-ativo") + " comp-menu"}>
				<section className="comp-menu-config">
					<div>
						<img src="/assets/icons/search-light.svg" alt="Pesquisa" title="Pesquisa" onClick={() => navigate("/pesquisa")} />
						<img src="/assets/icons/create.svg" alt="Criar comunidade" title="Criar comunidade" onClick={() => setComunidade(!comunidade)} />
						<img src="/assets/icons/edit.svg" alt="Configurações" title="Configurações" />
						<img src="/assets/icons/exit.svg" alt="Sair" title="Sair" onClick={() => logout()} />
						<hr />
						<img src={exibirImagem()} alt="Usuário" title={!user ? "" : user.nome} className="comp-menu-img-user" onClick={() => navigate(`/usuario/${user.id}`)} />
					</div>
				</section>
				<section className="comp-menu-chats">
					<button className="comp-menu-exit" onClick={() => alterar(!ativo)} />

					<div>Comunidades</div>
				</section>
			</main>
		</div>
	);
}

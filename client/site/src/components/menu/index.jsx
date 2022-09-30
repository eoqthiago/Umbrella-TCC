import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localStorage from "local-storage";
import { toast } from "react-toastify";
import { useJwt } from "react-jwt";
import { userAmigosConsulta, userComunidadesConsulta, userConsulta } from "../../api/userApi";
import { BuscarImg } from "../../api/services";
import CadastrarComunidade from "../modals/cadastrarComunidade";
import ListaMenu from "../listas/menu";
import "./index.sass";

export default function Index({ ativo, alterar }) {
	const { isExpired } = useJwt(localStorage("user").token ?? "");
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [comunidadeModal, setComunidadeModal] = useState(false);
	const [comunidades, setComunidades] = useState([]);
	const [amigos, setAmigos] = useState([]);

	function logout() {
		document.body.style.overflow = "unset";
		localStorage.remove("user");
		toast.success("Logout feito com sucesso!");
		navigate("/");
	}

	useEffect(() => (isExpired ? logout() : undefined));

	useEffect(() => {
		if (!localStorage("user")) {
			localStorage.remove("user");
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

	useEffect(() => {
		async function consultarUsuario() {
			try {
				const r = await userConsulta(localStorage("user").id);
				setUser(r);
			} catch (err) {}
		}
		consultarUsuario();
	}, []);

	useEffect(() => {
		if (ativo) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [ativo]);

	useEffect(() => {
		async function consultasMenu() {
			try {
				const r = await userAmigosConsulta(localStorage("user").id);
				setAmigos(r);
			} catch (err) {}
			try {
				const r = await userComunidadesConsulta(localStorage("user").id);
				setComunidades(r);
			} catch (err) {}
		}
		consultasMenu();
	}, []);

	return (
		<div className={ativo ? "comp-menu-bg" : undefined}>
			<CadastrarComunidade ativo={comunidadeModal} state={setComunidadeModal} />
			<main className={(ativo && "comp-menu-ativo") + " comp-menu"}>
				<section className="comp-menu-config">
					<div>
						<img
							src="/assets/icons/search-light.svg"
							alt="Pesquisa"
							title="Pesquisa"
							onClick={() => {
								document.body.style.overflow = "unset";
								navigate("/pesquisa");
							}}
						/>
						<img src="/assets/icons/create.svg" alt="Criar comunidade" title="Criar comunidade" onClick={() => setComunidadeModal(!comunidadeModal)} />
						<img
							src="/assets/icons/edit.svg"
							alt="Configurações"
							title="Configurações"
							onClick={() => {
								document.body.style.overflow = "unset";
								navigate("/settings");
							}}
						/>
						<img src="/assets/icons/exit.svg" alt="Sair" title="Sair" onClick={() => logout()} />
						<hr />
						<img
							src={user.imagem ? BuscarImg(user.imagem) : "/assets/images/user.png"}
							alt="Usuário"
							title={user.nome ?? "Usuário"}
							className="comp-menu-img-user"
							onClick={() => {
								document.body.style.overflow = "unset";
								navigate(`/usuario/${user.id}`);
							}}
						/>
					</div>
				</section>
				<section className="comp-menu-chats">
					<button className="comp-menu-exit" onClick={() => alterar(!ativo)} />

					<div>Comunidades</div>
					<section>
						{comunidades.map((item) => (
							<ListaMenu item={item} />
						))}
					</section>

					<div>Amizades</div>
					<section>
						{amigos.map((item) => (
							<ListaMenu item={item} />
						))}
					</section>
				</section>
			</main>
		</div>
	);
}

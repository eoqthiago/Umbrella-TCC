import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Menu from "../../components/menu";
import ListaAmizade from "../../components/listas/amizade";
import { Titulo } from "../../styled";
import { consultarPedidosAmizade, userAmigosConsulta } from "../../api/userApi";
import localStorage from "local-storage";
import "./index.sass";

const Index = () => {
	const [menu, setMenu] = useState(false);
	const [solicitacoes, setSolicitacoes] = useState([]);
	const [solicitados, setSolicitados] = useState([]);
	const [amigos, setAmigos] = useState([]);

	useEffect(() => {
		async function consulta() {
			try {
				const r = await consultarPedidosAmizade();
				const s = await userAmigosConsulta(localStorage("user").id);
				setSolicitacoes(r.solicitacoes);
				setSolicitados(r.solicitados);
				setAmigos(s);
			} catch (err) {}
		}
		consulta();
	}, []);

	return (
		<div className="amizades page">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />
			<main>
				<section>
					<Titulo fonte="1vw" cor="#131313">
						Pedidos de amizade
					</Titulo>
					<div>
						{solicitacoes.map((item) => (
							<ListaAmizade item={item} tipo="recebido" key={item.id} />
						))}
						{solicitados.map((item) => (
							<ListaAmizade item={item} tipo="enviado" key={item.id} />
						))}
					</div>
				</section>
				<section>
					<Titulo fonte="1vw" cor="#131313">
						Amigos
					</Titulo>
					<div>
						{amigos.map((item) => (
							<ListaAmizade item={item} tipo="amigo" key={item.id} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
};

export default Index;

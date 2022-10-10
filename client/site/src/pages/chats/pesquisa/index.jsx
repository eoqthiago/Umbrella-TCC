import React, { useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import Card from "../../../components/card";
import User from "../../../components/listas/usuario";
import "./index.sass";
import { pesquisar } from "../../../api/communityApi";

const Index = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [comunidades, setComunidades] = useState([]);
	const [mensagens, setMensagens] = useState([]);
	const [pesquisa, setPesquisa] = useState("");
	const [selecionado, setSelecionado] = useState("comunidades");
	const [menu, setMenu] = useState(false);

	async function consultar() {
		const r = await pesquisar(selecionado, pesquisa);
		switch (selecionado) {
			case "comunidades":
				if (r.tipo !== "array") setComunidades([r]);
				else setComunidades(r);
				break;
			case "usuarios":
				setUsuarios(r);
				break;
			case "mensagens":
				setMensagens(r);
				break;
			default:
				break;
		}
	}

	return (
		<div className="pesquisa page">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />
			<main>
				<ul className="pesquisa-categorias">
					<nav className={selecionado === "usuarios" ? "selecionado" : ""} onClick={() => setSelecionado("usuarios")}>
						Usuários
					</nav>
					<nav className={selecionado === "comunidades" ? "selecionado" : ""} onClick={() => setSelecionado("comunidades")}>
						Comunidades
					</nav>
					<nav className={selecionado === "mensagens" ? "selecionado" : ""} onClick={() => setSelecionado("mensagens")}>
						Mensagens
					</nav>
				</ul>
				<div className="pesquisa-input">
					<input type="text" placeholder="Pesquisar" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyDown={(e) => e.key === "Enter" && consultar(pesquisa)} />
					<img src="/assets/icons/search.svg" alt="Pesquisar" onClick={() => consultar()} />
				</div>
				<section>
					{selecionado === "comunidades" &&
						comunidades.map((item) => <Card key={item.id} nome={item.nome} descricao={item.descricao} imagem={item.imagem} id={item.id} usuarios={item.qtdUsuarios} />)}
					{selecionado === "usuarios" && usuarios.map((item) => <User item={item} key={item.id} />)}
					{selecionado === "mensagens" && mensagens.map(() => <>Mensagens</>)}
				</section>
			</main>
		</div>
	);
};

export default Index;

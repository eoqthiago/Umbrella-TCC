import React, { useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import Card from "../../../components/card";
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
				setComunidades(r);
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
		<div className="pesquisa page ">
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
					<input type="text" placeholder="Pesquisar" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
					<img src="/assets/icons/search.svg" alt="Pesquisar" onClick={() => consultar()} />
				</div>
				<section>
					{selecionado === "comunidades" && comunidades.map(item => 
						<Card nome={item.nm_comunidade} descricao={item.ds_comunidade} imagem={item.img_comunidade} id={item.id_comunidade}/>
					)}
					{selecionado === "usuarios" && usuarios.map(() => <>Usuarios</>)}
					{selecionado === "mensagens" && mensagens.map(() => <>Mensagens</>)}
				</section>
			</main>
		</div>
	);
};

export default Index;

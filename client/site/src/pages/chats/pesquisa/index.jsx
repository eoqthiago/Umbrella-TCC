import React, { useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import Card from "../../../components/card";
import "./index.sass";

const Index = () => {
	// const [usuarios, setUsuarios] = useState([]);
	// const [comunidades, setComunidades] = useState([]);
	// const [mensagens, setMensagens] = useState([]);
	const [pesquisa, setPesquisa] = useState("");
    const [menu, setMenu] = useState(false);

	return (
		<div className="pesquisa page ">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />
			<main>
				<ul className="pesquisa-categorias">
					<nav>Usuários</nav>
					<nav>Comunidades</nav>
					<nav>Mensagens</nav>
				</ul>
				<div className="pesquisa-input">
					<input type="text" placeholder="Pesquisar" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
					<img src="/assets/icons/search.svg" alt="Pesquisar" />
				</div>
				<section>
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</section>
			</main>
		</div>
	);
};

export default Index;

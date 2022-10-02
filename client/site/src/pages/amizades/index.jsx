import React, { useState } from "react";
import Header from "../../components/header";
import Menu from "../../components/menu";
import ListaAmizade from "../../components/listas/amizade";
import { Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	const [menu, setMenu] = useState(false);
	const [pedidos, seTpedidos] = useState([{ nome: "legal" }, { nome: "legal" }, { nome: "legal" }]);
	const [amigos, seTamigos] = useState([{ nome: "legal" }, { nome: "legal" }, { nome: "legal" }]);
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
						{pedidos.map((item) => (
							<ListaAmizade item={item} />
						))}
					</div>
				</section>
				<section>
					<Titulo fonte="1vw" cor="#131313">
						Amigos
					</Titulo>
					<div>
						{amigos.map((item) => (
							<ListaAmizade item={item} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
};

export default Index;

import React from "react";
import { BuscarImg } from "../../../api/services";
import "./index.sass";

const Index = ({ item, selecionado }) => {
	return (
		<div className={"comp-lista-menu " + (selecionado && "comp-lista-menu-selecionado")}>
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Imagem" />
			<div>{item.nome}</div>
		</div>
	);
};

export default Index;

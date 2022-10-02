import React from "react";
import { BuscarImg } from "../../../api/services";
import "./index.sass";

const Index = ({ item, selecionado, convMenu, tipo, setTipo }) => {
	return (
		<div
			className={"comp-lista-menu " + ((selecionado ? selecionado.id : "") === (item ? item.id : 0) && "comp-lista-menu-selecionado")}
			onMouseDownCapture={(e) => {
				if (e.button === 2) {
					setTipo(tipo);
					convMenu.setSelecionada(item);
					convMenu.setPos({ x: e.clientX, y: e.clientY });
					convMenu.open();
					document.oncontextmenu = document.body.oncontextmenu = () => false;
				}
			}}>
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Imagem" />
			<div>{item.nome}</div>
		</div>
	);
};

export default Index;

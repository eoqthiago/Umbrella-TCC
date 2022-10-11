import React from "react";
import { useNavigate } from "react-router-dom";
import { BuscarImg } from "../../../api/services";
import "./index.sass";

const Index = ({ item, selecionado, convMenu, tipo, setTipo }) => {
	const navigate = useNavigate();

	return (
		<div
			className={"comp-lista-menu " /* + ((selecionado ? selecionado.id : "") === (item ? item.id : 0) && "comp-lista-menu-selecionado") */}
			onMouseDownCapture={(e) => {
				if (e.button === 2) {
					setTipo(tipo);
					convMenu.setSelecionada(item);
					convMenu.setPos({ x: e.clientX, y: e.clientY });
					convMenu.open();
					document.oncontextmenu = document.body.oncontextmenu = () => false;
				}
			}}
			onClick={() => navigate(tipo === "comunidade" ? `/chat/comunidade/${item.id}` : `/chat/conversa/${item.id}`)}>
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Imagem" />
			<div>{item.nome}</div>
		</div>
	);
};

export default Index;

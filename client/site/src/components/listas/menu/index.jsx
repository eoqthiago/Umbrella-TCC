import React, { useState } from "react";
import MenuListaModal from "../../modals/menu";
import { BuscarImg } from "../../../api/services";
import "./index.sass";

const Lista = ({ item, selecionado }) => {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [ativo, setAtivo] = useState(false);

	return (
		<div
			className={"comp-lista-menu " + (selecionado && "comp-lista-menu-selecionado")}
			onMouseDownCapture={(e) => {
				if (ativo) return;
				if (e.button === 2) {
					setPos({ x: e.clientX, y: e.clientY });
					setAtivo(true);
					document.oncontextmenu = document.body.oncontextmenu = function () {
						return false;
					};
				}
			}}>
			<MenuListaModal position={pos} ativo={ativo} setAtivo={setAtivo} />
			<main>
				<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Imagem" />
				<div>{item.nome}</div>
			</main>
		</div>
	);
};

export default Lista;

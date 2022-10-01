import React from "react";
import "./index.sass";

const MenuModal = ({ ativo, setAtivo, position, ref }) => {
	return (
		<span
			className={"comp-modal-menu " + (ativo ? "comp-modal-menu-ativo" : "")}
			style={{
				top: position.y + "px",
				left: position.x + "px",
			}}>
			<div>Sair da comunidade</div>
			<div>Sair da comunidade</div>
			<div>Sair da comunidade</div>
			<div>Sair da comunidade</div>
			<div>Sair da comunidade</div>
		</span>
	);
};

export default MenuModal;

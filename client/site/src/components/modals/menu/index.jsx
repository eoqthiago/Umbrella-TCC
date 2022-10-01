import React from "react";
import "./index.sass";

const Index = ({ ativo, position, selecionada, modalRef }) => {
	return (
		<span
			className={"comp-modal-menu " + (ativo ? "comp-modal-menu-ativo" : "")}
			style={{
				top: position.y + "px",
				left: position.x + "px",
			}}
			ref={modalRef}>
			<div>{selecionada ? selecionada.nome : ""}</div>
			<div>
				<img src="/assets/icons/config.svg" alt="Configurar" /> Configurar
			</div>
			<div>
				<img src="/assets/icons/removeFriend.svg" alt="Remover Amizade" /> Desfazer Amizade
			</div>
			<div>
				<img src="/assets/icons/danger.svg" alt="Reportar" /> Reportar
			</div>
			<div>
				<img src="/assets/icons/exit.svg" alt="Sair" /> Sair
			</div>
		</span>
	);
};

export default Index;

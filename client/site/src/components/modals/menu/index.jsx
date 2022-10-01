import React from "react";
import "./index.sass";

const Index = ({ ativo, position, selecionada, modalRef }) => {
	return (
		<span className={"comp-modal-menu " + (ativo ? "comp-modal-menu-ativo" : "")}>
			<main
				style={{
					top: position.y + "px",
					left: position.x + "px",
				}}
				ref={modalRef}>
				<div>{selecionada ? selecionada.nome : ""}</div>
				<div>Sair da comunidade</div>
			</main>
		</span>
	);
};

export default Index;

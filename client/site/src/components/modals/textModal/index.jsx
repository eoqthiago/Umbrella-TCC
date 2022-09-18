import React from "react";
import "./index.sass";

const Index = ({ ativo, state, titulo, conteudo }) => {
	return (
		<div className={(ativo && "comp-modal-texto-ativo") + " comp-modal-texto"}>
			<main>
				<button className="comp-modal-texto-exit" onClick={() => state()} />
				<h1>{titulo}</h1>
				<div>{conteudo}</div>
			</main>
		</div>
	);
};

export default Index;

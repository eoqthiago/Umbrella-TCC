import React from "react";
import "./index.sass";

const Index = (props) => {
	return (
		<div className={(props.ativo && "comp-modal-ativo") + " comp-modal"}>
			<main>
				<button className="comp-modal-exit" onClick={() => props.state()} />
				<h1>{props.titulo}</h1>
				<div>{props.conteudo}</div>
			</main>
		</div>
	);
};

export default Index;

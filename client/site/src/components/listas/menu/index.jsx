import React from "react";
import "./index.sass";

const Index = ({ item }) => {
	return (
		<div className="comp-lista-menu">
			<img src="/assets/images/star-wars.webp" alt="Imagem" />
            <div>{item.nome}</div>
		</div>
	);
};

export default Index;

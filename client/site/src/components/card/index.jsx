import React from "react";
import "./index.sass";
import { BuscarImg } from "../../api/services";

export function Index({ comunidade }) {
	comunidade = {
		nome: "Comunidade",
		descricao: "Descrição",
		qtdUsuarios: 0,
	}; //* Apenas para não dar erro

	return (
		<div className="comp-card">
			<img src={comunidade.imagem ? BuscarImg(comunidade.imagem) : "/assets/images/star-wars.webp"} alt="Comunidade" />
			<div className="info-cont">
				<div>
					<div>{comunidade.nome ?? "Comunidade"}</div>
					<p>{comunidade.descricao ?? "Descrição"}</p>
				</div>
				<div className="qtd-info">
					<img src={""} alt="" />
					<p>{comunidade.qtdUsuarios ?? "0"}</p>
				</div>
			</div>
		</div>
	);
}

export default Index;

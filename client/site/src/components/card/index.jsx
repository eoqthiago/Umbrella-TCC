import React from "react";
import "./index.sass";
import { BuscarComunidadeImg } from "../../api/services";
import counterIcon from "../../assets/icons/icon_counter.png";

export function Index({comunidade}) {
	return (
		<div className="comp-card">
			<img src={BuscarComunidadeImg(comunidade.imagem)} alt="Comunidade" />
			<div className="info-cont">
				<div>
					<div>{comunidade.nome}</div>
					<p>{comunidade.descricao}</p>
				</div>
				<div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "1em" }}>
					<img src={counterIcon} alt="" />
					<p>{comunidade.qtdUsuarios}</p>
				</div>
			</div>
		</div>
	);
}

export default Index;

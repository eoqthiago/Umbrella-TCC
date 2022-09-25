import React from "react";
import "./index.sass";
import { BuscarComunidadeImg } from "../../api/communityApi";
import counterIcon from "../../assets/icons/icon_counter.png"


export function Index(props){
	return (
		<div className="comp-card">
			<img src={BuscarComunidadeImg(props.imagem)} alt="Comunidade" />
			<div className="info-cont">
				<div>
					<div>{props.nome}</div>
					<p>{props.descricao}</p>
				</div>
				<div style={{"display": "flex", "flexDirection": "row-reverse", "marginRight": "1em"}}>
					<img src={counterIcon} alt=""/>
					<p>{props.usuarios}</p>
				</div>
			</div>
		</div>
	)
};

export default Index;

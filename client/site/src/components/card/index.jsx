import React from "react";
import "./index.sass";
import { BuscarComunidadeImg, usuariosCommunityQtd } from "../../api/communityApi";
import counterIcon from "../../assets/icons/icon_counter.png"


export function Index(props) {	
	return (
		<div className="comp-card">
			<img src={BuscarComunidadeImg(props.imagem)} alt="Comunidade" />
			<div className="info-cont">
				<div>
					<div>{props.nome}</div>
					<p>{props.descricao.substr(0, 84)}</p>
				</div>
				<div className='qtd-info'>
					<img src={counterIcon} alt=""/>
					<p>{/*usuariosCommunityQtd(props.id)*/}</p>
				</div>
			</div>
		</div>
	)
};

export default Index;
import React from "react";
import "./index.sass";
import { BuscarImg } from "../../api/services";
import { useNavigate } from "react-router-dom";

export function Index(props) {
	const navigate = useNavigate();
	
	return (
		<div className="comp-card" onClick={() => navigate(`/communities/${props.id}/information`)}>
			<img src={props.imagem ? BuscarImg(props.imagem) : "/assets/images/star-wars.webp"} alt="Comunidade" />
			<div className="info-cont">
				<div>
					<div>{props.nome ?? "Comunidade"}</div>
					<p>{props.descricao ?? "Descrição"}</p>
				</div>
				<div className="qtd-info">
					<img src={"/assets/icons/icon_counter.png"} alt="" />
					<p>{props.usuarios ?? "0"}</p>
				</div>
			</div>
		</div>
	);
}

export default Index;
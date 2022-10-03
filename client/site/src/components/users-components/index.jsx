import React from "react";
import "./index.sass";
import { toast } from "react-toastify";
import { BuscarImg } from "../../api/services";

export default function Index(props) {

	function adicionarUser(userId) {
		toast.success("Pedido de amizade enviado!");
	}

	return (
		<div className="comp-users">
			<div>
				<img src={props.imagem ? BuscarImg(props.imagem) : "/assets/images/user.png"} alt="IMagem usuario"/>
				<p>{props.nome}#{props.id}</p>
			</div>
			<span>
				<button onClick={() => adicionarUser(props.id)}/>
			</span>
		</div>
	);
}
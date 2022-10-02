import React from "react";
import { useNavigate } from "react-router-dom";
import { BuscarImg } from "../../../api/services";
import "./index.sass";

const Index = ({ item, tipo }) => {
	const navigate = useNavigate();
	return (
		<li className="comp-lista-amizade">
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${item.id}`)} />
			<div>
				<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
				<div>
					{tipo === "recebido" && <img src="/assets/icons/addFriend.svg" alt="Adicionar amigo" />}
					{(tipo === "enviado" || tipo === "recebido") && <img src="/assets/icons/removeFriendRed.svg" alt="Remover amigo" />}
					{tipo === "amigo" && <button onClick={() => navigate(`/usuario/${item.id}`)}>Ver</button>}
				</div>
			</div>
		</li>
	);
};

export default Index;

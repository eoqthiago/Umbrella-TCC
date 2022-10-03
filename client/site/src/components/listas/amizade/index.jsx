import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BuscarImg } from "../../../api/services";
import { acoesAmizade } from "../../../api/userApi";
import "./index.sass";

const Index = ({ item, tipo }) => {
	const navigate = useNavigate();
	const [invisible, setInvisible] = useState(false);

	async function handleAcoes(acao) {
		try {
			const r = await acoesAmizade(acao, item.amizade);
			if (r !== 204) throw new Error("Um erro ocorreu");
			toast.success(acao === "A" ? "Solicitação aceita" : (tipo === "recebido" ? "Solicitação recusada" : "Solicitação desfeita"));
			setInvisible(true);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	return (
		<li className="comp-lista-amizade" style={{ display: invisible ? "none" : "" }}>
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${item.id}`)} />
			<div>
				<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
				<div>
					{tipo === "recebido" && <img onClick={() => handleAcoes("A")} src="/assets/icons/addFriend.svg" alt="Adicionar amigo" />}
					{(tipo === "enviado" || tipo === "recebido") && <img onClick={() => handleAcoes("N")} src="/assets/icons/removeFriendRed.svg" alt="Recusar solicitação" />}
					{tipo === "amigo" && <button onClick={() => navigate(`/usuario/${item.id}`)}>Ver</button>}
				</div>
			</div>
		</li>
	);
};

export default Index;

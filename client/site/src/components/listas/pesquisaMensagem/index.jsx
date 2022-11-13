import localStorage from "local-storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pesquisarMensagem } from "../../../api/communityApi";
import { BuscarImg } from "../../../api/services";

import "./index.sass";

const Index = ({ item }) => {
	const navigate = useNavigate();
	const [block, setBlock] = useState(false);

	async function handleMensagem(id) {
		try {
			const r = await pesquisarMensagem(id);
			if (r !== 204) throw new Error("Não foi possível pesquisar");
			toast.success("foi");
			setBlock(true);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	return (
		<li className="comp-lista-usuario" style={{ display: localStorage("user").id === item.id ? "none" : "flex" }}>
			<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${item.id}`)} />
			<div>
				<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
				<div>
					<img onClick={() => handleMensagem(item.id)} src="/assets/icons/addFriend.svg" alt="Adicionar amigo" disabled={block} />
				</div>
			</div>
		</li>
	);
};

export default Index;

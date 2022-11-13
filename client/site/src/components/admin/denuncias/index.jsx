import localStorage from "local-storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BuscarImg } from "../../../api/services";
import { pedirAmizade } from "../../../api/userApi";
import Modal from "../../../components/modals/denuncias"
import "./index.sass";

export default function Index(props) {
	const navigate = useNavigate();
	const [block, setBlock] = useState(false);
	const [visibility, setVisibility] = useState(false);;

	async function handleNavigate(item, tipo) {
		try {
            if (tipo === "usuario") {
                    navigate(`/usuario/${item.id}`);
            } else {
                navigate(`/home`);
            }
			const r = await pedirAmizade();
			if (r !== 204) throw new Error("Não foi possível pedir em amizade");
			toast.success("Pedido de amizade feito com sucesso");
			setBlock(true);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	};

	return (
		<div>
			<li className="comp-lista-usuario" >
			<img src={props.item.imagem ? BuscarImg(props.item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${props.item.id}`)} />
			<div>
				<span onClick={() => handleNavigate(props.item, props.tipo)}>{props.item.nome}</span>
				<div onClick={() => setVisibility(true)}>
					<img src="/assets/images/report_button.png" alt="Abrir modal" />
				</div>
			</div>
			</li>
		</div>
	);
};
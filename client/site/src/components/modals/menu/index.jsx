import React from "react";
import { toast } from "react-toastify";
import { removerAmizade } from "../../../api/userApi";
import "./index.sass";

const Index = ({ ativo, position, selecionada, modalRef, tipo, user, comunidade, setAtivo }) => {
	async function handleRemoveAmigo() {
		try {
			if (!selecionada.id || tipo !== "usuario") throw new Error("Não foi possível concluir essa operação");
			const r = await removerAmizade(selecionada.id);
			if (r !== 204) throw new Error("Não foi possível remover a amizade");
			toast.warning("Amizade removida");
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	return (
		<span
			className={"comp-modal-menu " + (ativo ? "comp-modal-menu-ativo" : "")}
			style={{
				top: position.y + "px",
				left: position.x + "px",
			}}
			ref={modalRef}>
			<div>{selecionada ? selecionada.nome : ""}</div>
			<div className="comp-modal-menu-pointer" />
			<div>
				<img src="/assets/icons/talk.svg" alt="Conversar" />
				Conversar
			</div>
			{tipo === "comunidade" && (
				<div>
					<img src="/assets/icons/config.svg" alt="Configurar" /> Configurar
				</div>
			)}
			{tipo === "usuario" && (
				<div onClick={() => handleRemoveAmigo()}>
					<img src="/assets/icons/removeFriend.svg" alt="Remover Amizade" /> Desfazer Amizade
				</div>
			)}
			<div
				onClick={() => {
					if (tipo === "comunidade") {
						setAtivo(!ativo);
						comunidade.setComDenuncia(!comunidade.comDenuncia);
					} else if (tipo === "usuario") {
						setAtivo(!ativo);
						user.setUserDenuncia(!user.userDenuncia);
					}
				}}>
				<img src="/assets/icons/danger.svg" alt="Reportar" /> Reportar
			</div>
			{tipo === "comunidade" && (
				<div>
					<img src="/assets/icons/exit.svg" alt="Sair" /> Sair
				</div>
			)}
		</span>
	);
};

export default Index;

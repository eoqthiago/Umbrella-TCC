import localStorage from "local-storage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BotaoLiso } from "../../styled";
import "./index.sass";

export default function Index(props) {
	const navigate = useNavigate();

	return (
		<header className="comp-header">
			<img src="/assets/icons/logo.png" alt="Logo" onClick={() => (localStorage("user") ? navigate("/home") : navigate("/"))} />

			<nav>
				{props.login && (
					<BotaoLiso main="#fff" padding="3px 12px" fonte="18px" onClick={() => navigate("/login")}>
						Entrar
					</BotaoLiso>
				)}
				{props.voltar && (
					<BotaoLiso main="#fff" padding="3px 12px" fonte="16px" onClick={() => navigate(-1)}>
						Voltar
					</BotaoLiso>
				)}
				{props.menu && <img className="comp-header-menu-icon" onClick={() => props.alterarMenu(!props.estadoMenu)} src="/assets/icons/menu.svg" alt="Menu" />}
			</nav>
		</header>
	);
}

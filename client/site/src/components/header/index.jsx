import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.sass";

export default function Index(props) {
	const navigate = useNavigate();

	return (
		<header className="comp-header">
			<img src="/assets/icons/logo.png" alt="Logo" />

			<nav>
				{props.login && <div onClick={() => navigate("/login")}>Entrar</div>}
				{props.voltar && <div onClick={() => navigate(-1)}>Voltar</div>}
			</nav>
		</header>
	);
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localstorage from "local-storage";
import { toast } from "react-toastify";
import "./index.sass";

export default function Index() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localstorage("user")) {
			toast.warn("Você precisa estar logado para acessar essa página");
			navigate("/");
		}
	});

	return (
		<div className="comp-menu" id="comp-menu-id">
			<button className="comp-menu-exit" onClick={() => document.getElementById("comp-menu-id").classList.remove("comp-menu-ativo")}>
				X
			</button>
			<section>comunidades</section>
			<section>Configurações</section>
		</div>
	);
}

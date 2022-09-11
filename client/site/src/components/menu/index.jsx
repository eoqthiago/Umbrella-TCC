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
		<div>
			<div></div>
		</div>
	);
}

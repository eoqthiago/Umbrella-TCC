import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import localstorage from "local-storage";
import { userCodeSearch } from "../../../api/userApi";

import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";

export default function Index() {
	const [codigo, setCodigo] = useState("");
	const navigate = useNavigate();
	const ref = useRef();
	const [loading, setLoading] = useState(false);



	
	async function handleCode() {
		localstorage.remove("user");
		setLoading(true);
		ref.current.continuousStart();

		try {
			// const r = await axios.post('')
			const r = await userCodeSearch(codigo);
			localstorage("user", r);
			console.log(r)
			if (r != codigo) {
				setTimeout(() => navigate("/alterar-senha"), 2000);
				toast.success("Altere sua senha");	
			} else  {
				toast.warn("codigo incorreto");	

			}
			
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			setLoading(false);
			ref.current.complete();
		}
	}



	return (
		<div className="email page">
			<LoadingBar color="#48d677" ref={ref} />
			<main>
				<div className="email-titulos">
					<Titulo cor="#02C17D" fonte="4vw">
						Recuperar senha
					</Titulo>
					<SubTitulo cor="#3F3F3F" fonte="2.5vw">
						Insira o código enviado no email
					</SubTitulo>
				</div>
				<div className="email-corpo">
					<div className="email-inputs">
						<Input placeholder="Código" width="100%" type="email" value={codigo} onChange={(e) => setCodigo(Number(e.target.value))} />
					</div>
					<div className="email-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={handleCode}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

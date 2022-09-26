import React, { useState, useRef, useEffect } from "react";
// import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { userEmailSearch } from "../../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import { toast } from "react-toastify";
import localstorage from "local-storage";
import LoadingBar from "react-top-loading-bar";
import "./index.sass";

export default function Index() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const ref = useRef();
	const [loading, setLoading] = useState(false);


	async function handleEmail() {
		localstorage.remove("user");
		setLoading(true);
		ref.current.continuousStart();

		try {
			// const r = await axios.post('')
			const r = await userEmailSearch(email);
			console.log(r)
			if (r != email) {
				toast.success("Email enviado");	
				setTimeout(() => navigate("/code"), 2500);
			} else  {
				toast.warn("Email incorreto");	

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
						Insira seu endereço email associado à sua conta
					</SubTitulo>
				</div>
				<div className="email-corpo">
					<div className="email-inputs">
						<Input placeholder="Email" disabled={loading} width="100%" type="text" value={email}  onChange={e => setEmail(e.target.value)} />
					</div>
					<div className="email-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={handleEmail}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

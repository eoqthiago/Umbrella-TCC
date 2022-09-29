import React, { useState, useRef, useEffect } from "react";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import localstorage from "local-storage";
import LoadingBar from "react-top-loading-bar";

import { userAlterarPassword, userConsulta } from "../../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";

export default function Index() {
	const [senha, setSenha] = useState("");
	const [senhaCheck, setSenhaCheck] = useState("");
	const navigate = useNavigate();
	const ref = useRef();
	const [loading, setLoading] = useState(false);
	const [parametro] = useSearchParams();
	const token = parametro.get('token')
	const id = parametro.get('id')
	
	


	useEffect(() => {
		async function verifQuery() {
			try {
				console.log(id, token)
				let idcode = Number(id)

				if(!token || !idcode) throw new Error ("invalidos");

				const r = await userConsulta(idcode);
				localstorage("user", r);
				console.log(r)
				if(r !== idcode) throw new Error("invalidos 2");
				navigate("/alterar-senha");
			} catch (err) {
				console.log(err.message)
				toast.error(err.message);
				
			}
		}
		verifQuery();
		
	}, []);

	async function confirmarClick() {
		localstorage.remove("user");
		setLoading(true);
		ref.current.continuousStart();
		try {
			if(senha !== senhaCheck ) {
				toast.error("Suas senhas não coincidem")
			}
			if (senha === senhaCheck){
				const r = await userAlterarPassword(senha);
				localstorage("user", r);
				toast.success("🚀 Senha alterada com sucesso!");
				navigate("/login");


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
						Insira sua nova senha
					</SubTitulo>
				</div>
				<div className="email-corpo">
					<div className="email-inputs">
						<Input placeholder="Nova Senha" width="100%" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
						<Input placeholder="Confirmar Senha" width="100%" type="password" value={senhaCheck} onChange={(e) => setSenhaCheck(e.target.value)} />
					</div>
					<div className="email-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={confirmarClick}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

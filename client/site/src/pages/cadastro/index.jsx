import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import localstorage from "local-storage";
import { userCadastro } from "../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const ref = useRef();

	async function handlecadastro() {
		setLoading(true);
		ref.current.continuousStart();
		try {
			const r = await userCadastro(email, senha);
			localstorage("user", r);
			setTimeout(() => navigate("/"), 2000);
		} catch (err) {
			if (err.response.status === 401) toast.error(err.response.data.err);
			setLoading(false);
			ref.current.complete();
		}
	}

	return (
		<div className="cadastro page">
			<LoadingBar color="#48d677" ref={ref} />
			<main>
				<div className="cadastro-titulos">
					<Titulo cor="#02C17D" fonte="4vw">
						cadastro
					</Titulo>
					<SubTitulo cor="#3F3F3F" fonte="2.5vw">
						Estamos felizes em ter você de volta!
					</SubTitulo>
				</div>
				<div className="cadastro-corpo">
					<div className="cadastro-inputs">
						<Input placeholder="Email" width="100%" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
						<Input placeholder="Senha" width="100%" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={loading} />
						<div className="cadastro-legenda">
							Esqueceu sua senha? Clique <span> aqui </span> para recuperá-la
						</div>
					</div>
					<div className="cadastro-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={handlecadastro} disabled={loading}>
							Confirmar
						</BotaoSolido>
						<div className="cadastro-legenda">
							Não possui uma conta? Faça seu cadastro <span> aqui! </span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

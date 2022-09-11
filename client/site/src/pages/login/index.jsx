import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import localstorage from "local-storage";
import { userLogin } from "../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const ref = useRef();

	async function handleLogin() {
		setLoading(true);
		ref.current.continuousStart();
		try {
			const r = await userLogin(email, senha);
			localstorage("user", r);
			setTimeout(() => navigate("/"), 2000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			setLoading(false);
			ref.current.complete();
		}
	}

	return (
		<div className="login page">
			<LoadingBar color="#48d677" ref={ref} />
			<main>
				<div className="login-titulos">
					<Titulo cor="#02C17D" fonte="4vw">
						Login
					</Titulo>
					<SubTitulo cor="#3F3F3F" fonte="2.5vw">
						Estamos felizes em ter você de volta!
					</SubTitulo>
				</div>
				<div className="login-corpo">
					<div className="login-inputs">
						<Input placeholder="Email" width="100%" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
						<Input placeholder="Senha" width="100%" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={loading} />
						<div className="login-legenda" >
							Esqueceu sua senha? Clique <span onClick={() => navigate("/recuperar")}> aqui </span> para recuperá-la
						</div>
					</div>
					<div className="login-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={handleLogin} disabled={loading}>
							Confirmar
						</BotaoSolido>
						<div className="login-legenda">
							Não possui uma conta? Faça seu cadastro <span onClick={() => navigate("/cadastro")}> aqui! </span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

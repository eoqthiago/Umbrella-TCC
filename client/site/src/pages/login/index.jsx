import React from "react";
import { useState } from "react";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	return (
		<div className="login page">
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
						<Input placeholder="Email" width="100%" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<Input placeholder="Senha" width="100%" value={senha} onChange={(e) => setSenha(e.target.value)} />
						<div className="login-legenda">
							Esqueceu sua senha? Clique <span> aqui </span> para recuperá-la
						</div>
					</div>
					<div className="login-btn">
						<BotaoSolido fonte="4vw" width="100%">
							Confirmar
						</BotaoSolido>
						<div className="login-legenda">
							Não possui uma conta? Faça seu cadastro <span> aqui! </span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

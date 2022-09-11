import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import localstorage from "local-storage";
import LoadingBar from "react-top-loading-bar";
import Checkbox from "@mui/material/Checkbox";
import { userCadastro } from "../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [senhaconf, setSenhaconf] = useState("");
	const [nascimento, setNascimento] = useState();
	const [termos, setTermos] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const ref = useRef();

	async function handleCadastro() {
		localstorage.remove("user");
		setLoading(true);
		ref.current.continuousStart();
		try {
			if (senha !== senhaconf) throw new Error("As senhas são coincidem");
			await userCadastro(nome, email, senha, nascimento);
			toast.success("🚀 Conta criada com sucesso!");
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.warning(err.message);
		}
		setLoading(false);
		ref.current.complete();
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
						Seja bem-vindo!
					</SubTitulo>
				</div>
				<div className="cadastro-corpo">
					<div className="cadastro-inputs">
						<Input
							placeholder="Nome de usuário"
							width="100%"
							type="text"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
						/>
						<Input
							placeholder="Email"
							width="100%"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
						/>
						<Input
							placeholder="Data de nascimento"
							width="100%"
							onFocus={(e) => (e.target.type = "date")}
							onBlur={(e) => (e.target.type = "text")}
							value={nascimento}
							onChange={(e) => setNascimento(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
						/>
						<Input
							placeholder="Senha"
							width="100%"
							type="password"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
						/>
						<Input
							placeholder="Confirme sua senha"
							width="100%"
							type="password"
							value={senhaconf}
							onChange={(e) => setSenhaconf(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
						/>
						<div className="cadastro-legenda" style={{ marginTop: "10px" }}>
							<Checkbox value={termos} onClick={(e) => setTermos(!termos)} />
							<div>
								Tenho mais de 13 anos e concordo com os <span> termos e condições </span>
							</div>
						</div>
					</div>
					<div className="cadastro-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={handleCadastro} disabled={loading || !termos}>
							Confirmar
						</BotaoSolido>
						<div className="cadastro-legenda">
							<div>
								Já possui uma conta? Clique <span onClick={() => navigate("/login")}> aqui </span> para fazer login
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

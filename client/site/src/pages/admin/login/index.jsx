import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import localStorage from "local-storage";
import { BotaoSolido, Input, Titulo } from "../../../styled";
import { adminLogin } from "../../../api/admin/userApi";
import "./index.sass";

const Index = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const ref = useRef();

	async function handleLogin() {
		try {
			setLoading(true);
			ref.current.continuousStart();
			if (!email || !email.trim() || !senha || !senha.trim()) throw new Error("Preencha os campos corretamente");
			const r = await adminLogin(email, senha);
			localStorage("admin", r);
			setTimeout(() => navigate("/admin/dashboard"), 3000);
		} catch (err) {
			if (err.response) toast.warn(err.response.data.err);
			else toast.warn(err.message);
			ref.current.complete();
			setLoading(false);
		}
	}

	useEffect(() => {
		if (localStorage("user")) localStorage.remove("user");
		if (localStorage("admin") && localStorage("admin").id) navigate("/admin/dashboard");
	});

	return (
		<div className='adm-login page'>
			<LoadingBar color='#48d677' ref={ref} />
			<main>
				<div className='adm-login-titulos'>
					<Titulo cor='#02C17D' fonte='4vw'>
						Login
					</Titulo>
				</div>
				<div className='adm-login-corpo'>
					<div className='adm-login-inputs'>
						<Input
							placeholder='Email'
							width='100%'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleLogin()}
						/>
						<Input
							placeholder='Senha'
							width='100%'
							type='password'
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							disabled={loading}
							onKeyDown={(e) => e.key === "Enter" && handleLogin()}
						/>
					</div>
					<div className='adm-login-btn'>
						<BotaoSolido fonte='4vw' width='100%' onClick={handleLogin} disabled={loading}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

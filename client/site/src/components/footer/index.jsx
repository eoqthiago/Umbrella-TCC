import React from "react";
import { Titulo, BotaoLiso } from "../../styled";
import { useNavigate } from 'react-router-dom';
import "./index.sass";

const Index = () => {
	const navigate = useNavigate();
	return (
		<footer className="comp-footer">
			<div className="comp-footer-logo">
				<img src="/assets/icons/logo.png" alt="Logo" />
				<Titulo cor="#fff" fonte="4vw">
					Desfrute a liberdade
				</Titulo>
			</div>
			<div className="comp-footer-acoes">
				<ul>
					<li>Inicio</li>
					<li>Home</li>
					<li>Comunidades</li>
					<li>Cadastre-se</li>
				</ul>
				<ul>
					<li>Suporte</li>
					<li>Contato</li>
					<li>FAQ</li>
					<li>Avalie</li>
				</ul>
				<ul>
					<li>Desenvolvedores</li>
					<li>
						<a href="https://github.com/othierrydaora">Thierry(Capitão)</a>
					</li>
					<li>
						<a href="https://github.com/eoqthiago">Thiago</a>
					</li>
					<li>
						<a href="https://github.com/DoctorRedacted">Nicholas</a>
					</li>
					<li>
						<a href="https://github.com/NauaaN">Nauan</a>
					</li>
				</ul>
			</div>
			<div className="comp-footer-redes">
				<div>
					<img src="/assets/icons/instagram.png" alt="Instagram" />
					<img src="/assets/icons/twitter.png" alt="Twitter" />
					<img src="/assets/icons/facebook.png" alt="Facebook" />
					<img src="/assets/icons/github.png" alt="GitHub" />
				</div>
				<div className="botaoadm">
				<BotaoLiso main= "#fff" onClick={() => navigate('/admin/login')}>Admin</BotaoLiso>
				</div>
			</div>
		</footer>
	);
};

export default Index;

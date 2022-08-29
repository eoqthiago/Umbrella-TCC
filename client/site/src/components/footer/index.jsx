import React from "react";
import { BotaoLiso, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	return (
		<footer className="comp-footer">
			<div className="comp-footer-logo">
				<img src="/assets/icons/logo.png" alt="Logo" />
				<Titulo cor="#fff">Desfrute a liberdade</Titulo>
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
						<a href="https://github.com/othierrydaora">Thierry</a>(Capitão)
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
				<BotaoLiso main="#fff">Contato</BotaoLiso>
				<div>
					<img src="/assets/icons/instagram.png" alt="Instagram" />
					<img src="/assets/icons/twitter.png" alt="Twitter" />
					<img src="/assets/icons/facebook.png" alt="Facebook" />
					<img src="/assets/icons/github.png" alt="GitHub" />
				</div>
			</div>
		</footer>
	);
};

export default Index;

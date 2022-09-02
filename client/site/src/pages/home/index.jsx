import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Titulo, SubTitulo, BotaoLiso } from "../../styled";
import Card from "../../components/card";
import "./index.sass";

const Index = () => {
	return (
		<div className="home page">
			<Header login />
			<main>
				<section className="home-banner-inicial">
					<img src="/assets/images/banner-foguete.png" alt="" />
					<div>
						<Titulo fonte="4vw">BEM-VINDO AO UMBRELLA</Titulo>
						<SubTitulo fonte="2vw">Aqui você pode encontrar comunidades geek!</SubTitulo>
					</div>
				</section>
				<section className="home-top-comunidades">
					<div className="home-top-comunidades-titulos">
						<Titulo cor="#3A3A3A" fonte="4vw">
							O QUE VOCÊ PROCURA ESTÁ AQUI
						</Titulo>
						<SubTitulo cor="#3A3A3A" fonte="2vw">
							Encontre a melhor opção para você!
						</SubTitulo>
					</div>
					<div className="home-top-comunidades-cards">
						<Card />
						<Card />
						<Card />
					</div>
				</section>
				<section className="home-cadastre">
					<div className="home-cadastre-textos">
						<Titulo fonte="4vw">Faça parte de tudo isso</Titulo>
						<SubTitulo fonte="2vw">Crie sua conta para desfrutar dessa experiência ao máximo!</SubTitulo>
					</div>
					<div className="home-cadastre-botao">
						<BotaoLiso main="#fff" width="200px" fonte="22px">
							Cadastre-se
						</BotaoLiso>
					</div>
				</section>
				<section className="home-conecte">
					<div>
						<img src="/assets/images/conecte.png" alt="Conecte-se!" />
						<div>
							<Titulo cor="#282828" fonte="4vw">
								CONECTE-SE COM PESSOAS EM QUALQUER LUGAR
							</Titulo>
							<SubTitulo cor="#3A3A3A" fonte="2vw">
								Conheça novas pessoas em todos os lugares que compartilham o mesmo gosto que o seu
							</SubTitulo>
						</div>
					</div>
					<div>
						<div>
							<Titulo cor="#282828" fonte="4vw">
								CRIE COMUNIDADES COMO QUISER
							</Titulo>
							<ul>
								<li>Rápido</li>
								<li>Prático</li>
								<li>Simples</li>
							</ul>
						</div>
						<img src="/assets/images/foguete.png" alt="Conecte-se!" />
					</div>
				</section>
				<Footer />
			</main>
		</div>
	);
};

export default Index;

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Titulo, SubTitulo, BotaoLiso } from "../../styled";
import Card from "../../components/card";
import Carousel from "react-elastic-carousel";
import "./index.sass";

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 4 },
];

const Index = () => {
	const navigate = useNavigate();

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
				<section className="msgs-comunidades">

				<Titulo className="txts-comnd" cor="#3A3A3A" fonte="4vw">TORNE TUDO ISSO POSSIVEL COM APENAS UM TOQUE</Titulo>
					<div className="exemplo-comunidades">
						<img className= 'card-celular' src="/assets/images/Cardcelular.svg"/>
						<img className='seta' src="/assets/images/Seta.svg"/>
						<img className="exemplo-msg"src="/assets/images/chat.svg"/>
					</div>
					<Titulo className="txts-comnd" cor="#3A3A3A" fonte="4vw">AQUI NO UMBRELLA TRABALHAMOS COM A PRATICIDADE VEJA ABAIXO:</Titulo>
				</section>
				<section className="home-cadastre">
					<div className="home-cadastre-textos">
						<Titulo fonte="4vw">Faça parte de tudo isso</Titulo>
						<SubTitulo fonte="2vw">Crie sua conta para desfrutar dessa experiência ao máximo!</SubTitulo>
					</div>
					<div className="home-cadastre-botao">
						<BotaoLiso main="#fff" fonte="4vw" onClick={() => navigate("/cadastro")}>
							Cadastre-se
						</BotaoLiso>
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
						<Carousel breakPoints={breakPoints} enableAutoPlay={true}>
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
							<Card msg="Entre para ver mais" />
						</Carousel>
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

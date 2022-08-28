import React from "react";
import Header from "../../components/header";
import { Titulo, SubTitulo } from "../../styled";
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
						<Titulo>BEM-VINDO AO UMBRELLA</Titulo>
						<SubTitulo>Aqui você pode encontrar comunidades geek!</SubTitulo>
					</div>
				</section>
				<section className="home-top-comunidades">
					<div className="home-top-comunidades-titulos">
						<Titulo cor="#3A3A3A">O QUE VOCÊ PROCURA ESTÁ AQUI</Titulo>
						<SubTitulo cor="#3A3A3A">Encontre a melhor opção para você!</SubTitulo>
					</div>
					<div className="home-top-comunidades-cards">
						<Card />
						<Card />
						<Card />
					</div>
				</section>
			</main>
		</div>
	);
};

export default Index;

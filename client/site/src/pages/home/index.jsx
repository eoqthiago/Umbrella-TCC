import React from "react";
import Header from "../../components/header";
import { TituloOpen } from "../../styled";
import "./index.sass";

const Index = () => {
	return (
		<div className="home page">
			<Header login />
			<main>
				<section className="home-banner-inicial">
					<img src="/assets/images/banner-foguete.png" alt="" />
					<div>
						<TituloOpen>BEM-VINDO AO UMBRELLA</TituloOpen>
						<div>Aqui você pode encontrar comunidades geek!</div>
					</div>
				</section>
				<section className="home-top-comunidades">
					<div className="home-top-comunidades-titulos">
						<TituloOpen cor="#3A3A3A">O QUE VOCÊ PROCURA ESTÁ AQUI</TituloOpen>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Index;

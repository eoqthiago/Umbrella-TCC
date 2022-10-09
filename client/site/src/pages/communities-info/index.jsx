import React, { useEffect, useState } from "react";
import { BuscarImg } from "../../api/services";
import Header from "../../components/header";
import Menu from "../../components/menu";
import Card from "../../components/card";
import { searchCommunityId } from "../../api/communityApi";
import { BotaoSolido, Titulo } from "../../styled";
import { useNavigate, useParams } from "react-router-dom";
import "./index.sass";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [comunidade, setComunidade] = useState("");
	const navigate = useNavigate();

	const { idParam } = useParams();

useEffect(() => {
	async function carregarPage() {
		const r = await searchCommunityId(idParam);
		if(!r) navigate("*");
		else setComunidade(r)
	}
	carregarPage();
});

	return (
		<div className="community-info page">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />

			<main>
				<section className="community-info-card">
					<img src={comunidade.imagem ? BuscarImg(comunidade.imagem) : "/assets/images/star-wars.webp"} alt="" />
					<div>
						<div>
							<Titulo fonte="1vw" cor="#131313">
								{comunidade.nome}
							</Titulo>
							<div>
								{comunidade.descricao}
							</div>
						</div>
						<BotaoSolido width="100%" fonte="2vw" onClick={() => navigate(`/chat/comunidade/${idParam}`)}>
							Entrar
						</BotaoSolido>
					</div>
				</section>
				<section className="community-info-others">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</section>
			</main>
		</div>
	);
}

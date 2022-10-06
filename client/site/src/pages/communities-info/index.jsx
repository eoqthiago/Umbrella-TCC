import React, { useEffect, useState } from "react";
import { BuscarImg } from "../../api/services";
import Header from "../../components/header";
import Menu from "../../components/menu";
import Card from "../../components/card";
import { pesquisar } from "../../api/communityApi";
import { useParams } from "react-router-dom";
import { BotaoSolido, Titulo } from "../../styled";
import { toast } from "react-toastify";
import "./index.sass";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [comunidade, setComunidade] = useState({});
	const { idParam } = useParams();
	console.log(comunidade);

	useEffect(() => {
		async function carregarPage() {
			try {
				const r = await pesquisar("comunidade", "#" + idParam);
				if (r.status !== 200) throw new Error("Um erro ocorreu ao carregar a comunidade");
				setComunidade(r);
			} catch (err) {
				if (err.response) toast.error(err.response.data.err);
			}
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
								{comunidade.nome ?? "Comunidade"}
							</Titulo>
							<div>
								{comunidade.descricao ??
									`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi inventore mollitia enim sunt ab qui, officiis id, eius saepe ratione praesentium iure hic repellendus fugit sit porro error voluptatum vero.`}
							</div>
						</div>
						<BotaoSolido width="100%" fonte="2vw">
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

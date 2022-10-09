import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import Menu from "../../components/menu";
import { consultarCanais, consultarUsuarios, searchCommunityId } from "../../api/communityApi";
import "./index.sass";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [banner, setBanner] = useState("");
	const [comunidade, setComunidade] = useState([]);
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [img, setImg] = useState("");
	const { id } = useParams();

useEffect(() => {
	async function carregarPage() {
		const r = await searchCommunityId(id);
		setComunidade(r);
	}
	carregarPage();
});

useEffect(() => {
	async function carregarPage() {
		const r = await consultarUsuarios(id);
		setUsuarios(r);
	}
	carregarPage();
}, []);

useEffect(() => {
	async function carregarCanais() {
		const r = await consultarCanais(id);
		setCanais(r);
	}
	carregarCanais();
});

	return (
		<div className="comunidade-conf page">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />
			<main>
				<section className="comunidade-conf-inicial">
					<div className="comunidade-conf-banner" onMouseEnter={() => setBanner("ativo")} onMouseLeave={() => setBanner("")}>
						<div className={"comunidade-conf-banner-button " + banner}>
							<button>Alterar capa</button>
						</div>

						<img src="/assets/images/banner.png" alt="" />
					</div>
					<div className="comunidade-conf-banner-img" onMouseEnter={() => setImg("ativo")} onMouseLeave={() => setImg("")}>
						<div className={"comunidade-conf-banner-img-button " + img}>
							<button>Alterar imagem</button>
						</div>

						<img src="/assets/images/user.png" alt="" />
					</div>
				</section>
				<div className="cont-community-info">
					<h1>{comunidade.nome}</h1>
					<p>{comunidade.descricao}</p>
				</div>
				<div className="cont-membrs">
					<span>
						<ul>
							{canais.map((item) => (
								<li>
									{item.nome}
								</li>
							))}
						</ul>
						<button>+ Criar canal</button>
					</span>

					<div className="cont-insides">
						<span>
							<h1>Membros</h1>
						</span>
						<section>
							<span>
								Filtrar por nome: <input></input>
							</span>
							<div>
							</div>
						</section>
						<div>
							<button>Excluir comunidade</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

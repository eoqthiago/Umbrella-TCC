import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Menu from "../../components/menu";
import "../../components/listas/usuario/index.sass";
import { toast } from "react-toastify";
import { consultarCanais, consultarUsuarios, excluirComunidade, searchCommunityId } from "../../api/communityApi";
import "./index.sass";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [block, setBlock] = useState(false);
	const [banner, setBanner] = useState("");
	const [comunidade, setComunidade] = useState({});
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [img, setImg] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	async function eListener() {
		try {
			const r = await excluirComunidade(id);
			if (r !== 204) throw new Error("Não foi possível excluir a comunidade");
			toast.success(`A comunidade ${comunidade.nome} foi excluída com sucesso! Você será redirecionado em instantes`);
			setTimeout(() => navigate("/home"), 3000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	useEffect(() => {
		async function carregarPage() {
			const r = await consultarUsuarios(id);
			setUsuarios(r);
			const s = await searchCommunityId(id);
			setComunidade(s);
			const t = await consultarCanais(id);
			setCanais(t);
		}
		carregarPage();
	}, [id]);

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
				<section className="cont-community-info">
					<h1>{comunidade.nome ?? "Comunidade"}</h1>
					<p>{comunidade.descricao ?? "Descrição"}</p>
				</section>

				<div className="cont-membrs">
					<span>
						<ul>
							{canais.map((item) => (
								<li>{item.nome}</li>
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
								Filtrar por nome: <input />
							</span>
							<div className="cont-mebrs-dspl">
								<li className="membersDisplay">
									<img src="/assets/images/user.png" alt="Usuário" />
									<div>USUARIO</div>
								</li>
							</div>
						</section>
						<div>
							<button onClick={() => eListener()}>Excluir comunidade</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

/*
{usuarios.map((item) => (
	<div className="membersDisplay">
		<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${item.id}`)} />
		<div>
			<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
			<div>
				<img onClick={() => handleAmizade(item.id)} src="/assets/icons/addFriend.svg" alt="Adicionar amigo" disabled={block} />
			</div>
		</div>
	</div>
))}
*/

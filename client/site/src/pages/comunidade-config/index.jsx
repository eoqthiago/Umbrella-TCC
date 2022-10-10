import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Menu from "../../components/menu";
import "../../components/listas/usuario/index.sass"
import { toast } from "react-toastify"
import { consultarCanais, consultarUsuarios, excluirComunidade, searchCommunityId } from "../../api/communityApi";
import "./index.sass";
import { BuscarImg } from "../../api/services";
import { pedirAmizade } from "../../api/userApi";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [block, setBlock] = useState(false);
	const [banner, setBanner] = useState("");
	const [comunidade, setComunidade] = useState([]);
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [img, setImg] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

async function handleAmizade(id) {
	try {
		const r = await pedirAmizade(id);
		console.log(r);
		if (r !== 204) throw new Error("Não foi possível pedir em amizade");
		toast.success("Pedido de amizade feito com sucesso");
		setBlock(true);
	} catch (err) {
		if (err.response) toast.error(err.response.data.err);
		else toast.error(err.message);
	}
}

async function eListener() {
	const r = await excluirComunidade(id);
	console.log(r)
	if(r !== 200) {
		toast.error("Não foi possível deletar a comunidade");
	} else {
		toast.success(`A comunidade ${comunidade.nome} foi deletada!`);
		navigate("/pesquisa");
	}
}

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
		console.log(r)
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
							<div className="cont-mebrs-dspl">
								<li className="membersDisplay">
									<img src="/assets/images/user.png" alt="Usuário" />
									<div>
										<span>USUARIO</span>
										<div>
											<img src="/assets/icons/addFriend.svg" alt="Adicionar amigo" disabled={block} />
										</div>
									</div>
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
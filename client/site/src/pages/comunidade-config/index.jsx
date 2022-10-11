import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Menu from "../../components/menu";
import "../../components/listas/usuario/index.sass";
import { toast } from "react-toastify";
import { communityEdit, consultarCanais, consultarUsuarios, excluirComunidade, searchCommunityId } from "../../api/communityApi";
import localStorage from "local-storage";
import "./index.sass";
import { BotaoSolido, Input, InputArea } from "../../styled";
import { BuscarImg } from "../../api/services";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [banner, setBanner] = useState("");
	const [comunidade, setComunidade] = useState({});
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [img, setImg] = useState("");
	const [editando, setEditando] = useState(false);
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [publica, setPublica] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();

	async function handleAlteracao() {
		try {
			const r = await communityEdit(nome, descricao, publica, comunidade.id);
			if (r !== 204) throw new Error("Não foi possível salvar as alterações");
			setEditando(false);
			toast.success("Alterações feitas com sucesso!");
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

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
			const s = await searchCommunityId(id);
			if (!s || s.criador !== localStorage("user").id) {
				toast.warning("Um erro ocorreu");
				navigate("/");
			}
			setComunidade(s);
			setNome(s.nome);
			setDescricao(s.descricao);
			setPublica(s.publica);
			const r = await consultarUsuarios(id);
			setUsuarios(r);
			const t = await consultarCanais(id);
			setCanais(t);
		}
		carregarPage();
	}, []);

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
						<img src={!comunidade.imagem ? "/assets/images/banner.png" : BuscarImg(comunidade.imagem)} alt="" />
					</div>
					<div className="comunidade-conf-banner-img" onMouseEnter={() => setImg("ativo")} onMouseLeave={() => setImg("")}>
						<div className={"comunidade-conf-banner-img-button " + img}>
							<button>Alterar imagem</button>
						</div>
						<img src="/assets/images/user.png" alt="" />
					</div>
				</section>

				<section className="cont-community-info">
					<div className="cont-community-edit" onClick={() => setEditando(true)} style={{ display: editando && "none" }} />

					<h1 onClick={() => setEditando(true)} style={{ display: editando && "none" }}>
						{comunidade.nome ?? "Comunidade"}
					</h1>

					<p onClick={() => setEditando(true)} style={{ display: editando && "none" }}>
						{comunidade.descricao ?? "Descrição"}
					</p>

					<Input type="text" placeholder="Nome da comunidade*" width="100%" style={{ display: !editando && "none" }} value={nome} onChange={(e) => setNome(e.target.value)} />
					<InputArea
						type="text"
						placeholder="Descrição da comunidade"
						width="100%"
						resize="none"
						height="120px"
						style={{ display: !editando && "none" }}
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
					/>
					<FormControl sx={{ display: !editando && "none" }}>
						<RadioGroup defaultValue={"publica"} name="tipo-comunidade" value={publica} onChange={(e) => setPublica(e.target.value)}>
							<FormControlLabel value={true} control={<Radio color="success" />} label="Pública" />
							<FormControlLabel value={false} control={<Radio color="success" />} label="Privada" />
						</RadioGroup>
					</FormControl>
					<BotaoSolido fonte="1vw" style={{ display: !editando && "none" }} onClick={() => handleAlteracao()}>
						Salvar
					</BotaoSolido>
				</section>

				<div className="cont-membrs">
					<span>
						<ul>
							{canais.map((item) => (
								<li key={item.idCanal}>{item.nome}</li>
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

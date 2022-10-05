import React, { useEffect, useState } from "react";
import { BuscarImg } from "../../api/services";
import Header from "../../components/header";
import Menu from "../../components/menu";
import Cards from "../../components/card"
import "./index.sass";
import { searchCommunityId } from "../../api/communityApi";
import { Navigate, useParams } from "react-router-dom";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [imagem, setImagem] = useState("");

	const { idParam } = useParams();

    useEffect(() => {
        carregarPage();
    });

    async function carregarPage() {
        const r = await searchCommunityId(idParam);
        if (!r) {
        Navigate('*');
		} else {
			setNome(r.nome);
			setDescricao(r.descricao);
			setImagem(r.imagem);
        }
    }
	return (
        <div className="communities-info">
            <Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />

			<main>
				<span>
					<img src={imagem ? BuscarImg(imagem) : "/assets/images/star-wars.webp"} alt="Comunidade" />
				</span>
				<div>
					<span>
						<h1>{nome}</h1>
						<p>{descricao}</p>
					</span>
					<button>Entrar</button>
				</div>
			</main>
			<div className="communities-cards">
				<button>Encontre mais!</button>
				<ul>
					<li><Cards /></li>
					<li><Cards /></li>
					<li><Cards /></li>
					<li><Cards /></li>
				</ul>
			</div>
		</div>
	);
};
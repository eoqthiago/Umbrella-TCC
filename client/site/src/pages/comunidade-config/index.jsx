import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import Menu from "../../components/menu";
import "./index.sass";

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [banner, setBanner] = useState("");
	const [img, setImg] = useState("");
	const { id } = useParams();

	console.log(id);

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
			</main>
		</div>
	);
}

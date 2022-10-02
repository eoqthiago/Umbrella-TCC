import React, { useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import Input from "../../../components/input-mensagens"
import "./index.sass";

const Index = () => {
	const [menu, setMenu] = useState(false);
	return (
		<div>
			
			<div className="initial page ">
				<Header menu alterarMenu={setMenu} estadoMenu={menu} />
				<Menu ativo={menu} alterar={setMenu} />
				<section className="canais-page">
					<div className="canais">
						<ul className="tabela">
							<li>Canal Primario</li>
							<li>Canal Secundario</li>
							<li>Canal Tercerario</li>
							<li>Canal Quartenario</li>
							<li>Canal Quintenario</li>
						</ul>
					</div>
				</section>
			</div>

					<Input/>
				
		</div>
	);
};

export default Index;

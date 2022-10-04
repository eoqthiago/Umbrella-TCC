import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import Input from "../../../components/input-mensagens"
import { mostrarCanais } from "../../../api/communityApi"; 
import storage from 'local-storage'
import "./index.sass";

const Index = () => {
	const [menu, setMenu] = useState(false);
	const [canal, setCanal] = useState([]);

	async function aparecerCanais(){
		const r = await mostrarCanais(storage('usuario-logado').id)
		setCanal(r);

	}
	useEffect(() =>{
		aparecerCanais();
	},[])
	return (
		<div>
			
			<div className="initial page ">
				<Header menu alterarMenu={setMenu} estadoMenu={menu} />
				<Menu ativo={menu} alterar={setMenu} />

				<section className="canais-page">
					<div className="canais">
							<ul className="tabela">
								{canal.map(item =>
									<li>{item.nome}</li> 
								)}
								
							</ul>
						
					</div>
				</section>
			</div>

				<Input/>
				
		</div>
	);
};

export default Index;

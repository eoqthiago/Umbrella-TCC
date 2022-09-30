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
		</div>
		<div className="input">
		<Input/>
		</div>
		</div>
	);
};

export default Index;

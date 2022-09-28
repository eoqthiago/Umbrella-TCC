import React, { useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import "./index.sass";

const Index = () => {
	const [menu, setMenu] = useState(false);
	return (
		<div className="initial page ">
			<Header menu alterarMenu={setMenu} estadoMenu={menu} />
			<Menu ativo={menu} alterar={setMenu} />
		</div>
	);
};

export default Index;

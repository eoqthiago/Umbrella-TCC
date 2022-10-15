import React, { useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
// import { useNavigate, useParams } from 'react-router-dom';
import './index.sass';

const Index = () => {
	const [canais, setCanais] = useState([]);
	const [menu, setMenu] = useState(false);
	const [conteudo, setConteudo] = useState('');

	return (
		<div className='comunidade page'>
			<Header
				menu
				alterarMenu={setMenu}
				estadoMenu={menu}
			/>
			<Menu
				ativo={menu}
				alterar={setMenu}
			/>

			<main>
				<aside>Lateral</aside>
				<section>
					<div className='comunidade-mensagens'>{canais.map(item => null)}</div>
					<InputMensagem
						conteudo={conteudo}
						setConteudo={setConteudo}
					/>
				</section>
				<aside>Lateral</aside>
			</main>
		</div>
	);
};

export default Index;

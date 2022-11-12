import React, { useState } from 'react';
import Header from '../../components/header';
import Menu from '../../components/menu';
import Card from '../../components/card';
import User from '../../components/listas/usuario';
import { pesquisar } from '../../api/communityApi';
import './index.sass';

const Index = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [comunidades, setComunidades] = useState([]);
	const [mensagens, setMensagens] = useState([]);
	const [pesquisa, setPesquisa] = useState('');
	const [selecionado, setSelecionado] = useState('comunidades');
	const [menu, setMenu] = useState(false);

	async function consultar() {
		const r = await pesquisar(selecionado, pesquisa);
		if (!r && !r[0]) return;
		switch (selecionado) {
			case 'comunidades':
				if (r.tipo !== 'array') setComunidades([r]);
				else setComunidades(r);
				break;
			case 'usuarios':
				setUsuarios(r);
				break;
			case 'mensagens':
				setMensagens(r);
				break;
			default:
				break;
		}
	}

	return (
		<div className='pesquisa page'>
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
				<ul className='pesquisa-categorias'>
					<nav
						className={selecionado === 'usuarios' ? 'selecionado' : ''}
						onClick={() => setSelecionado('usuarios') & setPesquisa('')}>
						Usuários
					</nav>
					<nav
						className={selecionado === 'comunidades' ? 'selecionado' : ''}
						onClick={() => setSelecionado('comunidades') & setPesquisa('')}>
						Comunidades
					</nav>
					<nav
						className={selecionado === 'mensagens' ? 'selecionado' : ''}
						onClick={() => setSelecionado('mensagens') & setPesquisa('')}>
						Mensagens
					</nav>
				</ul>
				<div className='pesquisa-input'>
					<input
						type='text'
						placeholder='Pesquisar'
						value={pesquisa}
						onChange={e => setPesquisa(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && consultar(pesquisa)}
					/>
					<img
						src='/assets/icons/search.svg'
						alt='Pesquisar'
						onClick={() => consultar()}
					/>
				</div>
				<section>
					{selecionado === 'comunidades' &&
						comunidades.map(item => (
							<Card
								key={item.id}
								comunidade={item}
							/>
						))}
					{selecionado === 'usuarios' &&
						usuarios.map(item => (
							<User
								item={item}
								key={item.id}
							/>
						))}
					{selecionado === 'mensagens' && mensagens.map(() => <>Mensagens</>)}
				</section>
			</main>
		</div>
	);
};

export default Index;

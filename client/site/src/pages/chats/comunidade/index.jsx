import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
import { useParams, useNavigate } from 'react-router-dom';
import { consultarCanais, consultarComunidadeUsuario, consultarUsuarios, searchCommunityId } from '../../../api/communityApi';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import ListaLateral from '../../../components/listas/lateral';
import './index.sass';

const Index = () => {
	const [canais, setCanais] = useState([]);
	const [canalSelecionado, setCanalSelecionado] = useState(null);
	const [usuarios, setUsuarios] = useState([]);
	const [mensagens, setMensagens] = useState([]);
	const [menu, setMenu] = useState(false);
	const [conteudo, setConteudo] = useState('');
	const [user, setUser] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function consultarComunidade() {
			try {
				const r = await searchCommunityId(Number(id));
				if (!r) throw new Error('Essa comunidade não existe');
				const s = await consultarComunidadeUsuario(localStorage('user').id, Number(id));
				if (!s) throw new Error('Você não está nessa comunidade');
				const t = await consultarCanais(Number(id));
				const u = await consultarUsuarios(Number(id));
				setUser(r.id);
				setCanais(t);
				setUsuarios(u);
				if (t[0]) setCanalSelecionado(t[0].idCanal);
			} catch (err) {
				if (err.response) toast.error(err.response.data.err);
				else toast.error(err.message);
				navigate('/home');
			}
		}
		consultarComunidade();
	}, [id, navigate]);

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
				<aside>
					<div>Usuários</div>
					<div className='comunidade-listagem-lateral'>
						{usuarios.map(item => (
							<ListaLateral
								item={item}
								tipo='usuario'
								key={item.id}
							/>
						))}
					</div>
				</aside>
				<section>
					<div className='comunidade-mensagens'>{mensagens.map(item => null)}</div>
					<InputMensagem
						conteudo={conteudo}
						setConteudo={setConteudo}
					/>
				</section>
				<aside>
					<div>Canais</div>
					<div className='comunidade-listagem-lateral'>
						{canais.map(item => (
							<ListaLateral
								item={item}
								tipo='canal'
								setCanal={setCanalSelecionado}
								canalSelecionado={canalSelecionado}
								key={item.idCanal}
							/>
						))}
					</div>
				</aside>
			</main>
		</div>
	);
};

export default Index;

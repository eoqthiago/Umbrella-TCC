import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
import { useParams, useNavigate } from 'react-router-dom';
import { consultarCanais, consultarComunidadeUsuario, searchCommunityId } from '../../../api/communityApi';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import ListaLateral from '../../../components/listas/lateral';
import './index.sass';
import { SubTitulo } from '../../../styled';
import io from 'socket.io-client';
import { baseUrl } from '../../../api/services';

const socket = io.connect(baseUrl);

const Index = () => {
	const [canais, setCanais] = useState([]);
	const [canalSelecionado, setCanalSelecionado] = useState(null);
	const [mensagens, setMensagens] = useState([]);
	const [menu, setMenu] = useState(false);
	const [conteudo, setConteudo] = useState('');
	const [user, setUser] = useState({});
	const [comunidade, setComunidade] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const send = async () => {
		socket.emit('join', canalSelecionado);
	};

	useEffect(() => {
		async function consultarDados() {
			try {
				const r = await searchCommunityId(Number(id));
				if (!r) throw new Error('Essa comunidade não existe');
				const s = await consultarComunidadeUsuario(localStorage('user').id, Number(id));
				if (!s) throw new Error('Você não está nessa comunidade');
				const t = await consultarCanais(Number(id));
				setComunidade(r);
				setUser(s);
				setCanais(t);
				if (t[0]) setCanalSelecionado(t[0].idCanal);
				if (!user) throw new Error('Falha na autenticaçãos');
			} catch (err) {
				if (err.response) toast.error(err.response.data.err);
				else toast.error(err.message);
				navigate('/home');
			}
		}
		consultarDados();
	}, [id, navigate, user]);

	useEffect(() => {
		socket.on('receive', data => {
			setMensagens([...mensagens, data.message]);
		});
	});

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
				<section>
					<SubTitulo
						className='textos-mensagens'
						cor='#3A3A3A'
						fonte='1.5vw'
						style={{
							marginTop: '10px',
							userSelect: 'none',
						}}>
						{comunidade.nome}
					</SubTitulo>
					<div className='comunidade-mensagens'>{mensagens.map(item => null)}</div>
					<InputMensagem
						conteudo={conteudo}
						setConteudo={setConteudo}
						send={send}
					/>
				</section>
			</main>
		</div>
	);
};

export default Index;

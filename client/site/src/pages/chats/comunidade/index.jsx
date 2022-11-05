import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
import { useParams, useNavigate } from 'react-router-dom';
import { consultarCanais, consultarComunidadeUsuario, enviarMensagemCanal, listarMensagens, searchCommunityId } from '../../../api/communityApi';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import ListaLateral from '../../../components/listas/lateral';
import io from 'socket.io-client';
import { socketUrl } from '../../../api/services';
import MensagemComp from '../../../components/message';
import './index.sass';

const socket = io.connect(socketUrl);

const Index = () => {
	const [canais, setCanais] = useState([]);
	const [canalSelecionado, setCanalSelecionado] = useState(null);
	const [mensagens, setMensagens] = useState([]);
	const [menu, setMenu] = useState(false);
	const [conteudo, setConteudo] = useState('');
	const [user, setUser] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();
	const endMessage = useRef();

	const scrollToBottom = () => {
		endMessage.current.scrollIntoView({ behavior: 'smooth' });
	};

	const send = async () => {
		if (!conteudo || !conteudo.trim()) return; 
		try {
			const r = await enviarMensagemCanal(conteudo, canalSelecionado, id);
			const temp = {
				usuario: {
					id: user.id,
					nome: user.nome,
					descricao: user.descricao,
					imagem: user.imagem,
					idComunidade: user.idComunidade,
				},
				comunidade: Number(id),
				canal: canalSelecionado,
				mensagem: {
					conteudo,
					data: new Date().toISOString(),
					id: r,
				},
			};

			socket.emit('comunidade-canal-send', temp);
			setMensagens([...mensagens, temp]);

			setConteudo('');
		} catch (err) {}
	};

	useEffect(() => {
		async function consultarDados() {
			try {
				const r = await searchCommunityId(Number(id));
				if (!r) throw new Error('Não foi possível encontrar essa comunidade');
				const s = await consultarComunidadeUsuario(localStorage('user').id, Number(id));
				if (!s) throw new Error('Você não está nessa comunidade');
				const t = await consultarCanais(Number(id));
				setUser(s);
				setCanais(t);
				if (t[0]) setCanalSelecionado(t[0].idCanal);
				if (!user) throw new Error('Falha na autenticação');
			} catch (err) {
				if (err.response) toast.error(err.response.data.err);
				else toast.error(err.message);
				if (localStorage('user')) navigate('/home');
				else navigate('/');
			}
		}
		consultarDados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		async function join() {
			try {
				if (!canalSelecionado) throw new Error();
				socket.emit('comunidade-canal-join', { usuario: { nome: user.nome, id: user.id }, comunidade: Number(id), canal: canalSelecionado });
				const r = await listarMensagens(id, canalSelecionado, 0);
				setMensagens(r);
			} catch (err) {}
		}
		join();
	}, [canalSelecionado, id, user]);

	useEffect(() => {
		socket.on('comunidade-canal-receive', data => {
			setMensagens([
				...mensagens,
				{
					usuario: {
						id: data.usuario.id,
						nome: data.usuario.nome,
						descricao: data.usuario.descricao,
						imagem: data.usuario.imagem,
						idComunidade: data.usuario.idComunidade,
					},
					comunidade: data.comunidade,
					canal: canalSelecionado,
					mensagem: {
						conteudo: data.mensagem.conteudo,
						data: data.mensagem.data,
						id: data.mensagem.id,
					},
				},
			]);
		});
	});

	useEffect(scrollToBottom, [mensagens]);

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
						{canais.map((item, index) => (
							<ListaLateral
								item={item}
								tipo='canal'
								setCanal={setCanalSelecionado}
								canalSelecionado={canalSelecionado}
								key={index}
							/>
						))}
					</div>
				</aside>
				<section>
					<div className='comunidade-mensagens'>
						<div className='comunidade-mensagem-inicio'>Este é o início do canal 😃</div>
						{mensagens.map(item => (
							<div className='comunidade-mensagem'>
								<MensagemComp
									item={item}
									key={item.mensagem.id}
								/>
							</div>
						))}
						<div ref={endMessage} />
					</div>
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

import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
import { useParams, useNavigate } from 'react-router-dom';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { socketUrl } from '../../../api/services';
import MensagemComp from '../../../components/message';
import './index.sass';
import {
	consultarIdConversa,
	consultarMensagens,
	enviarMensagemPrivada,
	userConsulta,
} from '../../../api/userApi';

const socket = io.connect(socketUrl);

export default function Index() {
	const [mensagens, setMensagens] = useState([]);
	const [menu, setMenu] = useState(false);
	const [conteudo, setConteudo] = useState('');
	const [user, setUser] = useState({});
	const conversa = Number(useParams().id);
	const navigate = useNavigate();
	const endMessage = useRef();
	const scrollToBottom = () => {
		endMessage.current.scrollIntoView({ behavior: 'smooth' });
	};

	async function send() {
		if (!conteudo || !conteudo.trim()) return;
		console.log(user);
		try {
			const answer = await enviarMensagemPrivada(conversa, conteudo);
			const info = {
				usuario: {
					id: user.id,
					nome: user.nome,
					imagem: user.imagem,
					idComunidade: user.idComunidade,
				},
				conversa,
				mensagem: {
					conteudo,
					data: new Date().toISOString(),
					id: answer,
				},
			};

			socket.emit('conversa-send', info);
			setMensagens([...mensagens, info]);
			setConteudo('');
		} catch (err) {}
	}

	useEffect(() => {
		async function consultarDados() {
			try {
				const r = await userConsulta(Number(localStorage('user').id));
				if (!r) throw new Error('Não autorizado');
				setUser(r);
				const s = await consultarIdConversa(conversa);
			} catch (err) {
				// if (err.response) toast.error(err.response.data.err);
				// else toast.error(err.message);
				// if (localStorage('user')) navigate('/home');
				// else navigate('/');
			}
		}
		consultarDados();
	}, [conversa]);

	useEffect(() => {
		async function join() {
			try {
				if (!conversa) throw new Error('Conversa não encontrada');
				socket.emit('conversa-join', {
					usuario: { nome: user.nome, id: user.id },
					conversa,
				});
				const r = await consultarMensagens(conversa);
				if (r.status !== 200) throw new Error();
				setMensagens(r.data);
			} catch (err) {
				if (err.response) toast.warn(err.response.data.err);
				else toast.warn(err.message);
			}
		}
		join();
	}, [conversa, user]);

	useEffect(() => {
		socket.on('conversa-receive', data => {
			setMensagens([
				...mensagens,
				{
					usuario: {
						id: data.usuario.id,
						nome: data.usuario.nome,
						imagem: data.usuario.imagem,
					},
					conversa: data.conversa,
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
				<section>
					<div className='comunidade-mensagens'>
						<div className='comunidade-mensagem-inicio'>
							Este é o início de suas conversas privadas
						</div>
						{mensagens.map((item, index) => (
							<div className='comunidade-mensagem'>
								<MensagemComp
									item={item}
									key={index}
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
}

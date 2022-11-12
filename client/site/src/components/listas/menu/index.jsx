import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BuscarImg } from '../../../api/services';
import { consultarIdConversa } from '../../../api/userApi';
import './index.sass';

const Index = ({ item, convMenu, tipo, setTipo, alterar }) => {
	const navigate = useNavigate();

	async function navegarConversa(id) {
		try {
			const answer = await consultarIdConversa(id);
			navigate(`/chat/conversa/${answer.id_conversa}`);
		} catch(err) {};
	};

	return (
		<div
			className={'comp-lista-menu '}
			onMouseDownCapture={e => {
				if (e.button === 2) {
					setTipo(tipo);
					convMenu.setSelecionada(item);
					convMenu.setPos({ x: e.clientX, y: e.clientY });
					convMenu.open();
					document.oncontextmenu = document.body.oncontextmenu = () => false;
				}
			}}
			onClick={() => {
				alterar();
				if (tipo === 'comunidade') navigate(`/chat/comunidade/${item.id}`)
				else navegarConversa(item.id);
			}}>
			<img
				src={item.imagem ? BuscarImg(item.imagem) : tipo === 'comunidade' ? '/assets/images/community.png' : '/assets/images/user.png'}
				alt='Imagem'
			/>
			<div>{item.nome}</div>
		</div>
	);
};

export default Index;

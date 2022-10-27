import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';

const Index = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div className='comp-message'>
			<img
				src={item.usuario.imagem ?? '/assets/images/user.png'}
				alt=''
				onClick={() => navigate(`/usuario/${item.usuario.id}`)}
			/>
			<div className='comp-message-conteudo'>
				<div>
					<h1 onClick={() => navigate(`/usuario/${item.usuario.id}`)}>{item.usuario.nome}</h1>
					<span>{item.mensagem.conteudo}</span>
				</div>
			</div>

			<div className='comp-message-data'>Data !ajustes</div>
		</div>
	);
};

export default Index;

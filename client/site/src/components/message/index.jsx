import React from 'react';
import localStorage from 'local-storage';
import { useNavigate } from 'react-router-dom';
import './index.sass';

const Index = ({ item }) => {
	const navigate = useNavigate();
	const data = new Date(item.mensagem.data);

	return (
		<div className='comp-message'>
			<img
				src={item.usuario.imagem ?? '/assets/images/user.png'}
				alt=''
				onClick={() => navigate(`/usuario/${item.usuario.id}`)}
				className={item.usuario.id === localStorage('user').id ? 'hidden' : ''}
			/>

			<div
				className='comp-message-conteudo'
				style={{
					marginLeft: item.usuario.id === localStorage('user').id ? 'auto' : '',
				}}>
				<div>
					<h1
						onClick={() => navigate(`/usuario/${item.usuario.id}`)}
						className={
							item.usuario.id === localStorage('user').id ? 'hidden' : ''
						}>
						{item.usuario.nome}
					</h1>

					<span>{item.mensagem.conteudo}</span>
					<div className='comp-message-data'>{`${data.getDate()}/${data.getMonth()}/${data
						.getFullYear()
						.toString()
						.substring(2)}`}</div>
				</div>
			</div>
		</div>
	);
};

export default Index;

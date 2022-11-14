import localStorage from 'local-storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pesquisarMensagem } from '../../../api/communityApi';
import { BuscarImg } from '../../../api/services';

import './index.sass';

const Index = ({ mensagem }) => {
	const navigate = useNavigate();

	if (!mensagem)
		mensagem = {
			idMensagem: '',
			conteudo: '',
			data: '',
			idComunidade: '',
			idUsuarioComunidade: '',
			usuarioImagem: '',
			idUsuario: '',
			usuarioNome: '',
			usuarioDescricao: '',
		};
	console.log(mensagem);

	return (
		<li
			className='comp-lista-usuario'
			style={{
				display: localStorage('user').id === mensagem.id ? 'none' : 'flex',
			}}>
			<img
				src={
					mensagem.usuarioImagem
						? BuscarImg(mensagem.usuarioImagem)
						: '/assets/images/user.png'
				}
				alt='Usuário'
				onClick={() => navigate(`/usuario/${mensagem.idUsuario}`)}
			/>
			<div>
				<span onClick={() => navigate(`/usuario/${mensagem.idUsuario}`)}>
					{mensagem.usuarioNome}
				</span>
				<div>
					<span
						onClick={() =>
							navigate(`/comunidade/${mensagem.idComunidade}/info`)
						}>
						{mensagem.conteudo}
					</span>
				</div>
			</div>
		</li>
	);
};

export default Index;

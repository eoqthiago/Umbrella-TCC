import localStorage from 'local-storage';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { exitCommunity } from '../../../api/communityApi';
import { consultarIdConversa, removerAmizade } from '../../../api/userApi';
import './index.sass';

const Index = ({ ativo, position, selecionada, modalRef, tipo, user, comunidade, setAtivo }) => {
	const navigate = useNavigate();

	async function handleRemoveAmigo() {
		try {
			if (!selecionada.id || tipo !== 'usuario') throw new Error('Não foi possível concluir essa operação');
			const r = await removerAmizade(selecionada.id);
			if (r !== 204) throw new Error('Não foi possível remover a amizade');
			toast.warning('Amizade removida');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	async function handleExitComunidade() {
		try {
			if (!selecionada.id || tipo !== 'comunidade') throw new Error('Não foi possível concluir essa operação');
			const r = await exitCommunity(selecionada.id, localStorage('user').id);
			if (r !== 204) throw new Error('Não foi possível sair da comunidade');
			toast.warning('Você saiu da comunidade');
			navigate('/home');
			setAtivo(false);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	return (
		<span
			className={'comp-modal-menu ' + (ativo ? 'comp-modal-menu-ativo' : '')}
			style={{
				top: position.y + 'px',
				left: position.x + 'px',
			}}
			ref={modalRef}>
			<div>{selecionada ? selecionada.nome : ''}</div>
			<div className='comp-modal-menu-pointer' />
			<div
				onClick={() => {
					if (tipo === 'comunidade') {
						setAtivo(!ativo);
						navigate(`/chat/comunidade/${selecionada.id}`);
					} else if (tipo === 'usuario') {
						setAtivo(!ativo);
					}
				}}>
				<img
					src='/assets/icons/talk.svg'
					alt='Conversar'
				/>
				Conversar
			</div>
			{tipo === 'comunidade' && selecionada.criador === localStorage('user').id ? (
				<div onClick={() => navigate(`/comunidade/${selecionada.id}/settings`)}>
					<img
						src='/assets/icons/edit.svg'
						alt='Configurar'
					/>{' '}
					Configurar
				</div>
			) : null}
			{tipo === 'usuario' && (
				<div onClick={() => handleRemoveAmigo()}>
					<img
						src='/assets/icons/removeFriend.svg'
						alt='Remover Amizade'
					/>{' '}
					Desfazer Amizade
				</div>
			)}
			<div
				onClick={() => {
					if (tipo === 'comunidade') {
						setAtivo(!ativo);
						comunidade.setComDenuncia(!comunidade.comDenuncia);
					} else if (tipo === 'usuario') {
						setAtivo(!ativo);
						user.setUserDenuncia(!user.userDenuncia);
					}
				}}>
				<img
					src='/assets/icons/danger.svg'
					alt='Reportar'
				/>{' '}
				Reportar
			</div>
			{tipo === 'comunidade' && (
				<div onClick={() => handleExitComunidade()}>
					<img
						src='/assets/icons/exit.svg'
						alt='Sair'
					/>{' '}
					Sair
				</div>
			)}
		</span>
	);
};

export default Index;

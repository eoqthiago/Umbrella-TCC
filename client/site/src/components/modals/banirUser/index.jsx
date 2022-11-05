import React, { useEffect, useState } from 'react';
import { BotaoSolido, InputArea, SubTitulo, Titulo } from '../../../styled';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { banirUsuarioComunidade } from '../../../api/communityApi';
import './index.sass';

const Index = ({ ativo, state, item, setExcluido }) => {
	const [motivo, setMotivo] = useState('');
	const [loading, setLoading] = useState(false);
	const id = 'modal-banir-usuario';

	async function handleBan() {
		setLoading(true);
		try {
			const r = await banirUsuarioComunidade(item.idComunidade, item.id, motivo);
			if (r !== 204) throw new Error('Não foi possível banir o usuário');
			toast.success('O usuário foi banido');
			setExcluido('hidden');
			state(false);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
		setLoading(false);
	}

	function exit() {
		setMotivo('');
		state(!ativo);
	}

	const closeModal = e => {
		if (e.target.id === id) state(!ativo);
	};

	useEffect(() => {
		if (ativo) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	}, [ativo]);

	return (
		<div
			className={(ativo && 'comp-modal-ativo') + ' comp-modal-ban'}
			id={id}
			onClick={e => closeModal(e)}>
			<HashLoader
				color='#24ad6d'
				loading={loading}
				cssOverride={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: '10',
					background: '#0000002d',
					width: '100vw',
					height: '100vh',
				}}
				size={50}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
			<main>
				<button
					className='comp-modal-exit'
					onClick={() => exit()}
				/>
				<Titulo
					cor='#000'
					fonte='1vw'>
					Banir Usuário
				</Titulo>
				<SubTitulo
					cor='#000'
					fonte='1vw'>
					Essa é uma ação irreversível! Deseja mesmo banir o usuário {item.nome}?
				</SubTitulo>
				<section>
					<div className='comp-modal-inputs'>
						<InputArea
							type='text'
							placeholder='Motivo'
							width='100%'
							resize='none'
							height='120px'
							maxLength='900'
							value={motivo}
							onChange={e => setMotivo(e.target.value)}
							disabled={loading}
						/>
					</div>
				</section>
				<section className='comp-modal-botoes'>
					<BotaoSolido
						disabled={loading}
						cor='#f84a4a'
						fonte='1vw'
						onClick={exit}>
						Cancelar
					</BotaoSolido>
					<BotaoSolido
						disabled={loading}
						fonte='1vw'
						onClick={handleBan}>
						Banir
					</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;

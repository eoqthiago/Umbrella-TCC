import React, { useRef, useState } from 'react';
import { BotaoSolido, SubTitulo, Titulo } from '../../../styled';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { excluirComunidade } from '../../../api/communityApi';
import './index.sass';

const Index = ({ ativo, state, comunidade }) => {
	const [loading, setLoading] = useState(false);
	const id = 'modal-deletar-comunidade';
	const ref = useRef();
	const navigate = useNavigate();

	function exit() {
		state(!ativo);
	}

	const closeModal = e => {
		if (e.target.id === id) state(!ativo);
	};

	async function handleDelete() {
		setLoading(true);
		ref.current.continuousStart();
		try {
			const r = await excluirComunidade(comunidade.id);
			if (r !== 204) throw new Error('Não foi possível excluir a comunidade');
			toast.success(`A comunidade ${comunidade.nome} foi excluída com sucesso! Você será redirecionado em instantes`);
			setTimeout(() => navigate('/home'), 3000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
			setLoading(false);
			ref.current.complete();
		}
	}

	return (
		<div
			className={(ativo && 'comp-modal-ativo') + ' comp-modal'}
			id={id}
			onClick={e => closeModal(e)}>
			<LoadingBar
				ref={ref}
				color='#48d677'
			/>
			<main>
				<button
					className='comp-modal-exit'
					onClick={() => exit()}
				/>
				<Titulo
					cor='#000'
					fonte='1vw'>
					Deletar Comunidade
				</Titulo>
				<SubTitulo
					cor='#000'
					fonte='1vw'>
					Essa é uma ação irreversível! Deseja mesmo continuar?
				</SubTitulo>
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
						cor='#929292'
						fonte='1vw'
						onClick={handleDelete}>
						Deletar
					</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;

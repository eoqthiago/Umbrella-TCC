import localStorage from 'local-storage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { deletarComunidade, deletarUsuario } from '../../../api/admin/userApi';
import { BotaoSolido, SubTitulo, Titulo } from '../../../styled';
import './index.sass';

const Index = ({ ativo, state, item, tipo }) => {
	const navigate = useNavigate();
	const id = 'modal-deletar-conta';
	const ref = useRef();
	const [loading, setLoading] = useState(false);

	const exit = e => {
		if (e.target.id === id) state(!ativo);
	};

	async function handleDelete(id) {
		try {
				let r;
				switch(tipo) {
					case "usuario":
						r = await deletarUsuario(id)
						if (r !== 204) throw new Error('Não foi possível alterar a conta')
						toast.warning('Conta excluída com sucesso!')
						break;
					
					case "comunidade":
						r = await deletarComunidade(id)
						toast.warning('Comunidade excluída com sucesso!')
						break;

					default: break;
			}
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
			setLoading(false);
			ref.current.complete();
		}
	}

	useEffect(() => {
		if (ativo) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	}, [ativo]);

	return (
		<div
			id={id}
			className={(ativo && 'comp-modal-ativo') + ' comp-modal'}
			onClick={exit}>
			<LoadingBar
				ref={ref}
				color='#48d677'
			/>
			<main>
				<button
					className='comp-modal-exit'
					onClick={() => state(!ativo)}
				/>
				<Titulo
					cor='#000'
					fonte='1vw'>
					Deseja prosseguir com a deleção?
				</Titulo>
				<SubTitulo
					cor='#000'
					fonte='16px'>
					"{item.nome}" foi denunciado pelo usúario de email "{item.emailDenunciante}""
				</SubTitulo>
				<SubTitulo
					cor='#000'
					fonte='16px'
					>
					Motivo: "{item.motivo}"
				</SubTitulo>

				<section className='comp-modal-botoes'>
					<BotaoSolido
						disabled={loading}
						cor='#f84a4a'
						fonte='1vw'
						onClick={() => state(!ativo)}>
						Cancelar
					</BotaoSolido>
					<BotaoSolido
						disabled={loading}
						cor='#929292'
						fonte='1vw'
						onClick={() => tipo === "comunidade" ?  handleDelete(item.idComunidade) : handleDelete(item.denunciado)}>
						Deletar
					</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;
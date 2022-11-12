import React, { useState } from 'react';
import { BotaoSolido, Input, InputArea, Titulo } from '../../../styled';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';
import { communityCadastro, communityImage } from '../../../api/communityApi';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import './index.sass';

const Index = ({ ativo, state, alterarMenu }) => {
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [publica, setPublica] = useState(true);
	const [imagem, setImagem] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const id = 'modal-cadastrar-comunidade';

	const setarImagem = () => document.getElementById('nova-comunidade-imagem-input').click();
	const showImage = () => (typeof imagem == 'object' ? URL.createObjectURL(imagem) : undefined);

	function exit() {
		setNome('');
		setDescricao('');
		setPublica(true);
		setImagem(null);
		state(!ativo);
	}

	async function cadastrar() {
		setLoading(true);
		try {
			if (!nome.trim()) throw new Error('Preencha o campo nome corretamente');
			const r = await communityCadastro(nome, descricao, publica);
			if (r.status !== 201) throw new Error('Não foi possível criar a comunidade');
			if (imagem) {
				const s = await communityImage(r.data.id, imagem);
				if (s !== 204) toast.warning('Não foi possível salvar a imagem');
			}
			toast.success('Comunidade criada com sucesso!\nEm instantes você será redirecionado 🚀');
			setTimeout(() => {
				alterarMenu(false);
				navigate(`/chat/comunidade/${r.data.id}`);
				setLoading(false);
				exit();
			}, 2000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
			setLoading(false);
		}
	}

	const closeModal = e => {
		if (e.target.id === id) state(!ativo);
	};

	return (
		<div
			className={(ativo && 'comp-modal-ativo') + ' comp-modal'}
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
					Nova Comunidade
				</Titulo>
				<section>
					<div className='comp-modal-inputs'>
						<Input
							type='text'
							placeholder='Nome*'
							width='100%'
							value={nome}
							onChange={e => setNome(e.target.value)}
							disabled={loading}
						/>
						<InputArea
							type='text'
							placeholder='Descrição'
							width='100%'
							resize='none'
							height='120px'
							value={descricao}
							onChange={e => setDescricao(e.target.value)}
							disabled={loading}
						/>
						<FormControl>
							<RadioGroup
								defaultValue={'publica'}
								name='tipo-comunidade'>
								<FormControlLabel
									value={publica && 'publica'}
									onClick={() => setPublica(true)}
									control={
										<Radio
											color='success'
											disabled={loading}
										/>
									}
									label='Pública'
								/>
								<FormControlLabel
									value={!publica && 'privada'}
									onClick={() => setPublica(false)}
									control={
										<Radio
											color='success'
											disabled={loading}
										/>
									}
									label='Privada'
								/>
							</RadioGroup>
						</FormControl>
					</div>
					<div className='comp-modal-imagem-input'>
						Imagem da comunidade
						<img
							src={!imagem ? '/assets/images/community.png' : showImage(imagem)}
							alt=''
							onClick={() => setarImagem()}
							disabled={loading}
						/>
						<input
							type='file'
							id='nova-comunidade-imagem-input'
							onChange={e => setImagem(e.target.files[0])}
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
						onClick={cadastrar}>
						Criar
					</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;

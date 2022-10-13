import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BotaoSolido, Input, SubTitulo, Titulo } from '../../../styled';
import './index.sass';

export default function Index() {
	const [senhaUser, setSenhaUserNova] = useState('');
	const [senhaCheck, setSenhaCheck] = useState('');
	const navigate = useNavigate();

	function confirmarClick() {
		try {
			toast.success('🚀 Senha alterada com sucesso!');
			navigate('/login');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.warning(err.message);
		}
	}

	return (
		<div className='email page'>
			<main>
				<div className='email-titulos'>
					<Titulo
						cor='#02C17D'
						fonte='4vw'>
						Recuperar senha
					</Titulo>
					<SubTitulo
						cor='#3F3F3F'
						fonte='2.5vw'>
						Insira sua nova senha
					</SubTitulo>
				</div>
				<div className='email-corpo'>
					<div className='email-inputs'>
						<Input
							placeholder='Nova Senha'
							width='100%'
							type='password'
							value={senhaUser}
							onChange={e => setSenhaUserNova(e.target.value)}
						/>
						<Input
							placeholder='Confirmar Senha'
							width='100%'
							type='password'
							value={senhaCheck}
							onChange={e => setSenhaCheck(e.target.value)}
						/>
					</div>
					<div className='email-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={confirmarClick}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BotaoSolido, Input, SubTitulo, Titulo } from '../../../styled';
import './index.sass';

export default function Index() {
	const [codigo, setCodigo] = useState('');
	const navigate = useNavigate();

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
						Insira o código enviado no email
					</SubTitulo>
				</div>
				<div className='email-corpo'>
					<div className='email-inputs'>
						<Input
							placeholder='Código'
							width='100%'
							type='email'
							value={codigo}
							onChange={e => setCodigo(e.target.value)}
						/>
					</div>
					<div className='email-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={() => navigate('/alterar-senha')}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import localstorage from 'local-storage';
import { userLogin } from '../../api/userApi';
import { BotaoSolido, Input, SubTitulo, Titulo } from '../../styled';
import './index.sass';

const Index = () => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleLogin() {
		localstorage.remove('user');
		setLoading(true);
		try {
			const r = await userLogin(email, senha);
			localstorage('user', r);
			setTimeout(() => navigate('/home'), 2500);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			setLoading(false);
		}
	}

	useEffect(() => {
		localstorage('user') && navigate('/home');
	});

	return (
		<div className='login page'>
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
				<div className='login-titulos'>
					<Titulo
						cor='#02C17D'
						fonte='4vw'>
						Login
					</Titulo>
					<SubTitulo
						cor='#3F3F3F'
						fonte='2.5vw'>
						Estamos felizes em ter você de volta!
					</SubTitulo>
				</div>
				<div className='login-corpo'>
					<div className='login-inputs'>
						<Input
							placeholder='Email'
							width='100%'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleLogin()}
						/>
						<Input
							placeholder='Senha'
							width='100%'
							type='password'
							value={senha}
							onChange={e => setSenha(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleLogin()}
						/>
						<div className='login-legenda'>
							Esqueceu sua senha? Clique <span onClick={() => navigate('/recuperar')}> aqui </span> para recuperá-la
						</div>
					</div>
					<div className='login-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={handleLogin}
							disabled={loading}>
							Confirmar
						</BotaoSolido>
						<div className='login-legenda'>
							Não possui uma conta? Faça seu cadastro <span onClick={() => navigate('/cadastro')}> aqui! </span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

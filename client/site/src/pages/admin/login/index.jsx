import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import localStorage from 'local-storage';
import { BotaoSolido, Input, Titulo } from '../../../styled';
import { adminLogin } from '../../../api/admin/userApi';
import './index.sass';

const Index = () => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleLogin() {
		try {
			setLoading(true);
			if (!email || !email.trim() || !senha || !senha.trim()) throw new Error('Preencha os campos corretamente');
			const r = await adminLogin(email, senha);
			localStorage('admin', r);
			setTimeout(() => navigate('/admin/dashboard'), 3000);
		} catch (err) {
			if (err.response) toast.warn(err.response.data.err);
			else toast.warn(err.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		if (localStorage('user')) localStorage.remove('user');
		if (localStorage('admin') && localStorage('admin').id) navigate('/admin/dashboard');
	});

	return (
		<div className='adm-login page'>
			<HashLoader
				color='#2d95b1'
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
				<div className='adm-login-titulos'>
					<Titulo
						cor='#02C17D'
						fonte='4vw'>
						Login
					</Titulo>
				</div>
				<div className='adm-login-corpo'>
					<div className='adm-login-inputs'>
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
					</div>
					<div className='adm-login-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={handleLogin}
							disabled={loading}>
							Confirmar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Index;

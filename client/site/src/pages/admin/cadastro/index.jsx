import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import localstorage from 'local-storage';
import { HashLoader } from 'react-spinners';
import { BotaoSolido, Input, Titulo } from '../../../styled';
import { adminCadastro } from '../../../api/admin/userApi';
import './index.sass';

export default function Index() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
	const [senhaconf, setSenhaconf] = useState('');
	const [nascimento, setNascimento] = useState();

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleCadastro() {
		setLoading(true);
		try {
			if (senha !== senhaconf) throw new Error('As senhas são coincidem');
			await adminCadastro(nome, email, senha, nascimento, endereco, telefone, cpf);
			toast.success('🚀 Conta criada com sucesso!');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.warning(err.message);
		}
		setLoading(false);
	}

	return (
		<div className='cadastro-admin page'>
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
				<div className='cadastro-titulos'>
					<Titulo
						cor='#02C17D'
						fonte='4vw'>
						Cadastro
					</Titulo>
				</div>
				<div className='cadastro-corpo'>
					<div className='cadastro-inputs'>
						<Input
							placeholder='Nome de admin'
							width='100%'
							type='text'
							value={nome}
							onChange={e => setNome(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Email'
							width='100%'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
                        <Input
							placeholder='Endereço'
							width='100%'
							value={endereco}
							onChange={e => setEndereco(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Data de nascimento'
							width='100%'
							onFocus={e => (e.target.type = 'date')}
							onBlur={e => (e.target.type = 'text')}
							value={nascimento}
							onChange={e => setNascimento(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Telefone'
							width='100%'
							value={telefone}
							onChange={e => setTelefone(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='CPF'
							width='100%'
							value={cpf}
							onChange={e => setCpf(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Senha'
							width='100%'
							type='password'
							value={senha}
							onChange={e => setSenha(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Confirme sua senha'
							width='100%'
							type='password'
							value={senhaconf}
							onChange={e => setSenhaconf(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
					</div>
					<div className='cadastro-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={handleCadastro}>
							Confirmar
						</BotaoSolido>
						<div className='cadastro-legenda'>
							<div>
								Já possui uma conta? Clique <span onClick={() => navigate('/login')}> aqui </span> para fazer login
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
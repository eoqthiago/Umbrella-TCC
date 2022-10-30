import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header';
import Menu from '../../components/menu';
import { toast } from 'react-toastify';
import { communityBanner, communityEdit, communityImage, consultarCanais, consultarUsuarios, criarCanal, searchCommunityId } from '../../api/communityApi';
import localStorage from 'local-storage';
import { BotaoSolido, Input, InputArea, Titulo } from '../../styled';
import { BuscarImg } from '../../api/services';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import CanalComunidade from '../../components/listas/canalComunidade';
import UsuarioComunidade from '../../components/listas/usuarioComunidade';
import './index.sass';

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [imgAtivo, setImgAtivo] = useState('');
	const [bannerAtivo, setBannerAtivo] = useState('');
	const [editando, setEditando] = useState(false);
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [publica, setPublica] = useState(true);
	const [imgBanner, setImgBanner] = useState('');
	const [imgCom, setImgCom] = useState('');
	const [criarCanalNome, setCriarCanalNome] = useState('');
	const [pesquisaNome, setPesquisaNome] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	async function handleAlteracao() {
		try {
			const r = await communityEdit(nome, descricao, publica, id);
			if (r !== 204) throw new Error('Não foi possível salvar as alterações');
			setEditando(false);

			if (typeof imgCom != 'string') {
				const s = await communityImage(id, imgCom);
				if (s !== 204) throw new Error('Não foi possível salvar a imagem');
			}
			if (typeof imgBanner != 'string') {
				const s = await communityBanner(id, imgBanner);
				if (s !== 204) throw new Error('Não foi possível salvar a imagem');
			}

			toast.success('As alterações foram salvas com sucesso!');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	async function carregarPage() {
		try {
			const r = await searchCommunityId(id);
			if (!r || r.criador !== localStorage('user').id) throw new Error('Um erro ocorreu');
			setNome(r.nome);
			setDescricao(r.descricao);
			setPublica(r.publica);
			setImgCom(r.imagem);
			setImgBanner(r.banner);
			const s = await consultarUsuarios(id);
			console.log(s)
			setUsuarios(s);
			const t = await consultarCanais(id);
			setCanais(t);
		} catch (err) {
			if (err.response) toast.warning(err.response.data.err);
			else toast.warning(err.message);
			navigate('/');
		}
	}

	// async function handleRemoveComunidade() {
	// 	try {
	// 		const r = await excluirComunidade(id);
	// 		if (r !== 204) throw new Error('Não foi possível excluir a comunidade');
	// 		toast.success(`A comunidade ${comunidade.nome} foi excluída com sucesso! Você será redirecionado em instantes`);
	// 		setTimeout(() => navigate('/home'), 3000);
	// 	} catch (err) {
	// 		if (err.response) toast.error(err.response.data.err);
	// 		else toast.error(err.message);
	// 	}
	// }

	async function handleCancelar() {
		await carregarPage();
		setEditando(false);
	}

	async function handleCriarCanal() {
		try {
			if (!criarCanalNome || !criarCanalNome.trim()) return;

			const r = await criarCanal(id, criarCanalNome);
			if (r !== 204) throw new Error('Não foi possível criar o canal');
			toast.success('Canal criado com sucesso!');
			setCriarCanalNome('');
			await carregarPage();
		} catch (err) {
			if (err.response) toast.warning(err.response.data.err);
			else toast.warning(err.message);
		}
	}

	function alterarBanner() {
		document.getElementById('config-community-banner').click();
		setEditando(true);
	}

	function alterarImagem() {
		document.getElementById('config-community-imagem').click();
		setEditando(true);
	}

	useEffect(() => {
		const load = async () => await carregarPage();
		load();
	}, []);

	return (
		<div className='comunidade-conf page'>
			<Header
				menu
				alterarMenu={setMenu}
				estadoMenu={menu}
			/>
			<Menu
				ativo={menu}
				alterar={setMenu}
			/>

			<main>
				<section className='comunidade-conf-inicial'>
					<div
						className='comunidade-conf-banner'
						onMouseEnter={() => setBannerAtivo('ativo')}
						onMouseLeave={() => setBannerAtivo('')}>
						<div className={'comunidade-conf-banner-button ' + bannerAtivo}>
							<button onClick={alterarBanner}>Alterar capa</button>
						</div>
						<img
							src={imgBanner ? BuscarImg(imgBanner) : '/assets/images/doodles.webp'}
							alt='Imagem Banner'
						/>
					</div>
					<div
						className='comunidade-conf-banner-img'
						onMouseEnter={() => setImgAtivo('ativo')}
						onMouseLeave={() => setImgAtivo('')}>
						<div className={'comunidade-conf-banner-img-button ' + imgAtivo}>
							<button onClick={alterarImagem}>Alterar imagem</button>
						</div>
						<img
							src={imgCom ? BuscarImg(imgCom) : '/assets/images/community.png'}
							alt='Imagem Comunidade'
						/>
					</div>
				</section>

				<section className='cont-community-info'>
					<div
						className='cont-community-edit'
						onClick={() => setEditando(true)}
						style={{ display: editando && 'none' }}
					/>

					<h1
						onClick={() => setEditando(true)}
						style={{ display: editando && 'none' }}>
						{nome + ` #${id}` ?? 'Comunidade'}
					</h1>

					<p
						onClick={() => setEditando(true)}
						style={{ display: editando && 'none' }}>
						{descricao ?? 'Descrição'}
					</p>

					<Input
						type='text'
						placeholder='Nome da comunidade*'
						width='100%'
						style={{ display: !editando && 'none' }}
						value={nome}
						onChange={e => setNome(e.target.value)}
					/>
					<InputArea
						type='text'
						placeholder='Descrição da comunidade'
						width='100%'
						resize='none'
						height='120px'
						minHeight='70px'
						style={{ display: !editando && 'none' }}
						value={descricao}
						onChange={e => setDescricao(e.target.value)}
					/>
					<FormControl sx={{ display: !editando && 'none' }}>
						<RadioGroup
							defaultValue={'publica'}
							name='tipo-comunidade'
							value={publica}
							onChange={e => setPublica(e.target.value)}>
							<FormControlLabel
								value={true}
								control={<Radio color='success' />}
								label='Pública'
							/>
							<FormControlLabel
								value={false}
								control={<Radio color='success' />}
								label='Privada'
							/>
						</RadioGroup>
					</FormControl>

					<div className='cont-community-info-buttons'>
						<BotaoSolido
							fonte='1vw'
							cor='#f84a4a'
							padding='5px 10px'
							style={{ display: !editando && 'none' }}
							onClick={() => handleCancelar()}>
							Cancelar
						</BotaoSolido>
						<BotaoSolido
							fonte='1vw'
							style={{ display: !editando && 'none' }}
							onClick={() => handleAlteracao()}>
							Salvar Alterações
						</BotaoSolido>
					</div>
				</section>

				<section className='comunidade-conf-canais'>
					<Titulo
						cor='#1f1f1f'
						fonte='1vw'>
						Canais
					</Titulo>

					<main className='comunidade-conf-canais-list'>
						<div className='comunidade-conf-canais-criar'>
							<Input
								type='text'
								placeholder='Nome do canal'
								width='100%'
								style={{
									margin: 0,
								}}
								value={criarCanalNome}
								onChange={e => setCriarCanalNome(e.target.value)}
								maxLength='20'
							/>
							<div
								className='comunidade-conf-botao-criar'
								onClick={() => handleCriarCanal()}>
								Criar
								<img
									src='/assets/icons/create.svg'
									alt='Criar'
								/>
							</div>
						</div>
						<div className='comunidade-conf-canais-items'>
							{canais.map((item, index) => (
								<CanalComunidade
									item={item}
									key={index}
								/>
							))}
						</div>
					</main>
				</section>

				<section className='comunidade-conf-usuarios'>
					<Titulo
						cor='#1f1f1f'
						fonte='1vw'>
						Usuários
					</Titulo>

					<main className='comunidade-conf-usuarios-list'>
						<div className='comunidade-conf-usuarios-pesquisar'>
							<Input
								type='text'
								placeholder='Pesquisar por nome'
								width='100%'
								style={{
									margin: 0,
								}}
								value={pesquisaNome}
								onChange={e => setPesquisaNome(e.target.value)}
								maxLength='20'
							/>
							<img
								src='/assets/icons/search.svg'
								alt='Criar'
							/>
						</div>
						<div className='comunidade-conf-usuarios-items'>
							{usuarios.map((item, index) => (
								<UsuarioComunidade
									item={item}
									key={index}
								/>
							))}
						</div>
					</main>
				</section>
			</main>

			<input
				type='file'
				id='config-community-banner'
				className='hidden'
				onChange={e => setImgBanner(e.target.files[0])}
			/>
			<input
				type='file'
				id='config-community-imagem'
				className='hidden'
				onChange={e => setImgCom(e.target.files[0])}
			/>
		</div>
	);
}

/*
{usuarios.map((item) => (
	<div className="membersDisplay">
		<img src={item.imagem ? BuscarImg(item.imagem) : "/assets/images/user.png"} alt="Usuário" onClick={() => navigate(`/usuario/${item.id}`)} />
		<div>
			<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
			<div>
				<img onClick={() => handleAmizade(item.id)} src="/assets/icons/addFriend.svg" alt="Adicionar amigo" disabled={block} />
			</div>
		</div>
	</div>
))}
*/

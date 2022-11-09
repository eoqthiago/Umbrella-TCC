import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header';
import Menu from '../../components/menu';
import { toast } from 'react-toastify';
import localStorage from 'local-storage';
import { BotaoSolido, Input, InputArea, Titulo } from '../../styled';
import { BuscarImg } from '../../api/services';
import Amizade from '../../components/listas/amizade';
import {
	userAmigosConsulta,
	userBanner,
	userConsulta,
	userEdit,
	userImg,
} from '../../api/userApi';
import './index.sass';

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [usuarios, setUsuarios] = useState([]);
	const [imgAtivo, setImgAtivo] = useState('');
	const [bannerAtivo, setBannerAtivo] = useState('');
	const [editando, setEditando] = useState(false);
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [imgBanner, setImgBanner] = useState('');
	const [imgCom, setImgCom] = useState('');
	const [checkEdit, setCheckEdit] = useState(false);

	const navigate = useNavigate();
	const id = Number(useParams().id);

	async function handleAlteracao() {
		if (!checkEdit) return;
		try {
			const r = await userEdit(nome, descricao, id);
			if (r !== 202) throw new Error('Não foi possível salvar as alterações');
			setEditando(false);

			if (typeof imgCom != 'string') {
				const s = await userImg(id, imgCom);
				if (s !== 204) throw new Error('Não foi possível salvar a imagem');
			}
			if (typeof imgBanner != 'string') {
				const s = await userBanner(id, imgBanner);
				if (s !== 204) throw new Error('Não foi possível salvar o banner');
			}

			toast.success('As alterações foram salvas com sucesso!');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
	}

	async function carregarPage() {
		try {
			const r = await userConsulta(id);
			if (id === localStorage('user').id) setCheckEdit(true);
			setNome(r.nome);
			setDescricao(r.descricao);
			setImgCom(r.imagem);
			setImgBanner(r.banner);
			const s = await userAmigosConsulta(id);
			setUsuarios(s);
		} catch (err) {
			if (err.response) toast.warning(err.response.data.err);
			else toast.warning(err.message);
			if (localStorage('user')) navigate('/home');
			else navigate('/');
		}
	}

	async function handleCancelar() {
		await carregarPage();
		setEditando(false);
	}

	function alterarBanner() {
		document.getElementById('config-usuario-banner').click();
		setEditando(true);
	}

	function alterarImagem() {
		document.getElementById('config-usuario-imagem').click();
		setEditando(true);
	}

	useEffect(() => {
		const load = async () => await carregarPage();
		load();
		// eslint-disable-next-line
	}, [id]);

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
						onMouseEnter={() => checkEdit && setBannerAtivo('ativo')}
						onMouseLeave={() => checkEdit && setBannerAtivo('')}>
						<div className={'comunidade-conf-banner-button ' + bannerAtivo}>
							<button onClick={alterarBanner}>Alterar banner</button>
						</div>
						<img
							src={
								imgBanner
									? BuscarImg(imgBanner)
									: '/assets/images/doodles.webp'
							}
							alt='Imagem Banner'
						/>
					</div>
					<div
						className='comunidade-conf-banner-img'
						onMouseEnter={() => checkEdit && setImgAtivo('ativo')}
						onMouseLeave={() => checkEdit && setImgAtivo('')}>
						<div className={'comunidade-conf-banner-img-button ' + imgAtivo}>
							<button onClick={alterarImagem}>Alterar imagem</button>
						</div>
						<img
							src={
								imgCom
									? BuscarImg(imgCom)
									: '/assets/images/community.png'
							}
							alt='Imagem Comunidade'
						/>
					</div>
				</section>

				<section className='cont-community-info'>
					<div
						className={'cont-community-edit ' + (!checkEdit ? 'hidden' : '')}
						onClick={() => setEditando(checkEdit && true)}
						style={{
							display: editando && 'none',
							cursor: !checkEdit && 'default',
						}}
					/>

					<h1
						onClick={() => setEditando(checkEdit && true)}
						style={{
							display: editando && 'none',
							cursor: !checkEdit && 'default',
						}}>
						{nome + ` #${id}` ?? 'Comunidade'}
					</h1>

					<p
						onClick={() => setEditando(checkEdit && true)}
						style={{
							display: editando && 'none',
							cursor: !checkEdit && 'default',
						}}>
						{descricao ?? 'Descrição'}
					</p>

					<Input
						type='text'
						placeholder='Nome de usuario'
						width='100%'
						style={{ display: !editando && 'none' }}
						value={nome}
						onChange={e => setNome(e.target.value)}
					/>
					<InputArea
						type='text'
						placeholder='Descrição'
						width='100%'
						resize='none'
						height='120px'
						minHeight='70px'
						style={{ display: !editando && 'none' }}
						value={descricao}
						onChange={e => setDescricao(e.target.value)}
					/>

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

				<section className='comunidade-conf-usuarios'>
					<Titulo
						cor='#1f1f1f'
						fonte='1vw'>
						Amigos
					</Titulo>

					<main className='comunidade-conf-usuarios-list'>
						<div className='comunidade-conf-usuarios-items'>
							{usuarios.map((item, index) => (
								<Amizade
									item={item}
									key={index}
									tipo={checkEdit ? 'amigo' : ''}
								/>
							))}
						</div>
					</main>
				</section>
			</main>

			<input
				type='file'
				id='config-usuario-banner'
				className='hidden'
				onChange={e => setImgBanner(e.target.files[0])}
			/>
			<input
				type='file'
				id='config-usuario-imagem'
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

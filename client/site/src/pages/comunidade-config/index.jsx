import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header';
import Menu from '../../components/menu';
import { toast } from 'react-toastify';
import { communityBanner, communityEdit, communityImage, consultarCanais, consultarUsuarios, searchCommunityId } from '../../api/communityApi';
import localStorage from 'local-storage';
import { BotaoSolido, Input, InputArea } from '../../styled';
import { BuscarImg } from '../../api/services';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import './index.sass';

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [banner, setBanner] = useState('');
	const [canais, setCanais] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [img, setImg] = useState('');
	const [editando, setEditando] = useState(false);
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [publica, setPublica] = useState(true);
	const [imgBanner, setImgBanner] = useState('');
	const [imgCom, setImgCom] = useState('');
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

	function alterarBanner() {
		document.getElementById('config-community-banner').click();
		setEditando(true);
	}

	function alterarImagem() {
		document.getElementById('config-community-imagem').click();
		setEditando(true);
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

	useEffect(() => {
		async function carregarPage() {
			const r = await searchCommunityId(id);
			if (!r || r.criador !== localStorage('user').id) {
				toast.warning('Um erro ocorreu');
				navigate('/');
			}
			setNome(r.nome);
			setDescricao(r.descricao);
			setPublica(r.publica);
			setImg(r.imagem);
			setBanner(r.banner);
			const s = await consultarUsuarios(id);
			setUsuarios(s);
			const t = await consultarCanais(id);
			setCanais(t);
		}
		carregarPage();
	}, [id, navigate]);

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
						onMouseEnter={() => setBanner('ativo')}
						onMouseLeave={() => setBanner('')}>
						<div className={'comunidade-conf-banner-button ' + banner}>
							<button onClick={alterarBanner}>Alterar capa</button>
						</div>
						<img
							src={imgBanner ? BuscarImg(imgBanner) : '/assets/images/doodles.webp'}
							alt='Imagem Banner'
						/>
					</div>
					<div
						className='comunidade-conf-banner-img'
						onMouseEnter={() => setImg('ativo')}
						onMouseLeave={() => setImg('')}>
						<div className={'comunidade-conf-banner-img-button ' + img}>
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
					<BotaoSolido
						fonte='1vw'
						style={{ display: !editando && 'none' }}
						onClick={() => handleAlteracao()}>
						Salvar Alterações
					</BotaoSolido>
				</section>

				<div className='cont-membrs'>
					<span>
						<ul>
							{canais.map(item => (
								<li key={item.idCanal}>{item.nome}</li>
							))}
						</ul>
						<button>+ Criar canal</button>
					</span>

					<div className='cont-insides'>
						<span>
							<h1>Membros</h1>
						</span>
						<section>
							<span>
								Filtrar por nome: <input />
							</span>
							<div className='cont-mebrs-dspl'>
								{usuarios.map(item => (
									<li
										className='membersDisplay'
										key={item.id}>
										<img
											src='/assets/images/user.png'
											alt='Usuário'
										/>
										<div>{item.nome}</div>
									</li>
								))}
							</div>
						</section>
						<div>
							<button onClick={() => /*handleRemoveComunidade()*/ null}>Excluir comunidade</button>
						</div>
					</div>
				</div>
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

import React, { useEffect, useState } from 'react';
import { BuscarImg } from '../../api/services';
import Header from '../../components/header';
import Menu from '../../components/menu';
import Card from '../../components/card';
import { adicionarUsuarioComunidade, searchCommunityId } from '../../api/communityApi';
import { BotaoSolido, Titulo } from '../../styled';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import './index.sass';

export default function Index() {
	const [menu, setMenu] = useState(false);
	const [comunidade, setComunidade] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const idParam = Number(useParams().idParam);

	async function entrarComunidade() {
		setLoading(true);
		try {
			const r = await adicionarUsuarioComunidade(idParam);
			if (r !== 204) throw new Error('Não foi possível entrar na comunidade');
			setTimeout(() => {
				toast.success('Você entrou na comunidade', comunidade.nome, '!');
				navigate(`/chat/comunidade/${idParam}`);
			}, 3000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		async function carregarPage() {
			const r = await searchCommunityId(idParam);
			if (!r) navigate('/not-found');
			setComunidade(r);
		}
		carregarPage();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='community-info page'>
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
				<section className='community-info-card'>
					<img
						src={!comunidade.imagem || !comunidade.imagem.trim() ? '/assets/images/doodles.webp' : BuscarImg(comunidade.imagem)}
						alt=''
					/>
					<div>
						<div>
							<Titulo
								fonte='1vw'
								cor='#131313'>
								{comunidade.nome}
							</Titulo>
							<div>{comunidade.descricao}</div>
						</div>
						<BotaoSolido
							width='100%'
							fonte='2vw'
							onClick={entrarComunidade}>
							Entrar
						</BotaoSolido>
					</div>
				</section>
				<section className='community-info-others'>
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</section>
			</main>
		</div>
	);
}

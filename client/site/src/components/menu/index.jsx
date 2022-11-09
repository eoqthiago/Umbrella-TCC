import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import { useJwt } from 'react-jwt';
import {
	userAmigosConsulta,
	userComunidadesConsulta,
	userConsulta,
} from '../../api/userApi';
import { BuscarImg } from '../../api/services';
import CadastrarComunidade from '../modals/cadastrarComunidade';
import MenuListaModal from '../modals/menu';
import ListaMenu from '../listas/menu';
import UserDenuncia from '../modals/denunciarUser';
import ComunidadeDenuncia from '../modals/denunciarComunidade';
import './index.sass';

export default function Index({ ativo, alterar }) {
	const { isExpired } = useJwt(
		localStorage('user') ? localStorage('user').token : null
	);
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [comunidadeModal, setComunidadeModal] = useState(false);
	const [comunidades, setComunidades] = useState([]);
	const [amigos, setAmigos] = useState([]);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [convModal, setConvModal] = useState(false);
	const [coSelec, setCoSelec] = useState(null);
	const [modalTipo, setModalTipo] = useState('');
	const [denunciaUser, setDenunciaUser] = useState(false);
	const [denunciaComunidade, setDenunciaComunidade] = useState(false);
	const id = 'modal-menu';
	const modalRef = useRef();

	function openModal() {
		setConvModal(true);
		document.body.addEventListener('click', closeModal);
	}

	function closeModal(e) {
		e.stopPropagation();
		const contain = modalRef.current.contains(e.target);
		if (!contain) {
			setConvModal(false);
			document.body.removeEventListener('click', closeModal);
			document.oncontextmenu = document.body.oncontextmenu = () => true;
		}
	}

	function logout() {
		document.body.style.overflow = 'unset';
		localStorage.remove('user');
		toast.success('Logout feito com sucesso!');
		navigate('/');
	}

	const exit = e => {
		if (e.target.id === id) alterar(!ativo);
	};

	useEffect(() => {
		if (!localStorage('user')) {
			toast.warn('Você precisa estar logado para acessar essa página');
			navigate('/');
		} else if (isExpired) {
			localStorage.remove('user');
			toast.warn('Você precisa fazer login novamente');
			navigate('/login');
		}
	});

	useEffect(() => {
		async function consultarUsuario() {
			try {
				const r = await userConsulta(localStorage('user').id);
				setUser(r);
			} catch (err) {}
		}
		consultarUsuario();
	}, []);

	useEffect(() => {
		if (ativo) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	}, [ativo]);

	useEffect(() => {
		async function consultasMenu() {
			try {
				const r = await userAmigosConsulta(localStorage('user').id);
				setAmigos(r);
				const s = await userComunidadesConsulta(localStorage('user').id);
				setComunidades(s);
				if (r === undefined || s === undefined) window.location.reload();
			} catch (err) {}
			setTimeout(() => consultasMenu(), 15000);
		}
		consultasMenu();
	}, []);

	return (
		<div
			className={ativo ? 'comp-menu-bg' : undefined}
			id={id}
			onClick={e => exit(e)}>
			<UserDenuncia
				ativo={denunciaUser}
				state={setDenunciaUser}
				info={coSelec}
			/>
			<ComunidadeDenuncia
				ativo={denunciaComunidade}
				state={setDenunciaComunidade}
				info={coSelec}
			/>
			<CadastrarComunidade
				ativo={comunidadeModal}
				state={setComunidadeModal}
				alterarMenu={alterar}
			/>
			<MenuListaModal
				modalRef={modalRef}
				position={pos}
				ativo={convModal}
				setAtivo={setConvModal}
				selecionada={coSelec}
				tipo={modalTipo}
				user={{ userDenuncia: denunciaUser, setUserDenuncia: setDenunciaUser }}
				comunidade={{
					comDenuncia: denunciaComunidade,
					setComDenuncia: setDenunciaComunidade,
				}}
			/>

			<main className={(ativo && 'comp-menu-ativo') + ' comp-menu'}>
				<section className='comp-menu-config'>
					<div>
						<img
							src='/assets/icons/search-light.svg'
							alt='Pesquisa'
							title='Pesquisa'
							onClick={() => {
								document.body.style.overflow = 'unset';
								navigate('/pesquisa');
							}}
						/>
						<img
							src='/assets/icons/friend.svg'
							alt='Amizades'
							title='Amizades'
							onClick={() => {
								document.body.style.overflow = 'unset';
								navigate('/amizades');
							}}
						/>
						<img
							src='/assets/icons/create.svg'
							alt='Criar comunidade'
							title='Criar comunidade'
							onClick={() => setComunidadeModal(!comunidadeModal)}
						/>
						<img
							src='/assets/icons/config.svg'
							alt='Configurações'
							title='Configurações'
							onClick={() => {
								document.body.style.overflow = 'unset';
								navigate('/settings');
							}}
						/>
						<img
							src='/assets/icons/exit.svg'
							alt='Sair'
							title='Sair'
							onClick={() => logout()}
						/>
						<hr />
						<img
							src={
								user.imagem !== null
									? BuscarImg(user.imagem)
									: '/assets/images/user.png'
							}
							alt='Usuário'
							title={user ? user.nome : 'Usuário'}
							className='comp-menu-img-user'
							onClick={() => {
								document.body.style.overflow = 'unset';
								navigate(`/usuario/${user.id}`);
							}}
						/>
					</div>
				</section>
				<section className='comp-menu-chats'>
					<button
						className='comp-menu-exit'
						onClick={() => alterar(false)}
					/>

					<div>Comunidades</div>
					<section>
						{comunidades
							? comunidades.map(item => (
									<ListaMenu
										tipo='comunidade'
										setTipo={setModalTipo}
										item={item}
										convMenu={{
											ativo: convModal,
											open: openModal,
											pos: pos,
											setPos: setPos,
											selecionada: coSelec,
											setSelecionada: setCoSelec,
										}}
										key={item.id}
										selecionado={coSelec}
										alterar={alterar}
									/>
							  ))
							: null}
					</section>

					<div>Amizades</div>
					<section>
						{amigos
							? amigos.map(item => (
									<ListaMenu
										tipo='usuario'
										setTipo={setModalTipo}
										item={item}
										convMenu={{
											ativo: convModal,
											open: openModal,
											pos: pos,
											setPos: setPos,
											selecionada: coSelec,
											setSelecionada: setCoSelec,
										}}
										key={item.id}
										alterar={alterar}
									/>
							  ))
							: null}
					</section>
				</section>
			</main>
		</div>
	);
}

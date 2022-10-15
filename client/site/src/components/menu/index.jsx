import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import { useJwt } from 'react-jwt';
import { userAmigosConsulta, userComunidadesConsulta, userConsulta } from '../../api/userApi';
import { BuscarImg } from '../../api/services';
import CadastrarComunidade from '../modals/cadastrarComunidade';
import MenuListaModal from '../modals/menu';
import ListaMenu from '../listas/menu';
import UserDenuncia from '../modals/denunciarUser';
import ComunidadeDenuncia from '../modals/denunciarComunidade';
import './index.sass';

export default function Index({ ativo, alterar }) {
	const { isExpired } = useJwt(localStorage('user').token ?? '');
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

	useEffect(() => {
		if (!localStorage('user') || isExpired) {
			localStorage.remove('user');
			toast.warn('Você precisa estar logado para acessar essa página');
			navigate('/');
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
			} catch (err) {}
			try {
				const r = await userComunidadesConsulta(localStorage('user').id);
				setComunidades(r);
			} catch (err) {}
			setTimeout(() => {
				consultasMenu();
			}, 5000);
		}
		consultasMenu();
	}, []);

	return (
		<div className={ativo ? 'comp-menu-bg' : undefined}>
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
			/>
			<MenuListaModal
				modalRef={modalRef}
				position={pos}
				ativo={convModal}
				setAtivo={setConvModal}
				selecionada={coSelec}
				tipo={modalTipo}
				user={{ userDenuncia: denunciaUser, setUserDenuncia: setDenunciaUser }}
				comunidade={{ comDenuncia: denunciaComunidade, setComDenuncia: setDenunciaComunidade }}
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
							src='/assets/icons/create.svg'
							alt='Criar comunidade'
							title='Criar comunidade'
							onClick={() => setComunidadeModal(!comunidadeModal)}
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
							src={user.imagem ? BuscarImg(user.imagem) : '/assets/images/user.png'}
							alt='Usuário'
							title={user.nome ?? 'Usuário'}
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
						{comunidades.map(item => (
							<ListaMenu
								tipo='comunidade'
								setTipo={setModalTipo}
								item={item}
								convMenu={{ ativo: convModal, open: openModal, pos: pos, setPos: setPos, selecionada: coSelec, setSelecionada: setCoSelec }}
								key={item.id}
								selecionado={coSelec}
								alterar={alterar}
							/>
						))}
					</section>

					<div>Amizades</div>
					<section>
						{amigos.map(item => (
							<ListaMenu
								tipo='usuario'
								setTipo={setModalTipo}
								item={item}
								convMenu={{ ativo: convModal, open: openModal, pos: pos, setPos: setPos, selecionada: coSelec, setSelecionada: setCoSelec }}
								key={item.id}
								alterar={alterar}
							/>
						))}
					</section>
				</section>
			</main>
		</div>
	);
}

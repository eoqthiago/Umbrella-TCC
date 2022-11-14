import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../../../components/listas/usuario';
import Header from '../../../../components/header';
import Menu from '../../../../components/menu-adm';
import Denuncia from '../../../../components/admin/denuncias';
import localStorage from 'local-storage';
import Modal from '../../../../components/modals/denuncias';
import './index.sass';
import { comunidadesDenunciadas } from '../../../../api/admin/userApi';

export default function Index(props) {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [loading, setLoading] = useState(false);
	const [menu, setMenu] = useState(false);
	const [visibility, setVisibility] = useState(false);
	const [denuncias, setDenuncias] = useState([]);
	const [user, setUser] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			async function consultarDenuncias() {
				const r = await comunidadesDenunciadas();
				setDenuncias(r);
			}
			consultarDenuncias();
		} catch (err) {}
	}, []);

	return (
		<div className='adm-denuncias page'>
			<Header
				alterarMenu={setMenu}
				estadoMenu={menu}
			/>
			<Menu />
			<Modal
				ativo={visibility}
				state={setVisibility}
				item={user}
				tipo="comunidade"
			/>
			<main>
				<div className='denuncias-cont'>
					<div className='adjust-cont'>
						<h1 style={{ fontSize: '18px' }}>Comunidades denunciadas</h1>
						<div className='adjust-reports'>
							{denuncias.map(item => (
								<span style={{margin: "1em"}} onClick={() => setUser(item) & setVisibility(true)}>
									<Denuncia
										tipo='comunidade'
										item={item}
									/>
								</span>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
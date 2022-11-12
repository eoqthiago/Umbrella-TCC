import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from 'local-storage';
import { BuscarImg } from '../../../api/services';
import ModalBanUser from '../../../components/modals/banirUser';
import './index.sass';

const Index = ({ item }) => {
	const [excluido, setExcluido] = useState('');
	const [banModal, setBanModal] = useState(false);
	const navigate = useNavigate();

	function handleOpenModal() {
		setBanModal(true);
	}

	return (
		<div className={'comp-conf-usuario ' + excluido}>
			<ModalBanUser
				item={item}
				ativo={banModal}
				state={setBanModal}
				setExcluido={setExcluido}
			/>
			<div className='comp-conf-infos'>
				<img
					src={item.imagem ? BuscarImg(item.imagem) : '/assets/images/user.png'}
					alt='Usuário'
					title={item.nome}
					onClick={() => navigate(`/usuario/${item.id}`)}
				/>
				<span onClick={() => navigate(`/usuario/${item.id}`)}>{item.nome}</span>
			</div>
			<div className='comp-conf-acoes'>
				<img
					src='/assets/icons/promote.svg'
					alt='Promover à admin'
					title='Promover à admin'
					className={item.idUsuario === localStorage('user').id ? 'hidden' : ''}
				/>
				<img
					src='/assets/icons/ban.svg'
					alt='Banir'
					title='Banir'
					className={item.idUsuario === localStorage('user').id ? 'hidden' : ''}
					onClick={() => handleOpenModal()}
				/>
			</div>
		</div>
	);
};

export default Index;

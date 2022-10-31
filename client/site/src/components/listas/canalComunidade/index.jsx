import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { excluirCanal } from '../../../api/communityApi';
import './index.sass';

const Index = props => {
	const [visible, setVisible] = useState('hidden');
	const [excluido, setExcluido] = useState('');

	async function handleExcluir() {
		try {
			const r = await excluirCanal(props.item.idComunidade, props.item.idCanal);
			if (r !== 204) throw new Error();
			toast.success('Canal excluído com sucesso!');
			setExcluido('hidden');
		} catch (err) {
			if (err.response) toast.warning(err.response.data.err);
			else toast.warning('Não foi possível excluir esse canal');
		}
	}

	return (
		<div
			className={'comp-conf-canal ' + excluido}
			onMouseEnter={() => setVisible('')}
			onMouseLeave={() => setVisible('hidden')}>
			<span>{props.item.nome}</span>
			<img
				src='/assets/icons/trash.svg'
				alt='Excluir'
				title='Excluir'
				className={visible}
				onClick={() => handleExcluir()}
			/>
		</div>
	);
};

export default Index;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BuscarImg } from '../../../api/services';
import './index.sass';

const Index = item => {
	const [excluido, setExcluido] = useState('');

	return (
		<div className={'comp-conf-usuario ' + excluido}>
			<div className='comp-conf-infos'>
				<img
					src={item.imagem ? BuscarImg(item.imagem) : '/assets/images/user.png'}
					alt=''
				/>
				<span>{item.nome}</span>
			</div>
			<div className='comp-conf-acoes'></div>
		</div>
	);
};

export default Index;

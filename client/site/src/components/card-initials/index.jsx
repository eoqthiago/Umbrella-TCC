import React from 'react';
import { BuscarImg } from '../../api/services';
import './index.sass';

const Index = ({ comunidade }) => {
	return (
		<div
			className='comp-init-cards'
			title='Entre para ver mais!'>
			<img
				src={comunidade.imagem ? BuscarImg(comunidade.imagem) : '/assets/images/community.png'}
				alt='Comunidade'
			/>
			<div>{comunidade.nome}</div>
		</div>
	);
};

export default Index;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuscarImg } from '../../../api/services';
import './index.sass';

const Index = ({ item, tipo, setCanal, canalSelecionado }) => {
	const navigate = useNavigate();
	const [selecionado, setSelecionado] = useState('');

	useEffect(() => (canalSelecionado && canalSelecionado === item.idCanal ? setSelecionado('comp-lista-lateral-selecionado') : setSelecionado('')), [canalSelecionado, item]);

	return (
		<div
			className={'comp-lista-lateral ' + selecionado}
			onClick={() => (tipo === 'usuario' ? navigate(`/usuario/${item.id}`) : setCanal(item.idCanal))}
			title={item.nome}>
			{tipo === 'usuario' && (
				<img
					src={item.imagem ? BuscarImg(item.imagem) : '/assets/images/user.png'}
					alt='Imagem'
				/>
			)}
			<div>{item.nome}</div>
		</div>
	);
};

export default Index;

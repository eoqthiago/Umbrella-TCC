import React from 'react';
import { BuscarImg } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import './index.sass';

export function Index({ comunidade }) {
	const navigate = useNavigate();

	return (
		<div
			className='comp-card'
			onClick={() => navigate(`/comunidade/${comunidade.id}/info`)}>
			<img
				className='banner'
				src={comunidade.banner ? BuscarImg(comunidade.banner) : '/assets/images/doodles.webp'}
				alt='Comunidade'
			/>
			<img
				className='image'
				src={comunidade.imagem ? BuscarImg(comunidade.imagem) : '/assets/images/community.png'}
				alt='Comunidade'
			/>
			<div className='info-cont'>
				<div>
					<div>{comunidade.nome ?? 'Comunidade'}</div>
					<p>{comunidade.descricao ?? 'Descrição'}</p>
				</div>
				<div className='qtd-info'>
					{/*<img src={"/assets/icons/icon_counter.png"} alt="" />
					<p>{props.usuarios ?? "0"}</p>*/}
				</div>
			</div>
		</div>
	);
}

export default Index;

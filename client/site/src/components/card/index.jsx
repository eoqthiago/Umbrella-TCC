import React from 'react';
import { BuscarImg } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import './index.sass';

export function Index({ comunidade }) {
	const navigate = useNavigate();

	if (!comunidade)
		comunidade = {
			banner: '',
			imagem: '',
			nome: '',
			descricao: '',
		};

	return (
		<div
			className='comp-card'
			onClick={() => navigate(`/comunidade/${comunidade.id}/info`)}>
			<img
				className='banner'
				src={!comunidade.banner || !comunidade.banner.trim() ? '/assets/images/doodles.webp' : BuscarImg(comunidade.banner)}
				alt='Comunidade'
			/>
			<img
				className='image'
				src={!comunidade.imagem || !comunidade.imagem.trim() ? '/assets/images/community.png' : BuscarImg(comunidade.imagem)}
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

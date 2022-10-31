import React from 'react';
import './index.sass';

const Index = ({ ativo, state, titulo, conteudo }) => {
	const id = 'modal-texto';

	const closeModal = e => {
		if (e.target.id === id) state(!ativo);
	};

	return (
		<div
			className={(ativo && 'comp-modal-texto-ativo') + ' comp-modal-texto'}
			id={id}
			onClick={e => closeModal(e)}>
			<main>
				<button
					className='comp-modal-texto-exit'
					onClick={() => state()}
				/>
				<h1>{titulo}</h1>
				<div>{conteudo}</div>
			</main>
		</div>
	);
};

export default Index;

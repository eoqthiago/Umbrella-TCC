import React from 'react';
import './index.sass';

export default function Index({ conteudo, setConteudo, send }) {
	return (
		<nav className='comp-input-mensagem'>
			<input
				placeholder='Escreva sua mensagem'
				value={conteudo}
				onChange={e => setConteudo(e.target.value)}
			/>
			<img
				src='/assets/icons/send.svg'
				alt=''
				onClick={send}
			/>
		</nav>
	);
}

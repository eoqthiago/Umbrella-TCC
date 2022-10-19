import React from 'react';
import './index.sass';

const Index = ({ item }) => {
	return (
		<div className='comp-message'>
			<div className='comp-message-conteudo'>
				<img
					src='/assets/images/user.png'
					alt=''
				/>
				<div>
					<h1>{item.usuario}</h1>
					<span> {item.conteudo}</span>
				</div>
			</div>
		</div>
	);
};

export default Index;

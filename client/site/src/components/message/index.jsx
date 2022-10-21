import React from 'react';
import './index.sass';

const Index = ({ item }) => {
	return (
		<div className='comp-message'>
				<img
					src='/assets/images/user.png'
					alt=''
				/>
			<div className='comp-message-conteudo'>
				<div>
					<h1>{item.usuario}</h1>
					<span> {item.conteudo}</span>
				</div>
			</div>
		</div>
	);
};

export default Index;

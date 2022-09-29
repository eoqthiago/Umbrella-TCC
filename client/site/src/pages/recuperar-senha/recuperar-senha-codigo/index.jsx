import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import localstorage from "local-storage";
import { userCodeSearch } from "../../../api/userApi";

import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";

export default function Index() {
	const navigate = useNavigate();
	const ref = useRef();



	return (
		<div className="email page">
			<LoadingBar color="#48d677" ref={ref} />
			<main>
				<div className="email-titulos">
					<SubTitulo cor="#3F3F3F" fonte="2.5vw">
					Link de recuperação foi enviado para o seu E-mail <br/>
						não recebeu o E-mail? clique no botão para reenviar  
					</SubTitulo>
				</div>
				<div className="email-corpo">
					<div className="email-btn">
						<BotaoSolido fonte="4vw" width="100%" onClick={() => navigate('/recuperar')}>
							Reenviar
						</BotaoSolido>
					</div>
				</div>
			</main>
		</div>
	);
}

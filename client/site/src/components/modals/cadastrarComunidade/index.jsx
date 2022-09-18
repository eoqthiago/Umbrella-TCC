import React, { useState } from "react";
import { BotaoSolido, Input, InputArea, Titulo } from "../../../styled";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./index.sass";

const Index = ({ ativo, state }) => {
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [publica, setPublica] = useState(true);
	const [imagem, setImagem] = useState("");

	const setarImagem = () => document.getElementById("nova-comunidade-imagem-input").click();
	const showImage = () => (typeof imagem == "object" ? URL.createObjectURL(imagem) : undefined);

	function exit() {
		setNome("");
		setDescricao("");
		setPublica(true);
		setImagem(null);
		state(!ativo);
	}

	return (
		<div className={(ativo && "comp-modal-ativo") + " comp-modal"}>
			<main>
				<button className="comp-modal-exit" onClick={() => exit()} />
				<Titulo cor="#000" fonte="1vw">
					Nova Comunidade
				</Titulo>
				<section>
					<div className="comp-modal-inputs">
						<Input type="text" placeholder="Nome*" width="100%" value={nome} onChange={(e) => setNome(e.target.value)} />
						<InputArea type="text" placeholder="Descrição" width="100%" resize="none" height="120px" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
						<FormControl>
							<RadioGroup defaultValue={"publica"} name="tipo-comunidade">
								<FormControlLabel value={publica && "publica"} onClick={() => setPublica(true)} control={<Radio color="success" />} label="Pública" />
								<FormControlLabel value={!publica && "privada"} onClick={() => setPublica(false)} control={<Radio color="success" />} label="Privada" />
							</RadioGroup>
						</FormControl>
					</div>
					<div className="comp-modal-imagem-input">
						Capa da comunidade
						<img src={!imagem ? "/assets/images/user.png" : showImage(imagem)} alt="" onClick={() => setarImagem()} />
						<input type="file" id="nova-comunidade-imagem-input" onChange={(e) => setImagem(e.target.files[0])} />
					</div>
				</section>
				<section className="comp-modal-botoes">
					<BotaoSolido cor="#f84a4a" fonte="1vw" onClick={exit}>
						Cancelar
					</BotaoSolido>
					<BotaoSolido fonte="1vw">Criar</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;

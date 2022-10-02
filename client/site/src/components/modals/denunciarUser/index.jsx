import React, { useRef, useState } from "react";
import { BotaoSolido, Input, InputArea, Titulo } from "../../../styled";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { userReport } from "../../../api/userApi";
import "./index.sass";

const Index = ({ ativo, state, info }) => {
	const [email, setEmail] = useState("");
	const [motivo, setMotivo] = useState("");
	const [loading, setLoading] = useState(false);
	const ref = useRef();

	function exit() {
		setEmail("");
		setMotivo("");
		state(!ativo);
	}

	async function handleDenuncia() {
		setLoading(true);
		ref.current.continuousStart();
		try {
			const r = await userReport(info.id, email, motivo);
			if (r !== 204) throw new Error("Não foi possível fazer a denúncia");
			toast.success("Denúncia enviada");
			setTimeout(() => exit(), 1000);
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.error(err.message);
		}
		ref.current.complete();
		setLoading(false);
	}

	return (
		<div className={(ativo && "comp-modal-denuncia-user-ativo") + " comp-modal-denuncia-user"}>
			<LoadingBar ref={ref} color="#48d677" />
			<main>
				<button className="comp-modal-denuncia-user-exit" onClick={() => exit()} />
				<Titulo cor="#000" fonte="1vw">
					Denunciar o usuário <b>{info ? info.nome : ""}</b>
				</Titulo>
				<section>
					<div className="comp-modal-denuncia-user-inputs">
						<Input type="text" placeholder="Seu email" width="100%" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
						<InputArea type="text" placeholder="Motivo" width="100%" resize="none" height="120px" value={motivo} onChange={(e) => setMotivo(e.target.value)} disabled={loading} />
					</div>
				</section>
				<section className="comp-modal-denuncia-user-botoes">
					<BotaoSolido disabled={loading} cor="#f84a4a" fonte="1vw" onClick={exit}>
						Cancelar
					</BotaoSolido>
					<BotaoSolido disabled={loading} cor="#929292" fonte="1vw" onClick={handleDenuncia}>
						Denunciar
					</BotaoSolido>
				</section>
			</main>
		</div>
	);
};

export default Index;

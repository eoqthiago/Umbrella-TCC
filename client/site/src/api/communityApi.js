import axios from "axios";
import { baseUrl, userToken } from "./services";

const api = axios.create({ baseURL: baseUrl });

export async function communityCadastro(nome, descricao, publica) {
	if (!userToken) return;
	const r = await api.post(
		"/comunidade",
		{
			nome: nome,
			descricao: descricao,
			publica: publica === true,
		},
		{
			headers: {
				"x-access-token": userToken,
			},
		}
	);
	return r.data;
}

export async function communityImage(id, imagem) {
	if (!imagem || !id) return;
	const formd = new FormData();
	formd.append("imagem", imagem);

	const r = await api.put(`/comunidade/imagem/${id}`, formd, {
		headers: {
			"Content-Type": "multipart/form-data",
			"x-access-token": userToken,
		},
	});
	return r.status;
}

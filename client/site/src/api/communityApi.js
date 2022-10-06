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
	if (!imagem || !id || !userToken) return;
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

export async function pesquisar(categoria, conteudo) {
	if (!userToken || !categoria || !conteudo) return [];
	let r;
	switch (categoria) {
		case "comunidades":
			if (isNaN(conteudo[0])) {
				r = await api.get(`/comunidade?community=${conteudo}`, {
					headers: {
						"x-access-token": userToken,
					},
				});
			} else {
				r = await api.get(`/comunidade?community=#${conteudo}`, {
					headers: {
						"x-access-token": userToken,
					},
				});
			}
			break;
		case "usuarios":
			r = await api.get(`/usuarios?nome=${conteudo}`, {
				headers: {
					"x-access-token": userToken,
				},
			});
			break;
		// case "chats":
		// 	r = await api.get("");
		// 	break;
		default:
			break;
		}
		console.log(r.data)
	return r.data;
}

export async function communityReport(id, email, motivo) {
	if (!userToken) return;
	const r = await api.post(
		`/comunidade/${id}/denuncia`,
		{
			email: email,
			motivo: motivo,
		},
		{
			headers: {
				"x-access-token": userToken,
			},
		}
	);
	return r.status;
}

export async function searchCommunityId(id) {
	if (!userToken) return;
	const r = await api.get(`/comunidadeId?community=${id}`, {
		headers: {
			"x-access-token": userToken,
		},
	});
	return r.data;
}

export async function exitCommunity(idComunidade, idUsuario) {
	if (!userToken || !idComunidade || !idUsuario) return;
	const r = await api.delete(`/comunidade/${idComunidade}/usuario/${idUsuario}`, {
		headers: {
			"x-access-token": userToken,
		},
	});
	return r.status;
}

export async function mostrarCanais(id) {
	const r = await api.get(`/comunidade/canal/${id}`);
	return r.data;
}

import axios from 'axios';
import { baseUrl, userToken } from './services';

const api = axios.create({ baseURL: baseUrl });

export async function communityCadastro(nome, descricao, publica) {
	if (!userToken) return;
	const r = await api.post(
		'/comunidade',
		{
			nome,
			descricao,
			publica: publica === true,
		},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r;
}

export async function communityImage(id, imagem) {
	if (!imagem || !id || !userToken) return;
	const formd = new FormData();
	formd.append('imagem', imagem);

	const r = await api.put(`/comunidade/imagem/${id}`, formd, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'x-access-token': userToken,
		},
	});
	return r.status;
}

export async function pesquisar(categoria, conteudo) {
	if (!userToken || !categoria || !conteudo) return [];
	let r;
	switch (categoria) {
		case 'comunidades':
			if (conteudo[0] !== '#' || isNaN(conteudo.substring(1, conteudo.length))) {
				r = await api.get(`/comunidade?name=${conteudo}`, {
					headers: {
						'x-access-token': userToken,
					},
				});
				r.data.tipo = 'array';
			} else {
				r = await api.get(`/comunidade/${conteudo.substring(1, conteudo.length)}`, {
					headers: {
						'x-access-token': userToken,
					},
				});
			}
			break;
		case 'usuarios':
			r = await api.get(`/usuarios?nome=${conteudo}`, {
				headers: {
					'x-access-token': userToken,
				},
			});
			break;
		// case "chats":
		// 	r = await api.get("");
		// 	break;
		default:
			break;
	}
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
				'x-access-token': userToken,
			},
		}
	);
	return r.status;
}

export async function searchCommunityId(id) {
	if (!userToken) return;
	const r = await api.get(`/comunidade/${id}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function exitCommunity(idComunidade, idUsuario) {
	if (!userToken || !idComunidade || !idUsuario) return;
	const r = await api.delete(`/comunidade/${idComunidade}/usuario/${idUsuario}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.status;
}

export async function consultarCanais(id) {
	if (!userToken || !id) return;
	const r = await api.get(`/comunidade/canal/${id}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function excluirComunidade(comId) {
	if (!userToken || !comId) return;
	const r = await api.delete(`/comunidade/${comId}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.status;
}

export async function consultarUsuarios(comId) {
	if (!userToken || !comId) return;
	const r = await api.get(`/comunidade/${comId}/usuarios`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function communityEdit(nome, descricao, publica, id) {
	if (!userToken) return;
	const r = await api.put(
		`/comunidade/${id}`,
		{
			nome,
			descricao,
			publica: publica === true,
		},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r.status;
}

export async function consultarComunidadeUsuario(usuario, comunidade) {
	if (!userToken || !usuario || !comunidade) return;
	const r = await api.get(`/comunidade/${comunidade}/usuario/${usuario}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function adicionarUsuarioComunidade(comunidade) {
	if (!userToken) return;
	const r = await api.post(
		`/comunidade/${comunidade}/usuario`,
		{},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r.status;
}

export async function enviarMensagemCanal(conteudo, canal, comunidade) {
	if (!userToken || !conteudo || !canal || !comunidade) return;
	const r = await api.post(
		`/comunidade/${comunidade}/canal/${canal}`,
		{
			conteudo,
		},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r.data.id;
}

export async function listarMensagens(comunidade, canal, lastId) {
	if (!userToken || !comunidade || !canal) return;
	const r = await api.get(`/comunidade/${comunidade}/canal/${canal}/mensagens/${lastId}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

import axios from 'axios';
import { baseUrl, userToken } from './services';

const api = axios.create({ baseURL: baseUrl });

export async function userLogin(email, senha) {
	const r = await api.post('/usuario/login', {
		email: email,
		senha: senha,
	});
	return r.data;
}

export async function userCadastro(nome, email, senha, nascimento) {
	const r = await api.post('/usuario', {
		nome: nome,
		email: email,
		senha: senha,
		nascimento: nascimento,
	});
	return r;
}

export async function userConsulta(id) {
	if (!userToken) return;
	const r = await api.get(`/usuario?id=${id}`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function userAmigosConsulta(id) {
	if (!userToken) return;
	const r = await api.get(`/usuario/${id}/amizades`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function userComunidadesConsulta(id) {
	if (!userToken) return;
	const r = await api.get(`/usuario/${id}/comunidades`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function userReport(id, email, motivo) {
	if (!userToken) return;
	const r = await api.post(
		`/usuario/${id}/denuncia`,
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

export async function removerAmizade(id) {
	if (!userToken || !id) return;
	const r = await api.delete(`/usuario/amizade?id=${id}&type=user`, {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.status;
}

export async function consultarPedidosAmizade() {
	if (!userToken) return;
	const r = await api.get('/usuario/amizades/pedidos', {
		headers: {
			'x-access-token': userToken,
		},
	});
	return r.data;
}

export async function acoesAmizade(situacao, id) {
	if (!userToken || !['A', 'N'].includes(situacao) || !id) return;
	const r = await api.put(
		`/usuario/amizade?id=${id}&situacao=${situacao}`,
		{},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r.status;
}

export async function pedirAmizade(idSolicitado) {
	if (!userToken || !idSolicitado) return;
	const r = await api.post(
		'/usuario/amizade',
		{
			usuarioSolicitado: idSolicitado,
		},
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);
	return r.status;
}

export async function userEmailSearch(email) {
	const r = await api.post(`/usuario/recuperar?email=${email}`, {
		email: email,
	});

	return r.data;
}

export async function userAlterarPassword(senha) {
	const r = await api.put(
		'/alterar-senha',
		{ senha: senha },
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);

	return r.data;
}

export async function userAlterarEmail(email) {
	const r = await api.put(
		'/email-novo',
		{ email: email },
		{
			headers: {
				'x-access-token': userToken,
			},
		}
	);

	return r.data;
}

export async function userDelete() {
	if (!userToken) return;
	const r = await api.delete('/usuario', {
		headers: {
			'x-access-token': userToken,
		},
	});

	return r.status;
}

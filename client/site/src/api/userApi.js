import axios from "axios";
import { baseUrl, userToken } from "./services";

const api = axios.create({ baseURL: baseUrl });

export async function userLogin(email, senha) {
	const r = await api.post("/usuario/login", {
		email: email,
		senha: senha,
	});
	return r.data;
}

export async function userCadastro(nome, email, senha, nascimento) {
	const r = await api.post("/usuario", {
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
			"x-access-token": userToken,
		},
	});
	return r.data;
}

export async function userAmigosConsulta(id) {
	if (!userToken) return;
	const r = await api.get(`/usuario/${id}/amizades`, {
		headers: {
			"x-access-token": userToken,
		},
	});
	return r.data;
}

export async function userComunidadesConsulta(id) {
	if (!userToken) return;
	const r = await api.get(`/usuario/${id}/comunidades`, {
		headers: {
			"x-access-token": userToken,
		},
	});
	return r.data;
}

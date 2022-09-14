import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5050" });

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

export async function userConsulta(id, auth) {
	const r = await api.get(`/usuario/${id}`, {
		headers: {
			"x-acess-token": auth,
		},
	});
	return r.data;
}

export async function userImagem(imagem) {
	return `${api.getUri()}/${imagem}`;
}

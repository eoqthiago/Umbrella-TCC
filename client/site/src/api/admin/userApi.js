import axios from "axios";
import { baseUrl, adminToken } from "../services";

const api = axios.create({ baseURL: baseUrl });

export async function adminLogin(email, senha) {
	const r = await api.post("/admin/login", {
		email: email,
		senha: senha,
	});
	return r.data;
};

export async function adminCadastro(nome, email, senha, nascimento, endereco, telefone, cpf) {
	if (!adminToken) return;
	
	const r = await api.post("/admin", {
		nome: nome,
		email: email,
		senha: senha,
		nascimento: nascimento,
		endereco: endereco,
		telefone: telefone,
		cpf: cpf,
		root: true
	},
	{
		headers: {
			"x-access-token": adminToken,
		},
	});
	return r.data;
};

export async function usuariosDenunciados() {
	const r = await api.get("/admin/denuncias/usuarios", {
		headers: {
			"x-access-token": adminToken,
		},
	});
	return r.data;
};

// Deletar usuario
export async function deletarUsuario(id) {
	if (!id || !adminToken ) return;
	const r = await api.delete(`/admin/denuncias/usuarios/${id}`, {
		headers: {
			'x-access-token': adminToken,
		},
	});
	return r.data;
};
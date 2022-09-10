import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5050" });

export async function userLogin(email, senha) {
	const r = await api.post("/usuario/login", {
		email: email,
		senha: senha,
	});
	return r.data;
}

import axios from "axios";
import { baseUrl } from "../services";

const api = axios.create({ baseURL: baseUrl });

export async function adminLogin(email, senha) {
	const r = await api.post("/admin/login", {
		email: email,
		senha: senha,
	});
	return r.data;
}

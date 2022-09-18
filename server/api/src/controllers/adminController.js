import { Router } from "express";
import jwt from "jsonwebtoken";
import { sha256 } from "js-sha256";
import { adminCadastro, adminDelete, adminLogin, adminSearch, adminVerificar } from "../repositories/adminRepository.js";
import { cpfTest, emailTest, telefoneTest } from "../utils/expressionTest.js";

const server = Router();

server.post("/admin/login", async (req, res) => {
	try {
		const admin = req.body;
		switch (true) {
			case !emailTest(admin.email.trim()):
				throw new Error("O email inserido é inválido");
			case !admin.senha || !admin.senha.trim():
				throw new Error("A senha é obrigatória");
			default:
				break;
		}
		const search = await adminSearch(admin.email);
		if (!search[0]) throw new Error("Um erro ocorreu");

		admin.senha = sha256(admin.senha);
		const answer = await adminLogin(admin);
		const token = jwt.sign(
			{
				id: answer.id,
				email: answer.email,
			},
			process.env.JWT_KEY,
			{
				expiresIn: "10d",
			}
		);
		res.status(202).send({
			nome: answer.nome,
			token: token,
		});
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

server.post("/admin", async (req, res) => {
	try {
		const admin = req.body;
		const header = req.header("x-access-token");
		switch (true) {
			case !adminVerificar(jwt.decode(header).email):
				throw new Error("Falha na autenticação");
			case !emailTest(admin.novoAdmin.email):
				throw new Error("Email inválido");
			case !admin.novoAdmin.senha || !admin.novoAdmin.senha.trim():
				throw new Error("Senha inválida");
			case !cpfTest(admin.novoAdmin.cpf):
				throw new Error("CPF inválido");
			case !telefoneTest(admin.novoAdmin.telefone):
				throw new Error("Telefone inválido");
			case !admin.novoAdmin.nascimento:
				throw new Error("Data de nascimento inválida");
		}
		const rep = await adminSearch(admin.novoAdmin.email);
		if (rep[0]) throw new Error("Esse usuário já foi registrado anteriormente");

		admin.novoAdmin.senha = sha256(admin.novoAdmin.senha);
		const answer = await adminCadastro(admin.novoAdmin);
		res.status(201).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

server.delete("/admin", async (req, res) => {
	try {
		const admin = req.body;
		const header = req.header("x-access-token");
		switch (true) {
			case !adminVerificar(jwt.decode(header).email):
				throw new Error("Falha na autenticação");
			case !emailTest(admin.email):
				throw new Error("Email inválido");
		}
		const search = await adminSearch(admin.email);
		if (!search[0]) throw new Error("Usuário não encontrado");

		const answer = adminDelete(admin.email);
		if (answer < 1) throw new Error("Não foi possível deletar a conta");
		res.status(204).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

export default server;

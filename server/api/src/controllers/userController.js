import { Router } from "express";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import { userCadastro, userDelete, userEdit, userLogin, userSearch } from "../repositories/userRepository.js";

const server = Router();

server.post("/usuario", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !user.nome || !user.nome.trim():
				throw new Error("O nome de usuário é obrigatório");
			case !user.email || !user.email.trim():
				throw new Error("O email é obrigatório");
			case !user.senha || !user.senha.trim():
				throw new Error("A senha é obrigatória");
			case !user.nascimento:
				throw new Error("A data de nascimento é obrigatória");
			default:
				break;
		}
		const search = await userSearch(user.email);
		if (search[0]) throw new Error("Um erro ocorreu");
		user.senha = sha256(user.senha);
		const answer = await userCadastro(user);
		res.status(201).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

server.post("/usuario/login", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !user.email || !user.email.trim():
				throw new Error("O email é obrigatório");
			case !user.senha || !user.senha.trim():
				throw new Error("A senha é obrigatória");
			default:
				break;
		}
		const search = await userSearch(user.email);
		if (!search[0]) throw new Error("Um erro ocorreu");
		user.senha = sha256(user.senha);
		const answer = await userLogin(user);
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

server.put("/usuario", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !user.header.token:
				throw new Error("Falha na autenticação");
			case !user.nome || !user.nome.trim():
				throw new Error("O nome é obrigatório");
			default:
				break;
		}
		user.id = jwt.decode(user.header.token).id;
		const answer = await userEdit(user);
		if (!answer) throw new Error();
		res.status(202).send();
	} catch (err) {
		res.status(400).send({
			err: "Um erro ocorreu",
		});
	}
});

server.delete("/usuario", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !user.header.token:
				throw new Error("Falha na autenticação");
		}
		const email = jwt.decode(user.header.token).email;
		const answer = await userDelete(email);
		if (!answer) throw new Error("Um erro ocorreu");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

export default server;

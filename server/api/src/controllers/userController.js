import { Router } from "express";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import {
	aceitarAmizade,
	amigosConsulta,
	recusarAmizade,
	removerAmizade,
	solicitarAmizade,
	userCadastro,
	userDelete,
	userEdit,
	userForgotPassword,
	userIdSearch,
	userLogin,
	userSearch,
} from "../repositories/userRepository.js";
import { emailTest } from "../utils/expressionTest.js";

const server = Router();

// Cadastro
server.post("/usuario", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !user.nome || !user.nome.trim() || user.nome.length > 50:
				throw new Error("O nome de usuário inserido é inválido");
			case !emailTest(user.email):
				throw new Error("O email inserido é inválido");
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

// Login
server.post("/usuario/login", async (req, res) => {
	try {
		const user = req.body;
		switch (true) {
			case !emailTest(user.email):
				throw new Error("O email inserido é inválido");
			case !user.senha || !user.senha.trim():
				throw new Error("A senha inserida é inválida");
			default:
				break;
		}

		user.senha = sha256(user.senha);
		const answer = await userLogin(user);
		if (!answer) throw new Error("Email ou senha incorretos");

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

//recuperar senha
server.post("/recuperar-senha"), async (req, res) => {
	try {
		const email = req.query;
		const emailUser = await userSearch(email);
		if(!emailUser) throw new Error ("Email não encontrado")
		
	} catch (err) {
		
	}
}

// Alterar perfil
server.put("/usuario", async (req, res) => {
	try {
		const user = req.body;
		const header = req.header("x-acess-token");
		switch (true) {
			case !header || !userIdSearch(jwt.decode(header).id)[0]:
				throw new Error("Falha na autenticação");
			case !user.nome || !user.nome.trim() || user.nome.length > 50:
				throw new Error("O nome é obrigatório");
			default:
				break;
		}
		user.id = jwt.decode(header).id;
		const answer = await userEdit(user);
		if (answer < 0) throw new Error("Não foi possível alterar o perfil");
		res.status(202).send();
	} catch (err) {
		res.status(400).send({
			err: "Um erro ocorreu",
		});
	}
});

// Deletar conta
server.delete("/usuario", async (req, res) => {
	try {
		const header = req.header("x-acess-token");
		if (!header || !userIdSearch(jwt.decode(header).id)[0]) throw new Error("Falha na autenticação");
		const email = jwt.decode(header).email;
		const answer = await userDelete(email);
		if (answer < 1) throw new Error("Um erro ocorreu");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Listar amigos
server.get("/usuario/:id/amizades", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const header = req.header("x-acess-token");
		if (!header || !userIdSearch(jwt.decode(header).id)[0]) throw new Error("Falha na autenticação");
		if (!userIdSearch(id)[0]) throw new Error("Usuário não encontrado");
		const answer = await amigosConsulta(id);
		if (answer < 1) throw new Error("Nenhuma amizade foi encontrada");
		res.send(answer);
	} catch (err) {
		res.status(404).send({
			err: err.message,
		});
	}
});

// Pedir em amizade
server.post("/usuario/amizade", async (req, res) => {
	try {
		const user = req.body;
		const header = req.header("x-acess-token");
		switch (true) {
			case !header || !userIdSearch(jwt.decode(header).id)[0]:
				throw new Error("Falha na autenticação");
			case !userIdSearch(user.usuarioSolicitado):
				throw new Error("Usuário não encontrado");
			default:
				break;
		}
		user.id = jwt.decode(header).id;
		const answer = await solicitarAmizade(user.id, user.usuarioSolicitado);

		if (answer < 1) throw new Error("Um erro ocorreu");
		res.send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Aceitar / recusar pedido de amizade
server.put("/usuario/amizade/:id/:situacao", async (req, res) => {
	try {
		const user = req.body;
		const id = Number(req.params.id);
		const situacao = req.params.situacao.toUpperCase()[0];
		const header = req.header("x-acess-token");
		switch (true) {
			case !header || !userIdSearch(jwt.decode(header).id)[0]:
				throw new Error("Falha na autenticação");
			case !id || !situacao || !["A", "N"].includes(situacao):
				throw new Error("Campos inválidos");
			default:
				break;
		}
		user.id = jwt.decode(header).id;
		let answer;
		switch (situacao) {
			case "A":
				answer = await aceitarAmizade(id, user.id);
				break;
			case "N":
				answer = await recusarAmizade(id, user.id);
				break;
			default:
				break;
		}
		if (answer < 1) {
			throw new Error(`Não foi possível ${situacao == "N" ? "rejeitar" : "aceitar"} a amizade`);
		}

		res.send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Remover pedido / amizade
server.delete("/usuario/amizade/:id", async (req, res) => {
	try {
		const user = req.body;
		const id = Number(req.params.id);
		const header = req.header("x-acess-token");
		switch (true) {
			case !header || !userIdSearch(jwt.decode(header).id)[0]:
				throw new Error("Falha na autenticação");
			case !id:
				throw new Error("Campos inválidos");
		}
		user.id = jwt.decode(header).id;
		const answer = await removerAmizade(id, user.id);
		if (answer < 1) throw new Error("Não foi possível desfazer a amizade");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

export default server;

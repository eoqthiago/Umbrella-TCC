import { Router } from "express";
import jwt from "jsonwebtoken";
import { communityCreate, communityEdit, communityGet, communityUser, communityAdmin } from "../repositories/comunnityRepository.js";
import { userIdSearch } from "../repositories/userRepository.js";

const server = Router();

//Adicionar usuario na comunidade
server.post("/comunidade/convite", (req, res) => {
	try {
		const userId = req.query.user;
		const community = req.query.community;
		const r = communityUser(userId, community);
		res.status(200).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Criar comunidade
server.post("/comunidade", async (req, res) => {
	try {
		const header = req.header("x-acess-token");
		const community = req.body;
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !community.nome || !community.nome.trim() || community.nome.length > 50:
				throw new Error("O nome inserido é inválido");
			case community.descricao.length > 700:
				console.log(community.descricao.length);
				throw new Error("A descrição inserida é inválida");
			default:
				break;
		}
		const answer = await communityCreate(auth.id, community);
		if (answer < 1) throw new Error("Não foi possível criar a comunidade");

		res.status(201).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Alterar comunidade //!alterar
server.put("/comunidade/:id", async (req, res) => {
	try {
		const community = req.body;
		if (!community.id || !community.id.trim()) throw new Error("O grupo precisa de um ID");
		if (!community.name || !community.name.trim()) throw new Error("O grupo precisa de um ");
		else if (!community.desc || !community.desc.trim()) throw new Error("O grupo precisa de um ");
		else {
			const r = await communityEdit(community);
			res.status(201).send();
		}
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

//Consultar todas comunidades
server.get("/comunidade", async (req, res) => {
	try {
		const r = await communityGet();
		res.status(200).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

//Promover usuario à administrador
server.post("/comunidade/administrador", async (req, res) => {
	try {
		const user = req.body;
		if (!user.id || !user.id.trim()) throw new Error("Usuario não esta na comunidade");
		const r = await communityAdmin(user);
		res.status(202).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

export default server;

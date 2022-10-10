import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import {
	communityCreate,
	communityEdit,
	communityUserAdd,
	communityAdmin,
	communityOwner,
	communityImage,
	communityId,
	communityName,
	communityUserID,
	communityUsername,
	communityCanal,
	listarCanais,
	communityDenuncia,
	communityUserDelete,
	communityUserIdSearch,
	communityDelete,
	communityUsers,
} from "../repositories/comunnityRepository.js";
import { userIdSearch } from "../repositories/userRepository.js";
import { emailTest } from "../utils/expressionTest.js";

const server = Router();
const communityImg = multer({ dest: "storage/communities" });

//Adicionar usuario na comunidade
server.post("/comunidade/convite", (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		const communityId = req.query.community;
		switch (true) {
			case !header || !auth:
				throw new Error("Ocorreu um erro de autenticação");
			case !userIdSearch(auth.id):
				throw new Error("Não autorizado");
			default:
				break;
		}
		const r = communityUserAdd(auth.id, communityId.community);
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
		const header = req.header("x-access-token");
		const community = req.body;
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !community.nome || !community.nome.trim() || community.nome.length > 50:
				throw new Error("O nome inserido é inválido");
			case community.descricao.length > 700:
				throw new Error("A descrição inserida é inválida");
			default:
				break;
		}
		const answer = await communityCreate(auth.id, community);
		if (!answer) throw new Error("Não foi possível criar a comunidade");

		res.status(201).send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Enviar imagem
server.put("/comunidade/imagem/:id", communityImg.single("imagem"), async (req, res) => {
	try {
		const header = req.header("x-access-token");
		const id = Number(req.params.id);
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !req.file:
				throw new Error("Arquivo não encontrado");
			case !(await communityId(id)):
				throw new Error("Comunidade não encontrada");
			case !(await communityOwner(auth.id, id)):
				throw new Error("O usuário não possui permissão");
			default:
				break;
		}
		const img = req.file.path;
		const answer = await communityImage(id, img);
		if (answer < 1) throw new Error("Não foi possível alterar a imagem");

		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Alterar comunidade
// Se o id do usuario logado for igual do criador deve deixar alterar, se não, lançar um erro
server.put("/comunidade/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		const community = req.body;
		switch (true) {
			case !header || !auth || !(await communityOwner(auth.id, community.id)):
				throw new Error("Erro de autenticação");
			case !community.id || !community.id.trim():
				throw new Error("O grupo precisa de um ID");
			case !community.name || !community.name.trim():
				throw new Error("O grupo precisa de um nome");
			case !community.descricao || !community.descricao.trim():
				throw new Error("O grupo precisa de uma descrição");
			default:
				break;
		}
		community.id = Number(id);
		const r = await communityEdit(community);
		if (r < 1) throw new Error("Não foi possível fazer as alterações na comunidade");
		res.status(201).send("Editada com sucesso");
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

//Consultar comunidade por nome
server.get("/comunidade", async (req, res) => {
	try {
		const community = req.query.name;
		const r = await communityName(community);
		res.send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

//Consultar comunidade por ID
server.get("/comunidade/:id", async (req, res) => {
	try {
		const community = Number(req.params.id);
		const r = await communityId(community);
		
		res.send(r);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Promover usuario à administrador
server.put("/comunidade/admin/usuario", async (req, res) => {
	try {
		const { situacao, id, comunidade } = req.query;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !(await communityId(comunidade)):
				throw new Error("Comunidade não encontrada");
			case !header || !auth || !(await userIdSearch(auth.id)) || !(await communityOwner(auth.id, comunidade)):
				throw new Error("Falha na autenticação");
			case !id || !situacao || !comunidade || !["A", "N"].includes(situacao):
				throw new Error("Campos inválidos");
			case !(await communityUserID(id, comunidade)):
				throw new Error("Usuário não encontrado");
			default:
				break;
		}
		const answer = await communityAdmin(id, situacao[0] === "A");
		if (answer < 1) throw new Error("Não foi possível alterar as permissões do usuário administrador");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Procurar usúario na comunidade por id/nome
server.get("/comunidade/usuario", async (req, res) => {
	try {
		const user = req.body;
		if (!user.comunidade || !communityId(user.comunidade)) throw new Error("Comunidade não existe");
		else if (Number(user.usuario)) {
			let r = await communityUserID(user.usuario, user.comunidade);
			res.status(200).send(r);
		} else if (isNaN(user.usuario)) {
			const r = await communityUsername(user.usuario, user.comunidade);
			res.status(200).send(r);
		}
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Criar canal
server.post("/comunidade/canal", async (req, res) => {
	try {
		const canal = req.body;
		const community = req.body;
		const r = await communityCanal(community, canal);
		res.status(200).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Listar canais
server.get("/comunidade/canal/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const r = await listarCanais(id);
		res.status(200).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Denunciar comunidade
server.post("/comunidade/:id/denuncia", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const user = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !id || !(await communityId(id)):
				throw new Error("Comunidade não encontrada");
			case !emailTest(user.email):
				throw new Error("o email inserido é inválido");
			case user.motivo == undefined || !user.motivo.trim():
				throw new Error("O motivo inserido é inválido");
			case user.motivo.length > 500:
				throw new Error("Motivo excede a quantidade de caracteres permitida");
		}
		const answer = await communityDenuncia(auth.id, user.email, id, user.motivo);
		if (answer < 1) throw new Error("Não foi possível fazer a denúncia");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Sair da comunidade
server.delete("/comunidade/:comunidade/usuario/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const comunidade = Number(req.params.comunidade);
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)) || auth.id !== id:
				throw new Error("Falha na autenticação");
			case !id || !comunidade || !(await communityUserID(id, comunidade)):
				throw new Error("Você não está nessa comunidade");
		}
		const answer = await communityUserDelete(id, comunidade);
		if (answer < 1) throw new Error("Não foi possível sair da comunidade");
		res.status(204).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Excluir comunidade
server.delete("/comunidade/configuracao/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !(await communityUserID(auth.id, id)) || !(await communityOwner(auth.id, id)) || !(await communityId(id)):
				throw new Error("Não autorizado");
			default:
				break;
		}
		const del = await communityDelete(id);
		res.status(200).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Consultar todos usuarios da comunidade
server.get("/comunidade/configuracao/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !(await communityId(id)):
				throw new Error("Não autorizado");
		}
		const users = await communityUsers(id);
		res.status(200).send(users);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

export default server;

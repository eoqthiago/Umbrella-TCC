import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { communityCreate, communityEdit, communityUser, communityAdmin, communityOwner, communitiesGet, communityImage, communityId, communityName, communityUserID} from "../repositories/comunnityRepository.js";
import { userIdSearch } from "../repositories/userRepository.js";

const server = Router();
const communityImg = multer({ dest: "storage/communities" });

//Adicionar usuario na comunidade
server.post("/comunidade/convite", (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		const communityId = req.query.community;
		switch (true) {
			case !header || !auth: throw new Error('Ocorreu um erro de autenticação');
			case !userIdSearch(auth.id): throw new Error('Não autorizado');
			default: break;
		}
		const r = communityUser(auth.id, communityId.community);
		res.status(200).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message
		});
	};
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
			err: err.message
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
			err: err.message
		});
	}
});

// Alterar comunidade
// Se o id do usuario logado for igual do criador deve deixar alterar, se não, lançar um erro
server.put("/comunidade", async (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		const community = req.body;
		switch (true) {
			case !header || !auth || !(await communityOwner(auth.id, community.id)): throw new Error('Erro de autenticação');
			case !community.id || !community.id.trim(): throw new Error("O grupo precisa de um ID");
			case !community.name || !community.name.trim(): throw new Error("O grupo precisa de um nome");
			case !community.descricao || !community.descricao.trim(): throw new Error("O grupo precisa de uma descrição");
			default: break;
		};
		const r = await communityEdit(community);
		res.status(201).send('Editada com sucesso');
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

//Consultar comunidade por nome/id
server.get("/comunidade", async (req, res) => {
	try {
		const community = req.query.community;
		if (community[0] == '#') {
			const r = await communityId(community.substr(1, community.length));
			res.status(200).send(r);
		} else {
			const r = await communityName(community);
			res.status(200).send(r);
		};
	} catch (err) {
		res.status(401).send({
			err: err.message
		});
	}
});


//Consultar todas comunidades
server.get("/comunidades", async (req, res) => {
	try {
		const r = await communitiesGet();
		res.status(200).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message
		});
	}
});

// Promover usuario à administrador
server.put("/comunidade/administrador", async (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		const user = req.body;
		switch (true) {
			case !header || !auth || !(await communityOwner(auth.id, user.comunidade)): throw new Error("Erro de autenticação");
			case !user.id || !(await communityUserID(user.id)): throw new Error("Usuario não esta na comunidade");
		};

		const r = await communityAdmin(user.id);
		res.status(202).send(`Usúario de id ${user.id} foi promovido à administrador`);
	} catch (err) {
		res.status(401).send({
			err: err.message
		});
	};
});

// Procurar usúario na comunidade
server.get("/comunidade/usuario", async (req, res) => {
	try {
		const user = req.body;
		const r = await communityUserID(user.id, user.comunidade);
		res.status(202).send(r);
	} catch (err) {
		res.status(401).send({
			err: err.message
		});
	};
});


export default server;

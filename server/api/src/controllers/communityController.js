import { Router } from 'express';
import multer from 'multer';
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
	listarCanais,
	communityDenuncia,
	communityUserDelete,
	communityDelete,
	communityUsers,
	communityCanalCreate,
	salvarMensagemComunidade,
	consultarCanalMensagens,
	communityBanner,
	inserirCanal,
	excluirCanal,
	topCommunities,
	communityUserBanned,
	communityUserBan,
	communitySearchMessages,
} from '../repositories/comunnityRepository.js';
import { userIdSearch } from '../repositories/userRepository.js';
import { verifyToken } from '../utils/authUtils.js';
import { emailTest } from '../utils/expressionTest.js';

const server = Router();
const communityImg = multer({ dest: 'storage/communities' });

//Adicionar usuario na comunidade
server.post('/comunidade/:id/usuario', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || !(await communityId(id)))
			throw new Error('Essa comunidade não existe');

		const ban = await communityUserBanned(decoded.id, id);
		if (ban) {
			const data = new Date(ban.dataBanimento);
			const formatado =
				data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
			throw new Error(
				`Você foi banido dessa comunidade em ${formatado}. \nMotivo: ${ban.motivo}.`
			);
		}

		const exists = await communityUserID(decoded.id, id);
		if (exists) throw new Error('Você já está nessa comunidade');

		const answer = await communityUserAdd(decoded.id, id);
		if (answer < 1) throw new Error('Não foi possível entrar na comunidade');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Criar comunidade
server.post('/comunidade', async (req, res) => {
	try {
		const community = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!community.nome ||
			!community.nome.trim() ||
			community.nome.length > 50
		)
			throw new Error('O nome inserido é inválido');
		else if (community.descricao.length > 700)
			throw new Error('A descrição inserida é inválida');

		const answer = await communityCreate(decoded.id, community);
		if (!answer) throw new Error('Não foi possível criar a comunidade');

		res.status(201).send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Consultar as maiores comunidade
server.get('/comunidade/top', async (req, res) => {
	try {
		let { nome, not } = req.query;
		if (!nome) nome = '';
		if (!not) not = 0;
		const comunidades = await topCommunities(nome, not);
		res.send(comunidades);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Enviar imagem
server.put('/comunidade/imagem/:id', communityImg.single('imagem'), async (req, res) => {
	try {
		const token = req.header('x-access-token');
		const id = Number(req.params.id);
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!req.file) throw new Error('Arquivo não encontrado');
		else if (!(await communityId(id))) throw new Error('Comunidade não encontrada');
		else if (!(await communityOwner(decoded.id, id)))
			throw new Error('O usuário não possui permissão');

		const img = req.file.path;
		const answer = await communityImage(id, img);
		if (answer < 1) throw new Error('Não foi possível alterar a imagem');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Enviar banner
server.put('/comunidade/banner/:id', communityImg.single('imagem'), async (req, res) => {
	try {
		const token = req.header('x-access-token');
		const id = Number(req.params.id);
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!req.file) throw new Error('Arquivo não encontrado');
		else if (!(await communityId(id))) throw new Error('Comunidade não encontrada');
		else if (!(await communityOwner(decoded.id, id)))
			throw new Error('O usuário não possui permissão');

		const img = req.file.path;
		const answer = await communityBanner(id, img);
		if (answer < 1) throw new Error('Não foi possível alterar a imagem');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Alterar comunidade
// Se o id do usuario logado for igual do criador deve deixar alterar, se não, lançar um erro
server.put('/comunidade/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const community = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(await userIdSearch(decoded.id)) ||
			!(await communityOwner(decoded.id, community.id))
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || !(await communityId(id)))
			throw new Error('Comunidade não encontrada');
		else if (!community.nome || !community.nome.trim())
			throw new Error('O nome inserido é inválido');
		else if (community.publica == undefined)
			throw new Error('Insira a visibilidade da comunidade');

		community.id = id;
		const r = await communityEdit(community, decoded.id);
		if (r < 1) throw new Error('Não foi possível fazer as alterações na comunidade');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

//Consultar comunidade por nome
server.get('/comunidade', async (req, res) => {
	try {
		const { nome } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const r = await communityName(nome);
		res.send(r);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

//Consultar comunidade por ID
server.get('/comunidade/:id', async (req, res) => {
	try {
		const community = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!community) throw new Error('O ID inserido é inválido');

		const r = await communityId(community);
		if (!r) throw new Error('Não encontrado');
		res.send(r);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Promover usuario à administrador
server.put('/comunidade/admin/usuario', async (req, res) => {
	try {
		const { situacao, id, comunidade } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(
				(await userIdSearch(decoded.id)) ||
				!(await communityOwner(decoded.id, community.id))
			)
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!(await communityId(comunidade)))
			throw new Error('Comunidade não encontrada');
		else if (!id || !situacao || !comunidade || !['A', 'N'].includes(situacao))
			throw new Error('Campos inválidos');
		else if (!(await communityUserID(id, comunidade)))
			throw new Error('Usuário não encontrado');

		const answer = await communityAdmin(id, situacao[0] === 'A');
		if (answer < 1)
			throw new Error(
				'Não foi possível alterar as permissões do usuário administrador'
			);
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Procurar usúario na comunidade por id/nome
server.get('/comunidade/:id/usuario/:user', async (req, res) => {
	try {
		const comunidade = Number(req.params.id);
		const usuario = req.params.user;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!comunidade || !(await communityId(comunidade)))
			throw new Error('Comunidade não existente');

		if (isNaN(usuario)) {
			const r = await communityUsername(usuario, comunidade);
			res.send(r);
		} else if (Number(usuario)) {
			const r = await communityUserID(Number(usuario), comunidade);
			res.send(r);
		}
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Criar canal
server.post('/comunidade/canal', async (req, res) => {
	try {
		const canal = req.body;
		const community = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const r = await communityCanalCreate(community, canal);
		if (r < 1) throw new Error('Não foi possível criar o canal');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Listar canais
server.get('/comunidade/canal/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || isNaN(id)) throw new Error('O ID inserido é inválido');

		const r = await listarCanais(id);
		res.send(r);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Denunciar comunidade
server.post('/comunidade/:id/denuncia', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const user = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || isNaN(id) || !(await communityId(id)))
			throw new Error('Comunidade não encontrada');
		else if (!emailTest(user.email)) throw new Error('o email inserido é inválido');
		else if (user.motivo == undefined || !user.motivo.trim())
			throw new Error('O motivo inserido é inválido');
		else if (user.motivo.length > 500)
			throw new Error('Motivo excede a quantidade de caracteres permitida');

		const answer = await communityDenuncia(decoded.id, user.email, id, user.motivo);
		if (answer < 1) throw new Error('Não foi possível fazer a denúncia');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Sair da comunidade
server.delete('/comunidade/:comunidade/usuario/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const comunidade = Number(req.params.comunidade);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || !comunidade || !(await communityUserID(id, comunidade)))
			throw new Error('Você não está nessa comunidade');

		const answer = await communityUserDelete(id, comunidade);
		if (answer < 1) throw new Error('Não foi possível sair da comunidade');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Excluir comunidade
server.delete('/comunidade/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!(await communityUserID(decoded.id, id)) ||
			!(await communityOwner(decoded.id, id)) ||
			!(await communityId(id))
		)
			throw new Error('Não autorizado');

		const del = await communityDelete(id);
		if (del < 1) throw new Error('Não foi possível excluir a comunidade');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Consultar todos usuarios da comunidade
server.get('/comunidade/:id/usuarios', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!(await communityUserID(decoded.id, id)) ||
			!(await communityOwner(decoded.id, id)) ||
			!(await communityId(id))
		)
			throw new Error('Não autorizado');

		const users = await communityUsers(id);
		res.send(users);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Inserir mensagem em canal
server.post('/comunidade/:comunidade/canal/:canal', async (req, res) => {
	try {
		const comunidade = Number(req.params.comunidade);
		const canal = Number(req.params.canal);
		const community = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(await userIdSearch(decoded.id)) ||
			!(await communityUserID(decoded.id, comunidade))
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!community.conteudo ||
			!community.conteudo.trim() ||
			community.conteudo.length > 2500
		)
			throw new Error();

		const userId = await communityUserID(decoded.id, comunidade);
		if (!userId) throw new Error('O usuário não está na comunidade');

		const answer = await salvarMensagemComunidade(
			userId.id,
			canal,
			community.conteudo
		);
		if (!answer) throw new Error();

		res.send({ id: answer });
	} catch (err) {
		res.status(400).send({
			err: 'Não foi possível inserir a mensagem',
		});
	}
});

// Consultar mensagens de um canal
server.get('/comunidade/:comunidade/canal/:canal/mensagens/:lastId', async (req, res) => {
	try {
		const comunidade = Number(req.params.comunidade);
		const canal = Number(req.params.canal);
		let lastId = Number(req.params.lastId);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(await userIdSearch(decoded.id)) ||
			!(await communityUserID(decoded.id, comunidade))
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!lastId) lastId = null;

		const answer = await consultarCanalMensagens(canal, lastId);
		if (!answer) throw new Error('Não foi possível realizar as consultas');

		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Criar um canal
server.post('/comunidade/:id/canal', async (req, res) => {
	try {
		const comunidade = Number(req.params.id);
		const { nome } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(await communityId(comunidade)) ||
			!(await userIdSearch(decoded.id)) ||
			!(await communityUserID(decoded.id, comunidade)) ||
			!(await communityOwner(decoded.id, comunidade))
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!nome || !nome.trim() || nome.length > 20)
			throw new Error('O nome do canal inserido é inválido');

		const answer = await inserirCanal(comunidade, nome);
		if (answer < 1) throw new Error('Não foi possível criar o canal');

		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Excluir canal
server.delete('/comunidade/:id/canal/:canal', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const canal = Number(req.params.canal);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!(await communityUserID(decoded.id, id)) ||
			!(await communityOwner(decoded.id, id)) ||
			!(await communityId(id))
		)
			throw new Error('Não autorizado');

		const del = await excluirCanal(canal);
		if (del < 1) throw new Error('Não foi possível excluir esse canal');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Consultar usuarios da comunidade por nome
server.get('/comunidade/:id/usuario', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const { nome } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (
			!(await communityUserID(decoded.id, id)) ||
			!(await communityOwner(decoded.id, id)) ||
			!(await communityId(id))
		)
			throw new Error('Não autorizado');

		const users = await communityUsername(nome, id);
		res.send(users);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.post('/comunidade/:comunidade/usuario/:usuario/banimento', async (req, res) => {
	try {
		const comunidade = Number(req.params.comunidade);
		const usuarioCom = Number(req.params.usuario);
		let { motivo } = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (
			!decoded ||
			!(await communityId(comunidade)) ||
			!(await userIdSearch(decoded.id)) ||
			!(await communityUserID(decoded.id, comunidade)) ||
			!(await communityOwner(decoded.id, comunidade))
		) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!comunidade || !usuarioCom)
			throw new Error('Não foi possível concluir a operação');

		if (!motivo || !motivo.trim()) motivo = '';
		const answer = await communityUserBan(usuarioCom, comunidade, motivo);
		if (answer < 1) throw new Error('Não foi possível banir o usuário');

		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});


// procurar mensagem
server.get('/comunidade/:comunidade/mensagens', async (req, res) => {
	try {
		const comunidade = Number(req.params.comunidade);
		const { msg } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const users = await communitySearchMessages(comunidade, msg);
		res.send(users);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});



export default server;

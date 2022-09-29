import { Router } from "express";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import {
	aceitarAmizade,
	amigosConsulta,
	recusarAmizade,
	removerAmizade,
	solicitarAmizade,
	userCadastro,
	userDelete,
	userEdit,
	userIdSearch,
	userImg,
	userLogin,
	userEmailSearch,
	userNameSearch,
	userAlterarPassword,
	codeAleatorio,
	userCodeSearch,
	userIDandEmailSearch,
} from "../repositories/userRepository.js";
import { emailTest } from "../utils/expressionTest.js";
import multer from "multer";
import "dotenv/config";
import codeAl from "../services/services.js";

const code = codeAl();


const server = Router();
const usuarioImg = multer({ dest: "storage/users" });

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
		const search = await userEmailSearch(user.email);
		if (search[0]) throw new Error("Este email já está em uso");
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
			id: answer.id,
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
server.post("/usuario/recuperar", async (req, res) => {
	try {
		const {email} = req.query;
		const answer = await userIDandEmailSearch(email);
		const r = await codeAleatorio(code)
		if (!answer) throw new Error("Email incorreto");

		const token = jwt.sign(
			{
				id: answer.id,
				email: answer.email,
			},
			process.env.JWT_KEY,
			{
				expiresIn: "10m",
			}
		);

		const id = answer.id




		switch (true) {
			case !emailTest(email):
				throw new Error("O email inserido é inválido");
			case !email || !email.trim():
				throw new Error("O email inserida é inválida");
			default:
				break;
		}
		
		if (answer < 1) throw new Error("Email não foi encontrado");
		// if (search[0]) throw new Error("E-mail enviado");
		else {
			
			var transport = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				auth: {
				  user: process.env.EMAIL,
				  pass: process.env.PASS
				  //   kspaeiiketaddqbt
				},
				tls: {
					rejectUnauthorized: false
				}
			});
			
			let message = {
				from: "noreply.umbrellacontact@gmail.com",
				to: `${email}`,
				subject: "Seu codigo de recuperação de senha",
				text: "Recuperar senha!",
				html: `<h2>Valide seu codigo para recuperação de senha</h2><br>
				<center><h5>http://localhost:3000/alterar-senha?id=${id}&token=${token}<h1/><center/> <br><br>
				<p>Nunca informe seus dados de acesso para outra pessoa.</p>`
			};
			
			transport.sendMail(message, (err) =>  {
				if(err)  {
					console.log(err)
					return
				}
				
			});
			console.log("E-mail enviado");
			res.send('link enviado para o email');
			



		}
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// codigo

server.get("/alterar-senha?id&token", async (req, res) => {
	
	try {
		const {id, token} = req.params

		if(id != answer.id) {
			res.send('invalid')
		}

		const secret = process.env.JWT_KEY + answer.password
		try {
			const payload = jwt.verify(token, secret)
			res.render('alterar-senha', {email: answer.email})
		} catch (err) {
			console.log(err.message);
			res.send(err.message)
		}


		
		
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// ALTERAR SENHA 

server.put("/alterar-senha/:id/:token", async (req, res) => {
	try {
		const user = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !user.senha || !user.senha.trim() || user.senha.length > 50:
				throw new Error("A Senha é obrigatório");
			default:
				break;
		}
		user.id = auth.id;
		const answer = await userAlterarPassword(user);
		if (answer < 1) throw new Error("Não foi possível alterar a senha");
		res.status(202).send();
	} catch (err) {
		console.log(err);
		res.status(400).send({
			err: "Um erro ocorreu",
		});
	}
});


// Alterar perfil
server.put("/usuario", async (req, res) => {
	try {
		const user = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !user.nome || !user.nome.trim() || user.nome.length > 50:
				throw new Error("O nome é obrigatório");
			default:
				break;
		}
		user.id = auth.id;
		const answer = await userEdit(user);
		if (answer < 1) throw new Error("Não foi possível alterar o perfil");
		res.status(202).send();
	} catch (err) {
		res.status(400).send({
			err: "Um erro ocorreu",
		});
	}
});

// Enviar imagem
server.put("/usuario/imagem", usuarioImg.single("imagem"), async (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !req.file:
				throw new Error("Arquivo não encontrado");
			default:
				break;
		}

		const img = req.file.path;
		const answer = await userImg(img, auth.id);
		if (answer < 1) throw new Error("Não foi possível alterar a imagem");

		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Deletar conta
server.delete("/usuario", async (req, res) => {
	try {
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		const email = auth.email;
		const answer = await userDelete(email);
		if (answer < 1) throw new Error("Um erro ocorreu");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Procurar usuários por nome
server.get("/usuario", async (req, res) => {
	try {
		const { nome } = req.query;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		const answer = await userNameSearch(nome);
		if (answer < 1) throw new Error("Nenhum usuário foi encontrado");
		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Procurar usuário por id
server.get("/usuario/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		if (!(await userIdSearch(id))) throw new Error("Usuário não encontrado");
		const answer = await userIdSearch(id);
		if (answer < 1) throw new Error("Nenhum usuário foi encontrado");
		res.send(answer[0]);
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
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		if (!(await userIdSearch(id))) throw new Error("Usuário não encontrado");
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
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !userIdSearch(user.usuarioSolicitado):
				throw new Error("Usuário não encontrado");
			default:
				break;
		}
		user.id = auth.id;
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
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)):
				throw new Error("Falha na autenticação");
			case !id || !situacao || !["A", "N"].includes(situacao):
				throw new Error("Campos inválidos");
			default:
				break;
		}
		user.id = auth.id;
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
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		switch (true) {
			case !header || !auth || !(await userIdSearch(auth.id)[0]):
				throw new Error("Falha na autenticação");
			case !id:
				throw new Error("Campos inválidos");
		}
		user.id = auth.id;
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

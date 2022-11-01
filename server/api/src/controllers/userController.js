import { Router } from 'express';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import {
	aceitarAmizade,
	amigosConsulta,
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
	userComunidadesConsulta,
	userDenuncia,
	consultarIdAmizade,
	pedidosAmizadeConsulta,
	verificarPedidoFeito,
	verificarAmizade,
	userIDandEmailSearch,
	userAlterarPassword,
	userEditEmail,
	iniciarConversa,
} from '../repositories/userRepository.js';
import { emailTest, nameTest } from '../utils/expressionTest.js';
import { verifyToken } from '../utils/authUtils.js';
import multer from 'multer';

const server = Router();
const usuarioImg = multer({ dest: 'storage/users' });

// Cadastro
server.post('/usuario', async (req, res) => {
	try {
		const user = req.body;

		if (!nameTest(user.nome)) throw new Error('O nome de usuário inserido é inválido');
		else if (!emailTest(user.email)) throw new Error('O email inserido é inválido');
		else if (!user.senha || !user.senha.trim()) throw new Error('A senha é obrigatória');
		else if (!user.nascimento || new Date().getFullYear() - new Date(user.nascimento).getFullYear() < 13) throw new Error('A idade mínima permitida é 13 anos');

		const search = await userEmailSearch(user.email);
		if (search) throw new Error('Este email já está em uso');

		user.senha = sha256(user.senha);
		const answer = await userCadastro(user);
		if (answer < 1) throw new Error('Não foi possível realizar o cadastro');
		res.status(201).send();
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Login
server.post('/usuario/login', async (req, res) => {
	try {
		const user = req.body;

		if (!emailTest(user.email)) throw new Error('O email inserido é inválido');
		else if (!user.senha || !user.senha.trim()) throw new Error('A senha inserida é inválida');

		user.senha = sha256(user.senha);
		const answer = await userLogin(user);
		if (!answer) throw new Error('Não foi possível fazer login');

		const token = jwt.sign(
			{
				id: answer.id,
				email: answer.email,
			},
			process.env.JWT_KEY,
			{
				expiresIn: '3d',
			}
		);

		res.status(202).send({
			id: answer.id,
			nome: answer.nome,
			email: answer.email,
			token,
		});
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Procurar usuário
server.get('/usuario', async (req, res) => {
	try {
		const { email, id } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!email && !id) throw new Error('Campos incompletos');

		const answer = email ? await userEmailSearch(email) : await userIdSearch(Number(id));
		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Alterar perfil
server.put('/usuario', async (req, res) => {
	try {
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
		} else if (!nameTest(user.nome)) {
			throw new Error('O nome de usuário inserido é inválido');
		}

		user.id = decoded.id;
		const answer = await userEdit(user);
		if (answer < 1) throw new Error('Não foi possível alterar o perfil de usuário');
		res.status(202).send();
	} catch (err) {
		res.status(400).send({
			err: 'Um erro ocorreu',
		});
	}
});

// Enviar imagem
server.put('/usuario/imagem', usuarioImg.single('imagem'), async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!req.file) throw new Error('Arquivo não encontrado');

		const img = req.file.path;
		const answer = await userImg(img, decoded.id);
		if (answer < 1) throw new Error('Não foi possível alterar a imagem');

		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Deletar conta
server.delete('/usuario', async (req, res) => {
	try {
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

		const answer = await userDelete(decoded.email);
		if (answer < 1) throw new Error('Um erro ocorreu');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Procurar usuários por nome
server.get('/usuarios', async (req, res) => {
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

		const answer = await userNameSearch(nome);
		if (answer < 1) throw new Error('Nenhum usuário foi encontrado');
		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Listar amigos
server.get('/usuario/:id/amizades', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const token = req.header('x-access-token');
		if (!token) throw new Error('Falha na autenticação');
		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) throw new Error('Falha na autenticação');
		if (!(await userIdSearch(id))) throw new Error('Usuário não encontrado');
		const answer = await amigosConsulta(id);
		res.send(answer);
	} catch (err) {
		res.status(401).send({
			err: err.message,
		});
	}
});

// Listar comunidades do usuário
server.get('/usuario/:id/comunidades', async (req, res) => {
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
		}

		if (!(await userIdSearch(id))) {
			res.status(404).send({
				err: 'Usuário não encontrado',
			});
			return;
		}

		const answer = await userComunidadesConsulta(id);
		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Pedir em amizade
server.post('/usuario/amizade', async (req, res) => {
	try {
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
		} else if (!userIdSearch(user.usuarioSolicitado)) {
			res.status(404).send({
				err: 'Usuário não encontrado',
			});
		}

		user.id = decoded.id;
		if (await verificarPedidoFeito(user.id, user.usuarioSolicitado)) throw new Error('Um pedido de amizade já foi enviado');
		if (await verificarAmizade(user.id, user.usuarioSolicitado)) throw new Error('Você já é amigo desse usuário');

		const answer = await solicitarAmizade(user.id, user.usuarioSolicitado);
		if (answer < 1) throw new Error('Um erro ocorreu');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Aceitar / recusar pedido de amizade
server.put('/usuario/amizade', async (req, res) => {
	try {
		const { situacao, id } = req.query;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		};

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!id || !situacao || !['A', 'N'].includes(situacao)) throw new Error('Campos inválidos');

		let answer;
		switch (situacao) {
			case 'A':
				answer = await aceitarAmizade(Number(id), decoded.id);
				const iniciarChat = await iniciarConversa(decoded.id, Number(id));
				break;
			case 'N':
				answer = await removerAmizade(Number(id));
				break;
			default:
				break;
		}

		if (answer < 1) throw new Error(`Não foi possível ${situacao == 'N' ? 'rejeitar' : 'aceitar'} a amizade`);
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Remover amizade
server.delete('/usuario/amizade', async (req, res) => {
	try {
		const query = req.query;
		let id = Number(query.id);
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await userIdSearch(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (id === undefined || !query.type) {
			throw new Error('Campos inválidos');
		}

		if (query.type === 'user') {
			try {
				id = await consultarIdAmizade(id, decoded.id);
			} catch (err) {
				throw new Error('Essa amizade não existe');
			}
		}

		const answer = await removerAmizade(id, decoded.id);
		if (answer < 1) throw new Error('Não foi possível desfazer a amizade');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Denunciar usuário
server.post('/usuario/:id/denuncia', async (req, res) => {
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
		} else if (!id || !(await userIdSearch(id))) throw new Error('Usuário não encontrado');
		else if (!emailTest(user.email)) throw new Error('o email inserido é inválido');
		else if (user.motivo == undefined || !user.motivo.trim()) throw new Error('O motivo é obrigatório');
		else if (user.motivo.length > 500) throw new Error('Motivo excede a quantidade de caracteres permitida');

		const answer = await userDenuncia(decoded.id, user.email, id, user.motivo);
		if (answer < 1) throw new Error('Não foi possível fazer a denúncia');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

// Listar pedidos de amizade
server.get('/usuario/amizades/pedidos', async (req, res) => {
	try {
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

		const answer = await pedidosAmizadeConsulta(decoded.id);
		res.send(answer);
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

//recuperar senha
server.post("/usuario/recuperar", async (req, res) => {
	try {
	  const { email } = req.query;
	  const answer = await userIDandEmailSearch(email);
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
  
	  const id = answer.id;
  
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
			pass: process.env.PASS,
			//   kspaeiiketaddqbt
		  },
		  tls: {
			rejectUnauthorized: false,
		  },
		});
		const link = `http://localhost:3000/alterar-senha?id=${id}&token=${token}`;
  
		let message = {
		  from: "noreply.umbrellacontact@gmail.com",
		  to: `${email}`,
		  subject: "Seu codigo de recuperação de senha",
		  text: `
  <!doctype html>
  <html lang="en-US">
  <head>
	  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	  <title>Reset Password Email Template</title>
	  <meta name="description" content="Reset Password Email Template.">
	  <style type="text/css">
		  a:hover {text-decoration: underline !important;}
	  </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
	  <!--100% body table-->
	  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
		  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
		  <tr>
			  <td>
				  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
					  align="center" cellpadding="0" cellspacing="0">
					  
					  <tr>
						  <td>
							  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
								  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
								  <tr>
									  <td style="height:40px;">&nbsp;</td>
								  </tr>
								  <tr>
									  <td style="padding:0 35px;">
										  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Você solicitou a redefinição de sua senha</h1>
										  <span
											  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
										  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
										  Não podemos simplesmente enviar sua senha antiga. Um link exclusivo para redefinir seu
										  senha foi gerada para você. Para redefinir sua senha, clique no botão
										  seguinte link e siga as instruções.
										  </p>
										  <a href=${link}
											  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
											  Password</a>
									  </td>
								  </tr>
								  <tr>
									  <td style="height:40px;">&nbsp;</td>
								  </tr>
							  </table>
						  </td>
					 
				  </table>
			  </td>
		  </tr>
	  </table>
	  <!--/100% body table-->
  </body>
  </html>`,
			  html: `
  <!doctype html>
  <html lang="en-US">
  <head>
	  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	  <title>Reset Password Email Template</title>
	  <meta name="description" content="Reset Password Email Template.">
	  <style type="text/css">
		  a:hover {text-decoration: underline !important;}
	  </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
	  <!--100% body table-->
	  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
		  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
		  <tr>
			  <td>
				  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
					  align="center" cellpadding="0" cellspacing="0">
					 
					  <tr>
						  <td>
							  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
								  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
								  <tr>
									  <td style="height:40px;">&nbsp;</td>
								  </tr>
								  <tr>
									  <td style="padding:0 35px;">
										  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
										  Você solicitou a redefinição de sua senha</h1>
										  <span
											  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
										  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
										  Não podemos simplesmente enviar sua senha antiga. Um link exclusivo para redefinir seu
										  senha foi gerada para você. Para redefinir sua senha, clique no botão
										  seguinte link e siga as instruções.
										  </p>
										  <a href="${link}"
											  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
											  Password</a>
									  </td>
								  </tr>
								  <tr>
									  <td style="height:40px;">&nbsp;</td>
								  </tr>
							  </table>
						  </td>
					 
				  </table>
			  </td>
		  </tr>
	  </table>
	  <!--/100% body table-->
  </body>
  </html>`,
		};
  
		transport.sendMail(message, (err) => {
		  if (err) {
			console.log(err);
			return;
		  }
		});
		console.log("E-mail enviado");
		res.send("link enviado para o email");
	  }
	} catch (err) {
	  res.status(400).send({
		err: err.message,
	  });
	}
});


server.put("/alterar-senha", async (req, res) => {
	try {
	  let { senha } = req.body;

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
  
	  senha = sha256(senha);
	  const answer = await userAlterarPassword(senha, decoded.id);
	  if (answer < 1) throw new Error("Não foi possível alterar a senha");
	  res.status(202).send();
	} catch (err) {
	  console.log(err);
	  res.status(400).send({
		err: err.message,
	  });
	}
});

// Alterar email
server.put("/email-novo", async (req, res) => {
	try {
		const {email} = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if(!emailTest(email)) throw new Error ("Email incorreto");
		switch (true) {
			case !header || !auth:
				throw new Error("Falha na autenticação");
        	case !email || !email.trim() || email.length > 50:
          		throw new Error("O email é obrigatório");
			case !emailTest(email):
				throw new Error("email invalido");
			default:
				break;

		}
		
		const answer = await userEditEmail(email, auth.id);
		if (!answer) throw new Error("Não foi possível alterar o email de usuário");
		res.status(202).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});


// Procurar email
server.get("/alterar-email", async (req, res) => {
	try {
		const { email } = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		const answer = email ? await userEmailSearch(email) : await userIdSearch(Number(id));

		if (!answer) throw new Error("Usuário não encontrado");
		res.send(answer);
	} catch (err) {
		res.status(404).send({
			err: err.message,
		});
	}
});

server.post("/usuario/mensagem", async (req, res) => {
	try {
		const { mensagem } = req.body;
		const header = req.header("x-access-token");
		const auth = jwt.decode(header);
		if (!header || !auth || !(await userIdSearch(auth.id))) throw new Error("Falha na autenticação");
		const enviarMsg = await enviarMensagem(mensagem, auth.id);
		res.send(answer);
	} catch (err) {
		res.status(404).send({
			err: err.message,
		});
	}
});

export default server
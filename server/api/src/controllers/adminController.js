import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';
import { adminCadastro, adminDelete, adminLogin, adminSearch, rootVerificar, searchMonthlyUsers, searchCommunites, listReportedComunnities, listReportedUsers, searchReports, deleteUser, deleteComunnity, searchReportedComunnities, searchReportedUsers } from '../repositories/adminRepository.js';
import { cpfTest, emailTest, telefoneTest } from '../utils/expressionTest.js';
import { verifyToken } from '../utils/authUtils.js';
import { userIdSearch } from '../repositories/userRepository.js';

const server = Router();

server.post('/admin/login', async (req, res) => {
	try {
		const admin = req.body;

		if (!emailTest(admin.email.trim())) throw new Error('O email inserido é inválido');
		else if (!admin.senha || !admin.senha.trim()) throw new Error('A senha é obrigatória');

		const search = await adminSearch(admin.email);
		if (!search[0]) throw new Error('Um erro ocorreu');

		admin.senha = sha256(admin.senha);
		const answer = await adminLogin(admin);
		if (!answer) throw new Error('Não foi possível realizar o login');

		const token = jwt.sign(
			{
				id: answer.id,
				email: answer.email,
			},
			process.env.JWT_KEY,
			{
				expiresIn: '1h',
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

server.post('/admin', async (req, res) => {
	try {
		const admin = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}
		admin.senha = sha256(admin.senha);
		const answer = await adminCadastro(admin);
		if (answer < 1) throw new Error('Não foi possível realizar o cadastro');
		res.status(201).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.delete('/admin', async (req, res) => {
	try {
		const admin = req.body;
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} else if (!emailTest(admin.email)) throw new Error('Email inválido');
		else if (!(await adminSearch(admin.email)[0])) throw new Error('Usuário não encontrado');

		const answer = adminDelete(admin.email);
		if (answer < 1) throw new Error('Não foi possível deletar a conta');
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.get('/admin/estatisticas/usuarios', async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} const r = await searchMonthlyUsers();
		res.send(r);
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.get('/admin/estatisticas/comunidades', async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} const r = await searchCommunites();
		res.send(r);
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});


server.get('/admin/estatisticas/reports', async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		}

		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) {
			res.status(401).send({ err: 'Falha na autenticação' });
			return;
		} const r = await searchReports();
		res.send(r);
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.get('/admin/denuncias/comunidades', async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) throw new Error('Não autorizado!')
		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) throw new Error('Não autorizado');
		const r = await listReportedComunnities();
		res.send(r);
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.get('/admin/denuncias/usuarios', async (req, res) => {
	try {
		const token = req.header('x-access-token');
		if (!token) throw new Error('Não autorizado!')
		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) throw new Error('Não autorizado');
		const r = await listReportedUsers();
		res.send(r);
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.delete('/admin/denuncias/usuarios/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const token = req.header('x-access-token');
		if (!token) throw new Error('Não autorizado!')
		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) throw new Error('Não autorizado');
		const r = await deleteUser(id);
		if(r < 1) res.status(401).send("Não foi possível deletar a conta");
		else res.send("Conta deletada com sucesso");
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.delete('/admin/denuncias/comunidades/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const token = req.header('x-access-token');
		if (!token) throw new Error('Não autorizado!')
		const decoded = verifyToken(token);
		if (!decoded || !(await rootVerificar(decoded.id))) throw new Error('Não autorizado');
		const r = await deleteComunnity(id);
		if(r < 1) res.status(401).send("Não foi possível deletar a conta");
		else res.send("Conta deletada com sucesso");
	}
	catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

export default server;
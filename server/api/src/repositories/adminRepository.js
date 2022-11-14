import con from './connection.js';

export async function adminLogin(admin) {
	const command = `
        select  
			id_admin id,
			nm_admin nome,
			ds_email email
		from  tb_admin
        where  ds_email = ? and ds_senha = ? `;
	const [answer] = await con.query(command, [admin.email, admin.senha]);
	return answer[0];
}

export async function adminCadastro(admin) {
	const command = `
        insert into tb_admin (nm_admin, ds_email, ds_senha, dt_nascimento, ds_endereco, ds_telefone, ds_cpf, bt_root)
        values (?, ?, ?, ?, ?, ?, ?, ?) `;
	const [answer] = await con.query(command, [admin.nome, admin.email, admin.senha, admin.nascimento, admin.endereco, admin.telefone, admin.cpf, 1]);
	return answer.affectedRows;
}

export async function rootVerificar(id) {
	const command = `
        select
			nm_admin nome,
			ds_email email,
			ds_endereco endereco,
			dt_nascimento nacimento,
			ds_telefone telefone,
			ds_cpf cpf
		from tb_admin where id_admin = ? and bt_root = 1 `;
	const [answer] = await con.query(command, [id]);
	return answer[0];
}

export async function adminSearch(email) {
	const command = `
        select
			nm_admin nome,
			ds_email email,
			ds_endereco endereco,
			dt_nascimento nacimento,
			ds_telefone telefone,
			ds_cpf cpf
		from tb_admin where ds_email = ?`;
	const [answer] = await con.query(command, [email]);
	return answer;
}

export async function adminDelete(email) {
	const command = `
		delete from tb_admin where ds_email = ? `;
	const [answer] = await con.query(command, [email]);
	return answer.affectedRows;
}

export async function searchMonthlyUsers() {
	const command = `
		select count(*) as usuariosMensais from tb_usuario
             where dt_criacao like "%-11-%"`;
	const [answer] = await con.query(command)
	return answer;
}

export async function searchCommunites() {
	const command = `
		select count(*) as comunidadesCriadas from tb_comunidade`;
	const [answer] = await con.query(command)
	return answer;
}
export async function searchReports() {
	const command = `
		select count(*) as usuariosReportados from tb_usuario_report`;
	const [answer] = await con.query(command)
	return answer;
};

export async function listReportedComunnities() {
	const command = `
		SELECT 	id_comunidade_report     				idReport,
				id_usuario								denunciante,
				tb_comunidade_report.id_comunidade		idComunidade,
				tb_comunidade.nm_comunidade				nome,
				tb_comunidade.img_comunidade			imagem,
				ds_report								motivo,
				ds_email								emailDenunciante,
				dt_report								data
		FROM tb_comunidade_report
		INNER JOIN tb_comunidade on tb_comunidade_report.id_comunidade = tb_comunidade.id_comunidade;`;
	const [answer] = await con.query(command);
	return answer;
};

export async function listReportedUsers() {
	const command = `
	SELECT id_report     				idReport,
	   tb_usuario_report.id_usuario		denunciante,
       tb_usuario.nm_usuario    		nome,
       tb_usuario.img_usuario			imagem,
       id_usuario_reportado				denunciado,
       ds_report						motivo,
       tb_usuario_report.ds_email		emailDenunciante,
       dt_report						data
	FROM tb_usuario_report
    INNER JOIN tb_usuario ON tb_usuario_report.id_usuario_reportado = tb_usuario.id_usuario;`;
	const [answer] = await con.query(command);
	return answer;
};

export async function deleteUser(id) {
	const command = `
	DELETE FROM tb_usuario
	WHERE id_usuario = ?;`;
	const [answer] = await con.query(command, [id]);
	return answer.affectedRows;
};

export async function deleteComunnity(id) {
	const command = `
		delete from tb_comunidade_canal 
		where id_comunidade = ? ;

		delete from tb_comunidade
		where id_comunidade = ? `;
	const [answer] = await con.query(command, [id, id]);
	return answer.affectedRows;
};

export async function searchReportedUsers(nome) {
	const command = `
		SELECT id_report     					idReport,
			tb_usuario_report.id_usuario		denunciante,
			tb_usuario.nm_usuario   			nome,
			tb_usuario.img_usuario				imagem,
			tb_usuario.img_usuario				imagem,
			id_usuario_reportado				denunciado,
			ds_report							motivo,
			tb_usuario_report.ds_email			emailDenunciante,
			dt_report							data
		FROM tb_usuario_report
		INNER JOIN tb_usuario ON tb_usuario_report.id_usuario_reportado = tb_usuario.id_usuario
		WHERE tb_usuario.nm_usuario like '%${nome}%';`;

	const [answer] = await con.query(command);
	return answer;
};

export async function searchReportedComunnities(nome) {
	const command = `
	SELECT 	id_comunidade_report     			idReport,
		id_usuario								denunciante,
		tb_comunidade_report.id_comunidade		idComunidade,
		tb_comunidade.nm_comunidade				nome,
		tb_comunidade.img_comunidade			imagem,
		ds_report								motivo,
		ds_email								emailDenunciante,
		dt_report								data
	FROM tb_comunidade_report
	INNER JOIN tb_comunidade ON tb_comunidade_report.id_comunidade = tb_comunidade.id_comunidade
	WHERE tb_comunidade.nm_comunidade like '%${nome}%';`;

	const [answer] = await con.query(command);
	return answer;
};
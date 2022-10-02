import con from "./connection.js";

export async function userCadastro(user) {
	const command = `
        insert into tb_usuario (nm_usuario, ds_email, ds_senha, dt_nascimento)
        values (?, ?, ?, ?) `;
	const [answer] = await con.query(command, [user.nome, user.email, user.senha, user.nascimento]);
	return answer.affectedRows;
}

export async function userLogin(user) {
	const command = `
        select  id_usuario id,
        nm_usuario nome,
        ds_email email
        from  tb_usuario
        where  ds_email = ? and ds_senha = ? `;
	const [answer] = await con.query(command, [user.email, user.senha]);
	return answer[0];
}

export async function userEdit(user) {
	const command = `
        update  tb_usuario
        set nm_usuario = ?,
            ds_usuario = ?,
            img_usuario = ?,
            img_banner = ?
      where id_usuario = ? `;
	const [answer] = await con.query(command, [user.nome, user.descricao, user.imagem, user.banner, user.id]);
	return answer.affectedRows;
}

export async function userImg(image, id) {
	const command = `
	update tb_usuario
	set img_usuario = ?
	where id_usuario = ? `;
	const [answer] = await con.query(command, [image, id]);
	return answer.affectedRows;
}

export async function userDelete(email) {
	const command = `
        delete from tb_usuario where ds_email = ? `;
	const [answer] = await con.query(command, [email]);
	return answer.affectedRows;
}

export async function userEmailSearch(email) {
	const command = `
        select ds_email email
		  from tb_usuario
		   where ds_email = ? `;
	const [answer] = await con.query(command, [email]);
	return answer[0];
}

// esqueci senha
export async function userForgotPassword(code) {
	const command = `
	select ds_email, num_code
			from tb_usuario
			inner join tb_forgotpassword
		on tb_usuario.id_usuario = tb_forgotpassword.id_usuario
	where num_code = ? `;
	const [answer] = await con.query(command, [code]);
	return answer;
}

export async function userIdSearch(id) {
	const command = `
        select 	id_usuario id,
				nm_usuario nome,
				ds_usuario descricao,
				img_usuario imagem,
				img_banner banner,
				dt_criacao criacao		
		   from tb_usuario
		  where id_usuario = ? `;
	const [answer] = await con.query(command, [id]);
	return answer[0];
}

export async function userNameSearch(nome) {
	const command = `
        select 	id_usuario id,
				nm_usuario nome,
				ds_usuario descricao,
				img_usuario imagem,
				img_banner banner,
				dt_criacao criacao		
		   from tb_usuario
		  where nm_usuario like '%${nome}%' `;
	const [answer] = await con.query(command);
	return answer;
}

export async function amigosConsulta(id) {
	const command = `
	select 
		id_usuario id,
		nm_usuario nome,
		ds_usuario descricao,
		img_usuario imagem,
		img_banner banner,
		dt_criacao criacao
	from tb_usuario where id_usuario in (
		select id_solicitado
		from tb_usuario_amizade
		where (id_solicitado = ? or id_solicitante = ?) and ds_situacao = 'A'
	)`;
	const [answer] = await con.query(command, [id, id]);
	return answer;
}

export async function userComunidadesConsulta(id) {
	const command = `
	select 
		tb_comunidade.id_comunidade id,
		nm_comunidade nome,
		ds_comunidade descricao,
		img_comunidade imagem,
		img_banner banner,
		bt_publica publica
	from tb_usuario_comunidade 
	inner join tb_comunidade on tb_usuario_comunidade.id_comunidade = tb_comunidade.id_comunidade
	where id_usuario = ? `;
	const [answer] = await con.query(command, [id]);
	return answer;
}

export async function solicitarAmizade(solicitante, solicitado) {
	const command = `
        insert into tb_usuario_amizade (id_solicitante, id_solicitado)
			        values (?, ?) `;
	const [answer] = await con.query(command, [solicitante, solicitado]);
	return answer.affectedRows;
}

export async function aceitarAmizade(idAmizade, idSolicitado) {
	const command = `
        update tb_usuario_amizade
		set dt_confirmacao = curdate(), ds_situacao = 'A'
		where id_usuario_amizade = ? and id_solicitado = ?`;
	const [answer] = await con.query(command, [idAmizade, idSolicitado]);
	return answer.affectedRows;
}

export async function recusarAmizade(idAmizade, idSolicitado) {
	const command = `
        update tb_usuario_amizade set ds_situacao = 'N' where id_usuario_amizade = ? and id_solicitado = ? `;
	const [answer] = await con.query(command, [idAmizade, idSolicitado]);
	return answer.affectedRows;
}

export async function removerAmizade(idAmizade, idUsuario) {
	const command = `
        delete from tb_usuario_amizade where id_usuario_amizade = ? and (id_solicitante = ? or id_solicitado = ?)`;
	const [answer] = await con.query(command, [idAmizade, idUsuario, idUsuario]);
	return answer.affectedRows;
}

export async function userDenuncia(idUsuario, email, idReportado, motivo) {
	const command = `
		insert into tb_usuario_report (id_usuario, ds_email, id_usuario_reportado, ds_report)
							     values (?, ?, ?, ?) `;
	const [answer] = await con.query(command, [idUsuario, email, idReportado, motivo]);
	return answer.affectedRows;
}

export async function consultarIdAmizade(idUsuario, idUsuarioB) {
	const command = `
		select id_usuario_amizade 
		from tb_usuario_amizade
		where (id_solicitante = ? and id_solicitado = ?) or (id_solicitado = ? and id_solicitante = ?) `;
	const [answer] = await con.query(command, [idUsuario, idUsuarioB, idUsuario, idUsuarioB]);
	return answer[0].id_usuario_amizade;
}

export async function pedidosAmizadeConsulta(id) {
	const command = `
		select 
			id_usuario id,
			nm_usuario nome,
			img_usuario imagem
		from tb_usuario_amizade
		inner join tb_usuario on tb_usuario_amizade.id_solicitante = tb_usuario.id_usuario
		where id_solicitado = ? and ds_situacao = 'P';
		select 
			id_usuario id,
			nm_usuario nome,
			img_usuario imagem
		from tb_usuario_amizade
			inner join tb_usuario on tb_usuario_amizade.id_solicitado = tb_usuario.id_usuario
		where id_solicitante = ? and ds_situacao = 'P'`;
	let [answer] = await con.query(command, [id, id]);
	answer = {
		solicitados: [...answer[0]],
		solicitacoes: [...answer[1]],
	};
	return answer;
}

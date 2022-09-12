import con from "./connection.js";

export async function userCadastro(user) {
	const command = `
        insert into tb_usuario (nm_usuario, ds_email, ds_senha, dt_nascimento)
        values (?, ?, ?, ?) `;
	const [answer] = await con.query(command, [user.nome, user.email, user.senha, user.nascimento]);
	return answer;
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

export async function userSearch(email) {
	const command = `
        select * from tb_usuario where ds_email = ? `;
	const [answer] = await con.query(command, [email]);
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
	return answer;
}

export async function amigosConsulta(id) {
	const command = `
        select *
        from tb_usuario_amizade
        where	id_solicitante = ? or id_solicitado = ? and ds_situacao = 'A' `;
	const [answer] = await con.query(command, [id, id]);
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
        update tb_usuario_amizade set dt_confirmacao = curdate() and ds_situacao = 'A' where id_usuario_amizade = ? and id_solicitado = ?`;
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

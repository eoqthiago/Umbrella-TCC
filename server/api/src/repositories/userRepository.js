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

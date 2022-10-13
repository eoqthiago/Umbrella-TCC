import con from "./connection.js";

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
	const [answer] = await con.query(command, [admin.nome, admin.email, admin.senha, admin.nascimento, admin.endereco, admin.telefone, admin.cpf, admin.root]);
	return answer.affectedRows;
}

export async function rootVerificar(email) {
	const command = `
        select
			nm_admin nome,
			ds_email email,
			ds_endereco endereco,
			dt_nascimento nacimento,
			ds_telefone telefone,
			ds_cpf cpf
		from tb_admin where ds_email = ? and bt_root = 1 `;
	const [answer] = await con.query(command, [email]);
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

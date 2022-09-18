import con from "./connection.js";

// Criar comunidade
export async function communityCreate(id, community) {
	const command = `
        INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade) 
                           VALUES (?, ?, ?) `;
	const [r] = await con.query(command, [id, community.nome, community.descricao]);
	return r.affectedRows;
}

//Alterar comunidade
export async function communityEdit(community) {
	const command = `UPDATE tb_comunidade
                        INNER JOIN tb_usuario ON tb_comunidade.id_criador = tb_usuario.id_usuario
                        SET     tb_comunidade.nm_comunidade = ?,
                                tb_comunidade.ds_comunidade = ?
                        WHERE   tb_comunidade.id_comunidade = ?
                        AND     tb_comunidade.id_criador = tb_usuario.id_usuario`;

	const [r] = await con.query(command, [community.name, community.desc, community.id]);
	return r;
}

export async function communityGet() {
	const command = `SELECT * FROM tb_comunidade;`;
	const [r] = await con.query(command);
	return r;
}

export async function communityUser(userId, community) {
	const command = `INSERT INTO tb_usuario_comunidade(id_usuario, id_comunidade) 
                            VALUES(?, ?)`;
	const r = await con.query(command, [userId.user, community]);
	return r.data;
}

export async function communityAdmin(user) {
	const command = `INSERT INTO tb_administrador_comunidade(id_usuario_comunidade) 
                            VALUES (?)`;
	const [r] = await con.query(command, [user.id]);
	return r;
}

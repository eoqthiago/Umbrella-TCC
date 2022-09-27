import con from "./connection.js";

// Criar comunidade
export async function communityCreate(id, community) {
	const command = `
        INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, bt_publica) 
                           VALUES (?, ?, ?, ?) `;
	const [r] = await con.query(command, [id, community.nome, community.descricao, community.publica]);
	community.id = r.insertId;
	return community;
}

// Inserir imagem da comunidade
export async function communityImage(id, image) {
	const command = `
		UPDATE tb_comunidade
		   SET img_comunidade = ?
		 WHERE id_comunidade = ? `;
	const [r] = await con.query(command, [image, id]);
	return r.affectedRows;
}

// Procurar por id de usúario na comunidade
export async function communityUserID(id, comunidade) {
	const command = `SELECT tb_usuario_comunidade.id_usuario_comunidade,
						 	tb_usuario.nm_usuario
				 	FROM 	tb_usuario_comunidade
					INNER JOIN tb_usuario 
					ON tb_usuario_comunidade.id_usuario_comunidade = tb_usuario.id_usuario
					WHERE 	tb_usuario_comunidade.id_usuario_comunidade = ?
					AND 	id_comunidade = ?`;

	const [r] = await con.query(command, [id, comunidade]);
	return r;
}

// Procurar por nome de usúario na comunidade
export async function communityUsername(nome, comunidade) {
	const command = `SELECT tb_usuario_comunidade.id_usuario_comunidade,
						 	tb_usuario.nm_usuario
				 	FROM 	tb_usuario_comunidade
					INNER JOIN tb_usuario 
					ON tb_usuario_comunidade.id_usuario_comunidade = tb_usuario.id_usuario
					WHERE	tb_usuario.nm_usuario = ?
					AND 	id_comunidade = ?`;

	const [r] = await con.query(command, [nome, comunidade]);
	return r;
}

// Verificar se o usuário é dono da comunidade
export async function communityOwner(userId, communityId) {
	const command = `
		SELECT 	id_usuario id,
				nm_usuario nome
		FROM 	tb_comunidade
		INNER JOIN tb_usuario ON id_criador = id_usuario
		WHERE 	id_comunidade = ? AND id_criador = ? `;
	const [answer] = await con.query(command, [communityId, userId]);
	return answer[0];
}

// Consultar comunidade por ID
export async function communityId(id) {
	const command = `
		SELECT 	nm_comunidade nome,
				ds_comunidade descricao,
				img_comunidade imagem,
				img_banner banner
		FROM 	tb_comunidade
		WHERE 	id_comunidade = ? `;
	const [answer] = await con.query(command, [id]);
	return answer[0];
}

// Consultar comunidade por nome
export async function communityName(comunidade) {
	const command = `
			SELECT nm_comunidade nome,
					ds_comunidade descricao,
					img_comunidade imagem,
					img_banner banner
		   FROM 	tb_comunidade
		   WHERE 	nm_comunidade like '%${comunidade}%'`;
	const [answer] = await con.query(command);
	return answer;
}

// Alterar comunidade
export async function communityEdit(community, ownerId) {
	const command = `
		update 	tb_comunidade 
		set 	nm_comunidade = ?,
			ds_comunidade = ?
	where id_criador = ? and id_comunidade = ? `;
	const [r] = await con.query(command, [community.name, community.descricao, ownerId, community.id]);
	return r;
}

//Consultar todas comunidades
export async function communitiesGet() {
	const command = `SELECT * FROM tb_comunidade;`;
	const [r] = await con.query(command);
	return r;
}

//Convite comunidade
export async function communityUser(userId, community) {
	const command = `INSERT INTO tb_usuario_comunidade(id_usuario, id_comunidade) 
                            VALUES(?, ?)`;
	const r = await con.query(command, [userId, community]);
	return r.data;
}

// Promover usúario à admnistrador da comunidade
export async function communityAdmin(id, admin) {
	const command = `
	UPDATE tb_usuario_comunidade 
	   SET  bt_admin = ${admin}
	 WHERE id_usuario_comunidade = ?
					`;
	const [r] = await con.query(command, [id]);
	return r.affectedRows;
}

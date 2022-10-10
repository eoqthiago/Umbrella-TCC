import con from "./connection.js";

// Criar comunidade
export async function communityCreate(id, community) {
	const command = `
        INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, bt_publica) 
                           VALUES (?, ?, ?, ?);
		set @last = last_insert_id();
		INSERT INTO tb_usuario_comunidade (id_usuario, id_comunidade) 
									VALUES (?, @last)
		`;
	const [r] = await con.query(command, [id, community.nome, community.descricao, community.publica, id]);
	community.id = r[0].insertId;
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
					ON tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
					WHERE 	tb_usuario_comunidade.id_usuario = ?
					AND 	id_comunidade = ?`;

	const [r] = await con.query(command, [id, comunidade]);
	return r;
}

// Consultar todos usuarios da comunidade
export async function communityUsers(idCom) {
	const command = `SELECT
		tb_usuario_comunidade.id_usuario_comunidade as id,
		tb_usuario_comunidade.id_usuario as id_usuario,
		tb_usuario_comunidade.id_comunidade as comunidade,
		tb_usuario_comunidade.bt_admin as admin,
		tb_usuario.nm_usuario as nome,
		tb_usuario.ds_usuario as descricao,
		tb_usuario.img_usuario as imagem,
		tb_usuario.img_banner as banner
		FROM tb_usuario_comunidade
		INNER JOIN tb_usuario on tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
		WHERE tb_usuario_comunidade.id_comunidade = ?`

	const [r] = await con.query(command, [idCom]);
	return r[0];
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
	return answer;
}

// Consultar comunidade por ID
export async function communityId(id) {
	const command = `SELECT		id_comunidade 	as	id,
								nm_comunidade 	as	nome,
								ds_comunidade 	as	descricao,
								img_comunidade 	as	imagem,
								img_banner 		as	banner,
								bt_publica 		as	publica,
								dt_criacao 		as	dataCriacao,
								id_criador 		as	criador,
					(SELECT COUNT(*)
					FROM tb_usuario_comunidade
					INNER JOIN tb_comunidade 
					ON tb_usuario_comunidade.id_comunidade = tb_comunidade.id_comunidade
					WHERE tb_usuario_comunidade.id_comunidade = ?) as qtd_usuarios
					FROM tb_comunidade
					WHERE 	id_comunidade = ?`;
	const [answer] = await con.query(command, [id, id]);
	return answer[0];
}

// Consultar comunidade por nome //! Alterar
export async function communityName(comunidade) {
	const command = `
			SELECT
				id_comunidade id,
				nm_comunidade nome,
				ds_comunidade descricao,
				img_comunidade imagem,
				img_banner banner,
				bt_publica publica,
				dt_criacao dataCriacao,
				(   select count(id_usuario)
					from tb_usuario_comunidade
					inner join tb_comunidade on tb_usuario_comunidade.id_comunidade = tb_comunidade.id_comunidade
					where tb_comunidade.nm_comunidade like '%${comunidade}%' ) qtdUsuarios
			FROM tb_comunidade
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
	return r.affectedRows;
}

//Consultar todas comunidades
export async function communitiesGet() {
	const command = `SELECT * FROM tb_comunidade;`;
	const [r] = await con.query(command);
	return r;
}

//Convite comunidade
export async function communityUserAdd(userId, community) {
	const command = `
		INSERT INTO tb_usuario_comunidade (id_usuario, id_comunidade) 
                            	   VALUES (?, ?)`;
	const r = await con.query(command, [userId, community]);
	return r.affectedRows;
}

// Promover usúario à admnistrador da comunidade
export async function communityAdmin(id, admin) {
	const command = `
	UPDATE tb_usuario_comunidade 
	   SET  bt_admin = ${admin}
	 WHERE id_usuario_comunidade = ? `;
	const [r] = await con.query(command, [id]);
	return r.affectedRows;
}

// Criar canal
export async function communityCanal(community, canal) {
	const command = `
		insert into tb_comunidade_canal(id_comunidade, nm_canal)
		values (?,  ?) `;
	const [r] = await con.query(command, [community.id, canal.name]);
	return r;
}

// Listar canais
export async function listarCanais(id) {
	const command = `
		select id_comunidade as idComunidade,
		nm_canal as nome,
        id_comunidade_canal as idCanal
	 from tb_comunidade_canal
	 where id_comunidade = ?`;
	const [r] = await con.query(command, [id]);
	return r;
}

// Denunciar comunidade
export async function communityDenuncia(idUsuario, email, idReportado, motivo) {
	const command = `
		insert into tb_comunidade_report (id_usuario, ds_email, id_comunidade, ds_report)
							     values (?, ?, ?, ?) `;
	const [answer] = await con.query(command, [idUsuario, email, idReportado, motivo]);
	return answer.affectedRows;
}

// Pesquisar usuario em comunidade
export async function communityUserIdSearch(id) {
	const command = `
		select id_usuario_comunidade idUsuarioComunidade 
		from tb_usuario_comunidade 
		where id_usuario_comunidade = ? `;
	const [answer] = await con.query(command, [id]);
	return answer[0];
}

// Sair da comunidade
export async function communityUserDelete(idUsuario, idComunidade) {
	const command = `
		delete from tb_usuario_comunidade where id_usuario = ? and id_comunidade = ? `;
	const [answer] = await con.query(command, [idUsuario, idComunidade]);
	return answer.affectedRows;
}

// Excluir comunidade
export async function communityDelete(idCommunity) {
	const command = `
		delete from tb_comunidade
		   where id_comunidade = ?`;

	const [r] = await con.query(command, [idCommunity]);
	return r.affectedRows;
}
import con from './connection.js';

// Criar comunidade
export async function communityCreate(id, community) {
	const command = `
        INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, bt_publica) 
                           VALUES (?, ?, ?, ?);
		set @last = last_insert_id();
		INSERT INTO tb_usuario_comunidade (id_usuario, id_comunidade, bt_admin) 
									VALUES (?, @last, true);
		insert into tb_comunidade_canal (id_comunidade, nm_canal)
								 values (@last, 'Primeiro canal'); `;
	const [r] = await con.query(command, [id, community.nome, community.descricao ? community.descricao.trim() : '', community.publica, id]);
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

// Inserir banner da comunidade
export async function communityBanner(id, image) {
	const command = `
		UPDATE tb_comunidade
		   SET img_banner = ?
		 WHERE id_comunidade = ? `;
	const [r] = await con.query(command, [image, id]);
	return r.affectedRows;
}

// Procurar por usuário com id na comunidade
export async function communityUserID(usuario, comunidade) {
	const command = `
		SELECT
				tb_usuario_comunidade.id_usuario_comunidade id,
				tb_usuario.nm_usuario nome,
				tb_usuario.img_usuario imagem,
				tb_usuario.ds_usuario descricao,
				id_usuario_comunidade idComunidade
		FROM 	tb_usuario_comunidade
		INNER JOIN tb_usuario 
		ON tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
		WHERE 	tb_usuario_comunidade.id_usuario = ?
		AND 	id_comunidade = ?`;

	const [r] = await con.query(command, [usuario, comunidade]);
	return r[0];
}

// Consultar todos usuarios da comunidade
export async function communityUsers(idCom) {
	const command = `
		SELECT
			tb_usuario_comunidade.id_usuario_comunidade as id,
			tb_usuario_comunidade.id_usuario as idUsuario,
			tb_usuario_comunidade.id_comunidade as idComunidade,
			tb_usuario_comunidade.bt_admin as admin,
			tb_usuario.nm_usuario as nome,
			tb_usuario.ds_usuario as descricao,
			tb_usuario.img_usuario as imagem,
			tb_usuario.img_banner as banner
		FROM tb_usuario_comunidade
		INNER JOIN tb_usuario on tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
		WHERE tb_usuario_comunidade.id_comunidade = ?`;
	const [r] = await con.query(command, [idCom]);
	return r;
}

// Procurar por nome de usúario na comunidade
export async function communityUsername(nome, comunidade) {
	const command = `
		SELECT
			tb_usuario_comunidade.id_usuario_comunidade as id,
			tb_usuario_comunidade.id_usuario as idUsuario,
			tb_usuario_comunidade.id_comunidade as idComunidade,
			tb_usuario_comunidade.bt_admin as admin,
			tb_usuario.nm_usuario as nome,
			tb_usuario.ds_usuario as descricao,
			tb_usuario.img_usuario as imagem,
			tb_usuario.img_banner as banner
		FROM tb_usuario_comunidade
		INNER JOIN tb_usuario on tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
		WHERE tb_usuario_comunidade.id_comunidade = ? and tb_usuario.nm_usuario like '%${nome}%'`;
	const [r] = await con.query(command, [comunidade]);
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
	const command = `
		SELECT		
			id_comunidade 	as	id,
			nm_comunidade 	as	nome,
			ds_comunidade 	as	descricao,
			img_comunidade 	as	imagem,
			img_banner 		as	banner,
			bt_publica 		as	publica,
			dt_criacao 		as	dataCriacao,
			id_criador 		as	criador,
			(
				SELECT 
					COUNT(id_usuario_comunidade)
				FROM tb_usuario_comunidade
					INNER JOIN tb_comunidade 
					ON tb_usuario_comunidade.id_comunidade = tb_comunidade.id_comunidade
				WHERE tb_usuario_comunidade.id_comunidade = ?
			) as qtd_usuarios
		FROM tb_comunidade
		WHERE 	id_comunidade = ?`;
	const [answer] = await con.query(command, [id, id]);
	return answer[0];
}

// Consultar comunidade por nome
export async function communityName(comunidade) {
	const command = `
		select 
			tb.id_comunidade id,
			nm_comunidade nome,
			ds_comunidade descricao,
			img_comunidade imagem,
			img_banner banner,
			bt_publica publica,
			dt_criacao dataCriacao,
			count(tb.id_usuario_comunidade) qtdUsuarios
		from tb_comunidade
		inner join tb_usuario_comunidade tb on tb.id_comunidade = tb_comunidade.id_comunidade
        where nm_comunidade like '%${comunidade}%'
		group by nm_comunidade
		order by count(tb.id_usuario_comunidade) desc `;
	const [answer] = await con.query(command);
	return answer;
}

// Alterar comunidade
export async function communityEdit(community, ownerId) {
	const command = `
		update 	tb_comunidade 
		set 	nm_comunidade = ?,
				ds_comunidade = ?,
				bt_publica = ?
	where id_criador = ? and id_comunidade = ? `;
	const [r] = await con.query(command, [community.nome, community.descricao, community.publica, ownerId, community.id]);
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
export async function communityCanalCreate(community, canal) {
	const command = `
		insert into tb_comunidade_canal(id_comunidade, nm_canal)
		values (?,  ?) `;
	const [r] = await con.query(command, [community.id, canal.name]);
	return r.affectedRows;
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
		delete from tb_comunidade_canal 
			  where id_comunidade = ? ;

		delete from tb_comunidade
			  where id_comunidade = ? `;
	const [r] = await con.query(command, [idCommunity, idCommunity]);
	return r.affectedRows;
}

// Inserir mensagem em canal
export async function salvarMensagemComunidade(usuario, canal, conteudo) {
	const command = `
		insert into tb_comunidade_mensagem (id_usuario_comunidade, id_comunidade_canal, ds_mensagem)
					values (?, ?, ?) `;
	const [r] = await con.query(command, [usuario, canal, conteudo]);
	return r.insertId;
}

// Consultar mensagens de um canal
export async function consultarCanalMensagens(canal, lastId) {
	const command = `
		select
			id_mensagem idMensagem,
			ds_mensagem conteudo,
			dt_mensagem data,
			tb_usuario_comunidade.id_comunidade idComunidade,
			tb_usuario_comunidade.id_usuario_comunidade idUsuarioComunidade,
			tb_usuario.img_usuario usuarioImagem,
			tb_usuario.id_usuario idUsuario,
			tb_usuario.nm_usuario usuarioNome,
            tb_usuario.ds_usuario usuarioDescricao
		from tb_comunidade_mensagem
		inner join tb_usuario_comunidade on tb_usuario_comunidade.id_usuario_comunidade = tb_comunidade_mensagem.id_usuario_comunidade
		inner join tb_usuario on tb_usuario_comunidade.id_usuario = tb_usuario.id_usuario
		where id_comunidade_canal = ?
		order by data`; //limit 50

	const [answer] = await con.query(command, [canal]);
	const model = [];
	answer.forEach(item =>
		model.push({
			usuario: {
				nome: item.usuarioNome,
				id: item.idUsuario,
				imagem: item.usuarioImagem,
				idComunidade: item.idUsuarioComunidade,
				descricao: item.usuarioDescricao,
			},
			comunidade: item.idComunidade,
			canal: canal,
			mensagem: {
				conteudo: item.conteudo,
				data: item.dataEnvio,
				id: item.idMensagem,
			},
		})
	);
	return model;
}

// Criar um canal
export async function inserirCanal(idComunidade, nome) {
	const command = `
		insert into tb_comunidade_canal (id_comunidade, nm_canal)
								 values (?, ?) `;
	const answer = await con.query(command, [idComunidade, nome]);
	return answer.affectedRows;
}

// Excluir um canal
export async function excluirCanal(idCanal) {
	const command = `
		delete from tb_comunidade_canal where id_comunidade_canal = ? `;
	const answer = await con.query(command, [idCanal]);
	return answer.affectedRows;
}

// Consultar as maiores comunidades
export async function topCommunities(nome, not) {
	const command = `
		select 
			tb.id_comunidade id,
			nm_comunidade nome,
			ds_comunidade descricao,
			img_comunidade imagem,
			img_banner banner,
			bt_publica publica,
			dt_criacao dataCriacao,
			count(tb.id_usuario_comunidade) qtdUsuarios
		from tb_comunidade
		inner join tb_usuario_comunidade tb on tb.id_comunidade = tb_comunidade.id_comunidade
		where nm_comunidade like '%${nome}%' and tb.id_comunidade <> ?
		group by nm_comunidade
		order by count(tb.id_usuario_comunidade) desc
		limit 25 `;
	const [answer] = await con.query(command, [not]);
	return answer;
}

// Consultar banimento de usuário
export async function communityUserBanned(user, comunidade) {
	const command = `
		select 
			id_usuario id,
			ds_motivo motivo,
			dt_banido dataBanimento
		from tb_comunidade_usuario_banido
		where id_usuario = ? and id_comunidade = ? `;
	const [answer] = await con.query(command, [user, comunidade]);
	return answer[0];
}

// Banir um usuário
export async function communityUserBan(userCom, comunidade, motivo) {
	const command = `	
		set @usuario = (
			select id_usuario 
			from tb_usuario_comunidade 
			where id_usuario_comunidade = ?
			);
			
		delete from tb_usuario_comunidade 
		where id_usuario_comunidade = ?;

		insert into tb_comunidade_usuario_banido (id_comunidade, id_usuario, ds_motivo)
										values (?, @usuario, ?) `;
	const [answer] = await con.query(command, [userCom, userCom, comunidade, motivo]);
	return answer.affectedRows;
}

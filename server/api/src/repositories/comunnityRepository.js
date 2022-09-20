import con from "./connection.js";

// Criar comunidade
export async function communityCreate(id, community) {
	const command = `
        INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, bt_publica) 
                           VALUES (?, ?, ?, ?) `;
	const [r] = await con.query(command, [id, community.nome, community.descricao, community.publica]);
	community.id = r.insertId;
	return community;
};

// Inserir imagem da comunidade
export async function communityImage(id, image) {
	const command = `
		update tb_comunidade
		   set img_comunidade = ?
		 where id_comunidade = ? `;
	const [r] = await con.query(command, [image, id]);
	return r.affectedRows;
};

// Verificar se o usuário é dono da comunidade
export async function communityOwner(userId, communityId) {
	const command = `
		select 
			id_usuario id,
			nm_usuario nome
		from tb_comunidade
		inner join tb_usuario on id_criador = id_usuario
		where id_comunidade = ? and id_criador = ? `;
	const [answer] = await con.query(command, [communityId, userId]);
	return answer[0];
};

// Consultar comunidade por ID
export async function communityId(id) {
	const command = `
		select
			nm_comunidade nome,
			ds_comunidade descricao,
			img_comunidade imagem,
			img_banner banner
		from tb_comunidade
		where id_comunidade = ? `;
	const [answer] = await con.query(command, [id]);
	return answer[0];
};

// Consultar comunidade por nome
export async function communityName(comunidade) {
	const command = `
			select
				nm_comunidade nome,
				ds_comunidade descricao,
				img_comunidade imagem,
				img_banner banner
		   from tb_comunidade
		   where nm_comunidade like '%${comunidade}%'`;
	const [answer] = await con.query(command);
	return answer;
};

// Alterar comunidade
export async function communityEdit(community) {
	const command = `UPDATE tb_comunidade
                        INNER JOIN tb_usuario ON tb_comunidade.id_criador = tb_usuario.id_usuario
                        SET     tb_comunidade.nm_comunidade = ?,
                                tb_comunidade.ds_comunidade = ?
                        WHERE   tb_comunidade.id_comunidade = ?
                        AND     tb_comunidade.id_criador = tb_usuario.id_usuario`;

	const [r] = await con.query(command, [community.name, community.descricao, community.id]);
	return r;
};

//Consultar todas comunidades
export async function communitiesGet() {
	const command = `SELECT * FROM tb_comunidade;`;
	const [r] = await con.query(command);
	return r;
};

//Convite comunidade
export async function communityUser(userId, community) {
	const command = `INSERT INTO tb_usuario_comunidade(id_usuario, id_comunidade) 
                            VALUES(?, ?)`;
	const r = await con.query(command, [userId, community]);
	return r.data;
};

// Adicionar um admnistrador à comunidade
export async function communityAdmin(user) {
	const command = `INSERT INTO tb_administrador_comunidade(id_usuario_comunidade) 
                            VALUES (?)`;
	const [r] = await con.query(command, [user.id]);
	return r;
};

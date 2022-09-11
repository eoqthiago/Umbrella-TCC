import con from "./connection.js";

export async function communityCreat(user, community) {
    const command = `INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade) 
                                VALUES (?, ?, ?)`;
    const [r] = await con.query(command, [user, community.name, community.desc]);
    return r;
}


use umbrellaDB;

-- *Usuário*

-- Cadastro
insert into tb_usuario (nm_usuario, ds_email, ds_senha, dt_nascimento)
                values ("Thierry", "othierry@daora", "hash", "2000-10-10");

-- Login
select  id_usuario id,
        nm_usuario nome,
        ds_email email
  from  tb_usuario
 where  ds_email = 'othierry@daora' and ds_senha = 'hash';

-- Editar 
update  tb_usuario
    set nm_usuario = 'Thierrer',
        ds_usuario = 'eita',
        img_usuario = null,
        img_banner = null
  where id_usuario = 1;

-- Inserir imagem
update tb_usuario
	set img_usuario = '/path'
	where id_usuario = 1

-- Deletar
delete from tb_usuario where ds_email = "othierrydaora";

-- Procurar usuário
select * from tb_usuario where ds_email = "othierry@daora";

-- Consultar amigos
select 
		id_usuario id,
		nm_usuario nome,
		ds_usuario descricao,
		img_usuario imagem,
		img_banner banner,
		dt_criacao criacao
   from tb_usuario_amizade amz
inner join tb_usuario usuario on amz.id_solicitante = usuario.id_usuario
where id_usuario <> 2;
select 
		id_usuario id,
		nm_usuario nome,
		ds_usuario descricao,
		img_usuario imagem,
		img_banner banner,
		dt_criacao criacao
   from tb_usuario_amizade amz
inner join tb_usuario usuario on amz.id_solicitado = usuario.id_usuario
where id_usuario <> 2;

-- Consultar comunidades do usuário
select 
	tb_comunidade.id_comunidade id,
	nm_comunidade nome,
	ds_comunidade descricao,
	img_comunidade imagem,
	img_banner banner,
	bt_publica publica
from tb_usuario_comunidade 
inner join tb_comunidade on tb_usuario_comunidade.id_comunidade = tb_comunidade.id_comunidade
where id_usuario_comunidade = 1;

-- Ver pedidos de amizade recebidos
select 	*
  from	tb_usuario_amizade
  where	id_solicitado = 1 and dt_confirmacao is null;
  
-- Adicionar pedido de amizade
insert into tb_usuario_amizade (id_solicitante, id_solicitado)
					  values (1, 2);

-- Aceitar pedido de amizade
update tb_usuario_amizade set dt_confirmacao = curdate() and ds_situacao = 'A' where id_usuario_amizade = 1;

-- Recusar pedido de amizade
update tb_usuario_amizade set ds_situacao = 'N' where id_usuario_amizade = 1;

-- Remover pedido ou amizade
delete from tb_usuario_amizade where id_usuario_amizade = 1;

-- Procurar usuários por nome
select 	id_usuario id,
		nm_usuario nome,
		ds_usuario descricao,
		img_usuario imagem,
		img_banner banner,
		dt_criacao criacao		
	from tb_usuario
	where nm_usuario like '%othierrydaora%';

-- Denunciar usuário
insert into tb_usuario_report (id_usuario, ds_email, id_usuario_reportado, ds_report)
							     values (?, ?, ?, ?);

-- Consultar pedidos de amizade
select 
			id_usuario_amizade,
			id_usuario id,
			nm_usuario nome,
			img_usuario imagem
		from tb_usuario_amizade
		inner join tb_usuario on tb_usuario_amizade.id_solicitante = tb_usuario.id_usuario
		where id_solicitado = ? and ds_situacao = 'P';
		select 
			id_usuario_amizade,
			id_usuario id,
			nm_usuario nome,
			img_usuario imagem
		from tb_usuario_amizade
			inner join tb_usuario on tb_usuario_amizade.id_solicitado = tb_usuario.id_usuario
		where id_solicitante = ? and ds_situacao = 'P'

-- *Administrador*

-- Login
select  id_admin id,
        nm_usuario nome,
        ds_email email
        from  tb_admin
        where  ds_email = 'othierrydaora@admin' and ds_senha = 'hash';

-- Cadastro de outro admin (root)
insert into tb_admin (nm_admin, ds_email, ds_senha, dt_nascimento, ds_endereco, ds_telefone, ds_cpf, bt_root)
                values ("Thierry", "othierry@daora", "hash", "2000-10-10", "Av. Atlântica", "+551199999-9999", "000.000.000-00", false);

-- Procurar admin
select * from tb_admin where ds_email = 'othierrydaora@admin';

-- Verificar se é um administrador root
select * from tb_admin where ds_email = 'othierrydaora@admin' and bt_root = 1;

-- Deletar um administrador (root)
delete from tb_admin where ds_email = 'othierrydaora@admin';
 


-- *Comunidade*

-- Cadastrar comunidade
INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, bt_publica) 
                           VALUES (?, ?, ?, ?);
		set @last = last_insert_id();
		INSERT INTO tb_usuario_comunidade (id_usuario, id_comunidade) 
									VALUES (?, @last);

-- Inserir imagem da comunidae
update tb_comunidade
		   set img_comunidade = ?
		 where id_comunidade = ? ;

-- Verificar se o usuário é dono da comunidade
select 
			id_usuario id,
			nm_usuario nome
		from tb_comunidade
		inner join tb_usuario on id_criador = id_usuario
		where id_comunidade = ? and id_criador = ? ;

-- Consultar uma comunidade por id
SELECT
	id_comunidade id,
	nm_comunidade nome,
	ds_comunidade descricao,
	img_comunidade imagem,
	img_banner banner,
	bt_publica publica,
	dt_criacao dataCriacao,
	id_criador criador,
	(select count(id_usuario) 
		from tb_usuario_comunidade 
		inner join tb_comunidade 
		on tb_usuario_comunidade.id_usuario_comunidade = tb_comunidade.id_comunidade
		where tb_usuario_comunidade.id_comunidade = 1) qtdUsuarios
FROM tb_comunidade
WHERE 	id_comunidade = 1;

-- Pesquisar comunidades por nome --! Alterar
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
where nm_comunidade like '%Comunidade%'
group by nm_comunidade
order by count(tb.id_usuario_comunidade) desc;

-- Atualizar campos da comunidade
update 	tb_comunidade 
   set 	nm_comunidade = 'daora',
		ds_comunidade = 'legal'
where id_criador = 1 and id_comunidade = 1;

-- Inserir usuário em comunidade
INSERT INTO 
	tb_usuario_comunidade	(id_usuario, id_comunidade) 
				    VALUES	(1, 1);

-- Inserir canal     
       insert into tb_comunidade_canal(id_comunidade, nm_canal)
       values (2, "canal 4");
       
-- Listar canais por comunidade   
       select id_comunidade as idcomunidade,
			  nm_canal as nomecanal 
              from tb_comunidade_canal
              where id_comunidade = 2;

-- Denunciar comunidade
insert into tb_comunidade_report (id_usuario, ds_email, id_comunidade, ds_report)
							     values (?, ?, ?, ?);

-- Inserir mensagem
insert into 
	tb_comunidade_mensagem (id_usuario_comunidade, id_comunidade_canal, ds_mensagem)
					values (
							(select id_usuario_comunidade
								from tb_usuario_comunidade
								where id_usuario = ? and id_comunidade = ?
							), ?, ?);

-- Consultar mensagens
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
where id_comunidade_canal = 1;

-- Deletar canal
delete from tb_comunidade_canal where id_comunidade_canal = 1;

-- Top comunidades
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
group by nm_comunidade
order by count(tb.id_usuario_comunidade) desc
limit 25;

-- Verificar se o usuário foi banido
select 
	id_usuario id,
    ds_motivo motivo,
    dt_banido dataBanimento
from tb_comunidade_usuario_banido
where id_usuario = 1 and id_comunidade = 1;

-- Banir um usuário
set @usuario = (
	select id_usuario 
    from tb_usuario_comunidade 
    where id_usuario_comunidade = 20
    );
delete from tb_usuario_comunidade 
where id_usuario_comunidade = 20;
insert into tb_comunidade_usuario_banido (id_comunidade, id_usuario, ds_motivo)
								  values (6, @usuario, 'quebrar as regras');


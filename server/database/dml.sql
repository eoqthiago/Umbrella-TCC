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
select *
  from tb_usuario_amizade
  where	id_solicitante = 1 or id_solicitado = 1 and ds_situacao = 'A';

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
INSERT INTO tb_comunidade (id_criador, nm_comunidade, ds_comunidade, img_comunidade, img_banner) 
                   VALUES (?, ?, ?, ?, ?) 

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
select
			nm_comunidade nome,
			ds_comunidade descricao,
			img_comunidade imagem,
			img_banner banner
		from tb_comunidade
		where id_comunidade = ? ;

-- Pesquisar comunidades por nome
select
			nm_comunidade nome,
			ds_comunidade descricao,
			img_comunidade imagem,
			img_banner banner
		from tb_comunidade
		where nm_comunidade like '%Comunidade daora%' 

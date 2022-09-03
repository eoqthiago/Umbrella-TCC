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

-- Deletar
delete from tb_usuario where ds_email = "othierrydaora";

-- Procurar usuário
select * from tb_usuario where ds_email = "othierry@daora";

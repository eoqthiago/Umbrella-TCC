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
 
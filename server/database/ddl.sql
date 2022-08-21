create schema umbrellaDB;

create table tb_admin (
    id_admin        int primary key auto_increment,
    nm_admin        varchar(50) not null,
    ds_email        varchar(2500) not null,
    ds_senha        varchar(32) not null,
    ds_endereco     varchar(200) not null,
    dt_nascimento   date not null,
    ds_telefone     varchar(12) not null,
    ds_cpf          varchar(14) not null,
    lv_hierarquia   int
);
create table tb_usuario (
    id_usuario      int primary key auto_increment,
    nm_usuario      varchar(50) not null,
    ds_apelido      varchar(20) not null,
    ds_email        varchar(200) not null,
    ds_senha        varchar(32) not null,
    ds_usuario      varchar(500) not null,
    img_usuario     varchar(200) not null,
    img_banner      varchar(200) not null,
    dt_nascimento   date not null,
    dt_criacao      date default(curdate())
);

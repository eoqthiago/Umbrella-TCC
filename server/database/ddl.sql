create schema umbrellaDB;

--Admin
create table tb_admin (
    id_admin int primary key auto_increment,
    nm_admin varchar(50) not null,
    ds_email varchar(2500) not null,
    ds_senha varchar(64) not null,
    ds_endereco varchar(200) not null,
    dt_nascimento date not null,
    ds_telefone varchar(12) not null,
    ds_cpf varchar(14) not null,
    dt_criacao date default(curdate()) lv_hierarquia int not null
);

-- Usuario
create table tb_usuario (
    id_usuario int primary key auto_increment,
    nm_usuario varchar(50) not null,
    ds_apelido varchar(20) not null,
    ds_email varchar(200) not null,
    ds_senha varchar(64) not null,
    ds_usuario varchar(500) not null,
    img_usuario varchar(200) not null,
    img_banner varchar(200) not null,
    dt_nascimento date not null,
    dt_criacao date default(curdate())
);

create table tb_usuario_amizade (
    id_usuario_amizade int primary key auto_increment
);

create table tb_usuario_amigo (
    id_usuario_amigo int primary key auto_increment,
    id_usuario int,
    id_usuario_amizade int,
    foreign key (id_usuario) references tb_usuario(id_usuario) on delete cascade,
    foreign key (id_usuario_amizade) references tb_usuario_amizade(id_usuario_amizade) on delete cascade
);

create table tb_usuario_report (
    id_report int primary key auto_increment,
    ds_report varchar(500) not null,
    ds_email varchar(250) not null,
    id_usuario int,
    id_usuario_reportado int,
    foreign key (id_usuario) references tb_usuario (id_usuario),
    foreign key (id_usuario_reportado) references tb_usuario (id_usuario) on delete cascade
);

create table tb_usuario_banido (
    id_usuario_banido int primary key auto_increment,
    ds_motivo varchar(900) not null,
    id_usuario int,
    foreign key (id_usuario) references tb_usuario(id_usuario)
);

-- Conversa
create table tb_conversa (
    id_conversa int primary key auto_increment,
    dt_criacao date default(curdate())
);

create table tb_usuario_conversa (
    id_usuario_conversa int primary key auto_increment,
    id_usuario int,
    id_conversa int,
    foreign key (id_usuario) references tb_usuario (id_usuario) on delete cascade,
    foreign key (id_conversa) references tb_conversa (id_conversa) on delete cascade
);

create table tb_mensagem (
    id_mensagem int primary key auto_increment,
    ds_mensagem varchar(2500) not null,
    id_usuario_conversa int,
    foreign key (id_usuario_conversa) references tb_usuario_conversa (id_usuario_conversa) on delete cascade
);

create table tb_mensagem_arquivo (
    id_mensagem_arquivo int primary key auto_increment,
    ds_arquivo varchar(400) not null,
    id_mensagem int,
    foreign key (id_mensagem) references tb_mensagem (id_mensagem) on delete cascade
);

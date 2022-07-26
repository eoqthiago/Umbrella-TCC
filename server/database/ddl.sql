create schema umbrellaDB;

-- Admin
create table tb_admin (
    id_admin int primary key auto_increment,
    nm_admin varchar(50) not null,
    ds_email varchar(200) unique not null,
    ds_senha varchar(64) not null,
    ds_endereco varchar(200) not null,
    dt_nascimento date not null,
    ds_telefone varchar(14) unique not null,
    ds_cpf varchar(14) unique not null,
    dt_criacao date default(curdate()),
    bt_root boolean default(false) not null
);

-- Usuario
create table tb_usuario (
    id_usuario int primary key auto_increment,
    nm_usuario varchar(50) not null,
    ds_usuario varchar(500),
    img_usuario varchar(200),
    img_banner varchar(200),
    ds_email varchar(200) unique not null,
    ds_senha varchar(64) not null,
    dt_nascimento date not null,
    dt_criacao date default(curdate())
);

create table tb_usuario_amizade (
    id_usuario_amizade int primary key auto_increment,
    id_solicitante int,
    id_solicitado int,
    ds_situacao varchar(1) default('P') not null,
    dt_pedido date default(curdate()),
    dt_confirmacao date,
    foreign key (id_solicitante) references tb_usuario (id_usuario) on delete cascade,
    foreign key (id_solicitado) references tb_usuario (id_usuario) on delete cascade
);

create table tb_usuario_report (
    id_report int primary key auto_increment,
    id_usuario int,
    id_usuario_reportado int,
    ds_report varchar(500) not null,
    ds_email varchar(250) not null,
    dt_report date default(curdate()),
    foreign key (id_usuario) references tb_usuario (id_usuario),
    foreign key (id_usuario_reportado) references tb_usuario (id_usuario) on delete cascade
);

create table tb_usuario_banido (
    id_usuario_banido int primary key auto_increment,
    id_usuario int,
    ds_motivo varchar(900) not null,
    dt_banido date default(curdate()),
    foreign key (id_usuario) references tb_usuario (id_usuario)
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
    id_usuario_conversa int,
    ds_mensagem varchar(2500) not null,
    dt_mensagem datetime default(now()),
    foreign key (id_usuario_conversa) references tb_usuario_conversa (id_usuario_conversa) on delete cascade
);

-- Comunidade
create table tb_comunidade (
    id_comunidade int primary key auto_increment,
    id_criador int,
    nm_comunidade varchar(50) not null,
    ds_comunidade varchar(700) not null,
    img_comunidade varchar(200),
    img_banner varchar(200),
    dt_criacao date default(curdate()),
    bt_publica boolean not null,
    foreign key (id_criador) references tb_usuario (id_usuario)
);

create table tb_usuario_comunidade (
    id_usuario_comunidade int primary key auto_increment,
    id_usuario int,
    id_comunidade int,
    bt_admin boolean,
    foreign key (id_usuario) references tb_usuario (id_usuario) on delete cascade,
    foreign key (id_comunidade) references tb_comunidade (id_comunidade) on delete cascade
);

create table tb_comunidade_canal (
    id_comunidade_canal int primary key auto_increment,
    id_comunidade int,
    nm_canal varchar(20),
    foreign key (id_comunidade) references tb_comunidade (id_comunidade)
);

create table tb_comunidade_mensagem (
    id_mensagem int primary key auto_increment,
    id_usuario_comunidade int,
    id_comunidade_canal int,
    ds_mensagem varchar(2500) not null,
    dt_mensagem datetime default(now()),
    foreign key (id_usuario_comunidade) references tb_usuario_comunidade (id_usuario_comunidade) on delete cascade,
    foreign key (id_comunidade_canal) references tb_comunidade_canal (id_comunidade_canal) on delete cascade
);

create table tb_comunidade_usuario_banido (
    id_comunidade_usuario_banido int primary key auto_increment,
    id_comunidade int,
    id_usuario int,
    ds_motivo varchar(900) not null,
    dt_banido date default(curdate()),
    foreign key (id_comunidade) references tb_comunidade (id_comunidade) on delete cascade,
    foreign key (id_usuario) references tb_usuario (id_usuario) on delete cascade
);

create table tb_comunidade_report (
    id_comunidade_report int primary key auto_increment,
    id_usuario int,
    id_comunidade int,
    ds_report varchar(500) not null,
    ds_email varchar(250) not null,
    dt_report date default(curdate()),
    foreign key (id_usuario) references tb_usuario (id_usuario),
    foreign key (id_comunidade) references tb_comunidade (id_comunidade) on delete cascade
);

-- Outros
create table tb_feedback (
    id_feedback int primary key auto_increment,
    id_usuario int,
    ds_feedback varchar(1000) not null,
    nr_estrelas int not null,
    dt_feedback date default(curdate()),
    foreign key (id_usuario) references tb_usuario (id_usuario)
);

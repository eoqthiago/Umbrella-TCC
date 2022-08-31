# **Admnistrador root**

## Login

### _POST /admin/usuario/login_

```json
//request
{
    "email": "adm@umbrella.com",
    "senha": "12345"
}

//response (202)
{
    "id": 1,
    "nome": "adm",
    "email": "adm@umbrella.com"
}
```

<br>

## Cadastro de outro administrador

### _POST /admin/usuario_

```json
//request
{
	"admin": {
		"email": "adm@umbrella.com",
		"senha": "12345"
	},
	"email": "admin@moge.com",
	"nome": "admin",
	"senha": "12345",
	"nascimento": "2000-10-10",
	"cpf": "000.000.000-00"
}

//response (201)
```

<br>

## Remoção de outro administrador

### _DELETE /admin/usuario_

```json
//request
{
	"admin": {
		"email": "adm@umbrella.com",
		"senha": "12345"
	},
	"email": "admin@moge.com"
}

//response (204)
```

<br>

# **Comunidade**

## Criação de comunidade

### _POST /comunidade_

```json
//request
{
	"nome": "Star Wars",
	"descricao": "Os maiores fãs de Star Wars",
	"imagem": "imagem.svg",
	"imagemFundo": "imagem2.svg",
	"privada": false
}
//response (201)
{
	"id": 1,
	"nome": "Star Wars",
	"descricao": "Os maiores fãs de Star Wars",
	"imagem": "imagem.svg",
	"imagemFundo": "imagem2.svg",
	"privada": false
}
```

<br>

### _POST /comunidade/denuncia_

```json
//request
{
	"id": 12234,
	"usuario": 1,
	"motivo": "Extremismo"
}
//response (202)
```

<br>

## Remoção de uma comunidade

### _DELETE /comunidade/?id=1_

```json
//request
{
	"email": "usuario@umbrella",
	"senha": "1234"
}
//response (204)
```

<br>

## Criação de canais

### _POST /comunidade/gerenciamento/canal_

```json
//request
{
	"usuario": 1,
	"nome": "Geral"
}
//response (204)
{
	"id": 1,
    "canal": "Geral"
}
```

<br>

## Promover usuario

### _PUT /comunidade/1/usuario/1_

```json
//request
{
	"nivel": "admin"
}
//response (202)
```

<br>

## Banir Usuario

### _POST /comunidade/banimento_

```json
//request
{
	"id_usuario_comunidade": 12,
	"motivo": "Spam"
}
//response (201)
```

<br>

## Denunciar Usúario

### _POST /usuario/denuncia_

```json
//request
{
	"id_usuario": 12,
	"motivo": "Bullying"
}
//response (201)
```

<br>

## Remover um usuário

### _DELETE /usuario/?id=1_

```json
//request
{
	"admEmail": "adm@umbrella.com",
	"admSenha": "12345"
}

//response (201)
```

<hr>

# **Usuário**

## Login

### _POST /usuario/login_

```json
//request
{
    "email": "usuario@dom.com",
    "senha": "12345"
}

//response (201)
{
    "id_usuario": 1,
    "nome": "usuario",
    "email": "usuario@dom.com"
}
```

<br>

## Cadastro

### _POST /usuario_

```json
//request
{
    "nome": "usuario",
    "email": "usuario@dom.com",
    "senha": "12345",
    "nascimento": "2000-10-10",
	"imagem": "imagem.svg",
	"imagem_fundo": "imagem.svg"
}

//response (204)
{
    "id": 1,
    "nome": "usuario",
    "email": "12345"
}
```

<br>

## Alterar Perfil

### _PUT /usuario/perfil_

```json
//request
{
	"nome": "usuario",
	"descrição": "Gosto de Star Wars e Senhor dos Anéis",
	"imagem": "imagem.svg"
}

//response (201)
```

<br>

## Deleção de conta

### _DELETE /usuario/perfil_

```json
//request
{
	"email": "usuario@dom.com",
	"senha": "12345"
}

//response (201)
```

# **Chat**

## Enviar mensagem

### _POST /mensagem/:conversa_

```json
//request
{
	"id_usuario": 87686,
	"id_mensagem": 73246,
	"mensagem": "chat daoraa",
	"data": "2020-20-10"
}

//response(201)
```

<br>

## Excluir mensagem

### _DELETE /mensagem/:conversa_

```json
{
	"id_usuario": 87686,
	"id_mensagem": 79837,
	"mensagem": "chat daoraa"
}

//response(201)
```

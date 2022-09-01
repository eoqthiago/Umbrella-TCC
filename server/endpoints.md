# **Admnistrador root**

## Login

### _POST /admin/usuario/login_

**request**

```json
{
	"email": "adm@umbrella.com",
	"senha": "12345"
}
```

**response (202)**

```json
{
	"token": "jsand8nasudnauifn.gemgimerigmer.dfsdncus",
	"nome": "adm"
}
```

<br>

## Cadastro de outro administrador

### _POST /admin/usuario_

**request**

```json
{
	"novoAdmin": {
		"email": "admin@umbrella.com",
		"nome": "admin",
		"senha": "12345",
		"nascimento": "2000-10-10",
		"cpf": "000.000.000-00",
		"nivelHierarquia": "root"
	}
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

<br>

## Remoção de outro administrador

### _DELETE /admin/usuario_

**request**

```json
{
	"usuarioEmail": "admin@umbrella.com"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (204)**

<br>

# **Comunidade**

## Criação de comunidade

### _POST /comunidade_

**request**

```json
{
	"nome": "Star Wars",
	"descricao": "Os maiores fãs de Star Wars",
	"imagem": "imagem.svg",
	"imagemFundo": "imagem2.svg",
	"privada": false
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**response (201)**

```json
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

**request**

```json
{
	"idUsuario": 12234,
	"motivo": "Extremismo"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (202)**

<br>

## Remoção de uma comunidade

### _DELETE /comunidade/?id=1_

**request**
**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (204)**

<br>

## Criação de canais

### _POST /comunidade/gerenciamento/canal_

**request**

```json
{
	"nome": "Geral"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (204)**

```json
{
	"id": 1,
	"canal": "Geral"
}
```

<br>

## Promover usuario

### _PUT /comunidade/1/usuario/1_

**request**

```json
{
	"nivel": "admin"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (202)**

<br>

## Banir Usuario

### _POST /comunidade/banimento_

**request**

```json
{
	"id_usuario_comunidade": 12,
	"motivo": "Spam"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

<br>

## Denunciar Usúario

### _POST /usuario/denuncia_

**request**

```json
{
	"id_usuario": 12,
	"motivo": "Bullying"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

<br>

## Remover um usuário

### _DELETE /usuario/?id=1_

**request**

```json
{
	"admEmail": "adm@umbrella.com",
	"admSenha": "12345"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

<hr>

# **Usuário**

## Login

### _POST /usuario/login_

**request**

```json
{
	"email": "usuario@dom.com",
	"senha": "12345"
}
```

**response (201)**

```json
{
	"id_usuario": 1,
	"nome": "usuario",
	"email": "usuario@dom.com",
	"token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

<br>

## Cadastro

### _POST /usuario_

**request**

```json
{
	"nome": "usuario",
	"email": "usuario@dom.com",
	"senha": "12345",
	"nascimento": "2000-10-10",
	"imagem": "imagem.svg",
	"imagem_fundo": "imagem.svg"
}
```

**response (204)**

```json
{
	"id": 1,
	"nome": "usuario"
}
```

<br>

## Alterar Perfil

### _PUT /usuario/perfil_

**request**

```json
{
	"nome": "usuario",
	"descrição": "Gosto de Star Wars e Senhor dos Anéis",
	"imagem": "imagem.svg"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

<br>

## Deleção de conta

### _DELETE /usuario/perfil_

**request**

```json
{
	"email": "usuario@dom.com",
	"senha": "12345"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response (201)**

# **Chat**

## Enviar mensagem

### _POST /mensagem/:conversa_

**request**

```json
{
	"id_usuario": 87686,
	"id_mensagem": 73246,
	"mensagem": "chat daoraa",
	"data": "2020-20-10"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response(201)**

<br>

## Excluir mensagem

### _DELETE /mensagem/:conversa_

**request**

```json
{
	"id_usuario": 87686,
	"id_mensagem": 79837,
	"mensagem": "chat daoraa"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv
}
```

**response(201)**
s

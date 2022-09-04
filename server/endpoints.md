# **Admnistrador root**

## Login

### _POST /admin/usuario/login_

**Request**

```json
{
	"email": "adm@umbrella.com",
	"senha": "12345"
}
```

**Response (202)**

```json
{
	"token": "jsand8nasudnauifn.gemgimerigmer.dfsdncus"
}
```

<br>

## Cadastro de outro administrador

### _POST /admin/usuario_

**Request**

```json
{
	"novoAdmin": {
		"email": "admin@umbrella.com",
		"nome": "admin",
		"senha": "12345",
		"nascimento": "2000-10-10",
		"cpf": "000.000.000-00",
		"root": true
	}
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (201)**

<br>

## Remoção de outro administrador

### _DELETE /admin/usuario_

**Request**

```json
{
	"usuarioEmail": "admin@umbrella.com"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

# **Comunidade**

## Criação de comunidade

### _POST /comunidade_

**Request**

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

**Response (201)**

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

## Editar comunidade

### _PUT /comunidade/:id_

**Request**

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

**Response (202)**
<br>

## Deletar comunidade

### _DELETE /comunidade/:id_

**Request**
**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Criação de canal

### _POST /comunidade/:id/canal_

**Request**

```json
{
	"nome": "Geral"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (201)**

```json
{
	"id": 1,
	"canal": "Geral"
}
```

<br>

## Editar canal

### _PUT /comunidade/:id/canal/:id_

**Request**

```json
{
	"nome": "Geral"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (202)**

<br>

## Deletar canal

### _DELETE /comunidade/:id/canal/:id_

**Request**

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Enviar mensagem

### _POST /comunidade/canal/:id/mensagem_

**Request**

```json
{
	"mensagem": "Mensagem daora"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (201)**

<br>

## Editar mensagem

### _PUT /comunidade/canal/:id/mensagem/:id_

**Request**

```json
{
	"mensagem": "Mensagem daora"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (202)**

<br>

## Deletar mensagem

### _DELETE /comunidade/canal/:id/mensagem/:id_

**Request**

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Denunciar comunidade

### _POST /comunidade/:id/denuncia_

**Request**

```json
{
	"motivo": "Extremismo"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Promover usuario

### _PUT /comunidade/:id/usuario/:id_

**Request**

```json
{
	"admin": true
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Banir Usuario

### _POST /comunidade/:id/banir_

**Request**

```json
{
	"idUsuario": 12,
	"motivo": "Spam"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<hr>

# **Usuário**

## Login

### _POST /usuario/login_

**Request**

```json
{
	"email": "usuario@dom.com",
	"senha": "12345"
}
```

**Response (202)**

```json
{
	"token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

<br>

## Cadastro

### _POST /usuario_

**Request**

```json
{
	"nome": "usuario",
	"email": "usuario@dom.com",
	"senha": "12345",
	"nascimento": "2000-10-10",
	"imagem": "imagem.svg",
	"imagemFundo": "imagem.svg"
}
```

**Response (201)**

```json
{
	"token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

<br>

## Alterar Perfil

### _PUT /usuario_

**Request**

```json
{
	"nome": "usuario",
	"descrição": "Gosto de Star Wars e Senhor dos Anéis",
	"imagem": "imagem.svg",
	"imagemFundo": "imagem.svg"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (202)**

<br>

## Deleção de conta

### _DELETE /usuario/:id_

**Request**

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (204)**

<br>

## Enviar mensagem

### _POST /conversa/:id/mensagem_

**Request**

```json
{
	"mensagem": "chat daoraa"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response(201)**

<br>

## Editar mensagem

### _PUT /conversa/:id/mensagem/:id_

**Request**

```json
{
	"mensagem": "chat daoraa"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response(202)**
<br>

## Excluir mensagem

### _DELETE /mensagem/:conversa/:id_

**Request**

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response(204)**

<br>

## Denunciar Usúario

### _POST /usuario/denuncia_

**Request**

```json
{
	"idUsuario": 12,
	"motivo": "Bullying"
}
```

**Header**

```json
{
	"x-access-token": "omefomewfiome.rgewaeragefg.eververververv"
}
```

**Response (201)**

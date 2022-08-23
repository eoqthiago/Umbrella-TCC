# **Admnistrador**

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
  "admEmail": "adm@umbrella.com",
  "admSenha": "12345",
  "email": "admin@moge.com"
}

//response (204)
```

<br>

## Remoção de uma comunidade

### _DELETE /venda/?id=1_

```json
//response (204)
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

//response (204)
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
    "id": 1,
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
    "nascimento": "2000-10-10"
}

//response (201)
{
    "id": 1,
    "nome": "usuario",
    "email": "12345"
}
```

<br>

## Deleção de conta

### _DELETE /usuario_

```json
//request
{
  "email": "usuario@dom.com",
  "senha": "12345"
}

//response (204)
```

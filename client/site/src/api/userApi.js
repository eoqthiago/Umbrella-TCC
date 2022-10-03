import axios from "axios";
import { baseUrl, userToken } from "./services";

const api = axios.create({ baseURL: baseUrl });

export async function userLogin(email, senha) {
  const r = await api.post("/usuario/login", {
    email: email,
    senha: senha,
  });
  return r.data;
}

export async function userCadastro(nome, email, senha, nascimento) {
  const r = await api.post("/usuario", {
    nome: nome,
    email: email,
    senha: senha,
    nascimento: nascimento,
  });
  return r;
}

export async function userConsulta(id) {
  const r = await api.get(`/usuario/${id}`, {
    headers: {
      "x-access-token": userToken,
    },
  });
  return r.data;
}

export async function userAlterarPassword(senha) {
  console.log(senha, userToken);
  const r = await api.put(
    "/alterar-senha",
    { senha: senha },
    {
      headers: {
        "x-access-token": userToken,
      },
    }
  );

  return r.data;
}

export async function userEmailSearch(email) {
  const r = await api.post(`/usuario/recuperar?email=${email}`, {
    email: email,
  });

  return r.data;
}

export async function userCodeSearch(codigo) {
  const r = await api.get(`/usuario/${codigo}`, {
    codigo: codigo,
  });

  return r.data;
}

export function userImagem(imagem) {
  return `${api.getUri()}/${imagem}`;
}

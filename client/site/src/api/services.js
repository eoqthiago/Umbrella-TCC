import localStorage from "local-storage";

export const userToken = localStorage("user") ? localStorage("user").token : undefined;
export const baseUrl = "http://localhost:5050";
export const BuscarComunidadeImg = (path) => `${baseUrl}/${path}`;

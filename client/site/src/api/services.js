import localStorage from "local-storage";

export const userToken = localStorage("user") ? localStorage("user").token : undefined;
export const adminToken = localStorage("admin") ? localStorage("admin").token : undefined;
export const baseUrl = "http://localhost:5050";
export const BuscarImg = (path) => `${baseUrl}/${path}`;
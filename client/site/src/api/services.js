import localStorage from "local-storage";

export const userToken = localStorage("user").token;
export const baseUrl = "http://localhost:5050";

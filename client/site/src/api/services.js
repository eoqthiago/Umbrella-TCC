import localStorage from 'local-storage';

export const userToken = localStorage('user') ? localStorage('user').token : undefined;
export const adminToken = localStorage('admin') ? localStorage('admin').token : undefined;
export const baseUrl = process.env.REACT_APP_BASE_URL ?? 'http://localhost:5050';
export const socketUrl = process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:5051';
export const BuscarImg = path =>
	typeof path == 'object' ? URL.createObjectURL(path) : `${baseUrl}/${path}`;

console.log(baseUrl, socketUrl)

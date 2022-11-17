import localStorage from 'local-storage';
import config from './config.json';

export const userToken = localStorage('user') ? localStorage('user').token : undefined;
export const adminToken = localStorage('admin') ? localStorage('admin').token : undefined;
export const baseUrl = config.base_url ?? 'http://localhost:5050';
export const socketUrl = config.socket_url ?? 'http://localhost:5051';
export const BuscarImg = path =>
	typeof path == 'object' ? URL.createObjectURL(path) : `${baseUrl}/${path}`;

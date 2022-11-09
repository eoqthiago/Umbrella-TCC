import localStorage from 'local-storage';

export const userToken = localStorage('user') ? localStorage('user').token : undefined;
export const adminToken = localStorage('admin') ? localStorage('admin').token : undefined;
export const baseUrl = 'http://192.168.0.167:5050';
export const socketUrl = 'http://192.168.0.167:5051';
export const BuscarImg = path =>
	typeof path == 'object' ? URL.createObjectURL(path) : `${baseUrl}/${path}`;

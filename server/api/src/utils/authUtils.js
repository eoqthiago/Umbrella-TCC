import jwt from 'jsonwebtoken';

export const verifyToken = token => {
	try {
		const r = jwt.verify(token, process.env.JWT_KEY);
		if (!r) return false;
		return r;
	} catch (err) {
		return false;
	}
};

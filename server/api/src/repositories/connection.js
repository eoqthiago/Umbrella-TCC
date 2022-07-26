import mysql from "mysql2/promise";

const con = await mysql.createConnection({
	user: process.env.MYSQL_USER,
	host: process.env.MYSQL_HOST,
	password: process.env.MYSQL_PWD,
	database: process.env.MYSQL_DB,
	multipleStatements: true,
	typeCast: function (field, next) {
		if (field.type === "TINY" && field.length === 1) return field.string() === "1";
		else return next();
	},
});

export default con;

const mysql = require("mysql2/promise");

class DatabaseHelper {
	/**
	 * @type {mysql.Connection}
	 */
	static conn;

	static async createConnection() {

		this.conn = await mysql.createConnection({
			host: "localhost",
			port: 3307,
			user: "root",
			password: "etecjau",
			database: "db_garagem",
		});

		await this.conn.connect();
	}

	static async endConnection() {
		await this.conn.end();
	}

	/**
	 * @param {string} sql 
	 * @param {string} values 
	 */
	static async createQuery(sql, values)
	{
		this.createConnection();

		const [rows, fields] = await this.conn.execute(sql, values);

		this.endConnection();

		return [rows, fields];
	}
}

module.exports = {
	DatabaseHelper
}
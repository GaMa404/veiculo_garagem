const mysql = require("mysql2/promise");

class DatabaseHelper {

	/** @type {mysql.Connection} */
	static conn;

	// Cria a conexão com o banco de dados.
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

	// Encerra a conexão com o banco de dados.
	static async endConnection() {
		await this.conn.end();
	}

	/**
	 * @param {string} sql 
	 * @param {string} values
	 * 
	 * Abre uma conexão, executa o comando sql e fecha a conexão, e retorna as linhas e campos.
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
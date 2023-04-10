const mysql = require("mysql2/promise");

class DatabaseHelper
{
	static conn;

	static async createConnection()
	{
		this.conn = await mysql.createConnection({
			host: "localhost",
			port: 3307,
			user: "root",
			password: "etecjau",
			database: "db_garagem",
		});

		await this.conn.connect();
	}

	static async endConnection()
	{
		await this.conn.end();
	}

	static async createBaseQuery(sql, values)
	{
		await this.createConnection();
		
		const [rows, fields] = await this.conn.execute(sql, values);

		await this.endConnection();

		return [rows, fields];
	}

	static async createQuery(sql, values)
	{
		await this.createConnection();

		const [rows, fields] = await this.createBaseQuery(sql, values);

		await this.endConnection();

		return [rows, fields];
	}
}

module.exports = {
	DatabaseHelper
}
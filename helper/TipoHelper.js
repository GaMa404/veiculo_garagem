const { DatabaseHelper } = require("./DatabaseHelper");

class TipoHelper extends DatabaseHelper
{
	static async selectTipos()
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`SELECT t.id, t.* FROM Tipo t`
		);

		await super.endConnection();

		return rows;
	}

	static async selectTipoById(id)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`SELECT * FROM Tipo WHERE id = ?`,
			[id]
		);

		await super.endConnection();

		return rows;
	}

	static async updateTipo(id, descricao)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`UPDATE Tipo SET descricao = ? WHERE id = ?`,
			[descricao, id]
		);

		await super.endConnection();
	}

	static async insertTipo(descricao)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`INSERT INTO Tipo(descricao) VALUES (?)`,
			[descricao]
		);

		await super.endConnection();
	}
}

module.exports = {
	TipoHelper
}
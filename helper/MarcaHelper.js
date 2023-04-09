const { DatabaseHelper } = require("./DatabaseHelper");

class MarcaHelper extends DatabaseHelper
{
	static async selectMarcas() {
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`SELECT m.id, m.* FROM Marca m`
		);

		await super.endConnection();

		return rows;
	}

	static async insertMarca(descricao, fabricante)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`INSERT INTO Marca(descricao, fabricante) VALUES(?, ?)`,
			[descricao, fabricante]
		);

		await super.endConnection();
	}

	static async selectMarcaById(id)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`SELECT * FROM Marca WHERE id = ?`, [id]
		);

		await super.endConnection();
			console.log(rows);
		return rows;
	}

	static async updateMarca(id, descricao, fabricante)
	{
		await super.createConnection();

		const [rows, fields] = await super.createQuery(
			`UPDATE Marca SET descricao = ?, fabricante = ? WHERE id = ?`, [descricao, fabricante, id]
		);

		await super.endConnection();
	}
}

module.exports = {
	MarcaHelper
}
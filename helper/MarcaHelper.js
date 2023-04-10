const { DatabaseHelper } = require("./DatabaseHelper");

class MarcaHelper extends DatabaseHelper
{
	static async selectMarcas() {
		const [rows, fields] = await super.createQuery(
			`SELECT m.id, m.* FROM Marca m`
		);

		return rows;
	}

	static async insertMarca(descricao, fabricante)
	{
		const [rows, fields] = await super.createQuery(
			`INSERT INTO Marca(descricao, fabricante) VALUES(?, ?)`,
			[descricao, fabricante]
		);
	}

	static async selectMarcaById(id)
	{
		const [rows, fields] = await super.createQuery(
			`SELECT * FROM Marca WHERE id = ?`, [id]
		);

		return rows;
	}

	static async updateMarca(id, descricao, fabricante)
	{
		const [rows, fields] = await super.createQuery(
			`UPDATE Marca SET descricao = ?, fabricante = ? WHERE id = ?`, [descricao, fabricante, id]
		);
	}

	static async deleteMarca(id)
	{
		const [rows, fields] = await super.createQuery(
			`DELETE FROM Marca WHERE id = ?`,
			[id]
		);

		return rows;
	}
}

module.exports = {
	MarcaHelper
}
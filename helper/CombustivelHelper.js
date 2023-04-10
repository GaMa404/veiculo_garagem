const { DatabaseHelper } = require("./DatabaseHelper");

class CombustivelHelper extends DatabaseHelper
{
	static async selectCombustiveis()
	{
		const [rows] = await super.createQuery(
			`SELECT c.id, c.* FROM Combustivel c`
		);

		return rows;
	}

	
	static async selectCombustivelById(id)
	{
		const [rows, fields] = await super.createQuery(
			`SELECT * FROM Combustivel WHERE id = ?`,
			[id]
		);

		return rows;
	}

	static async updateCombustivel(id, descricao)
	{
		const [rows, fields] = await super.createQuery(
			`UPDATE Combustivel SET descricao = ? WHERE id = ?`,
			[descricao, id]
		);
	}

	static async insertCombustivel(descricao)
	{
		const [rows, fields] = await super.createQuery(
			`INSERT INTO Combustivel(descricao) VALUES (?)`,
			[descricao]
		);
	}

	static async deleteCombustivel(id)
	{
		const [rows, fields] = await super.createQuery(
			`DELETE FROM Combustivel WHERE id = ?`,
			[id]
		);

		return rows;
	}
}

module.exports = {
	CombustivelHelper
}
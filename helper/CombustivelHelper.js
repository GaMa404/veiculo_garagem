const { DatabaseHelper } = require("./DatabaseHelper");

class CombustivelHelper extends DatabaseHelper
{
	static async selectCombustiveis() {
		await super.createConnection();

		const [rows] = await super.createQuery(`SELECT c.id, c.* FROM Combustivel c`);

		await super.endConnection();

		return rows;
	}
}

module.exports = {
	CombustivelHelper
}
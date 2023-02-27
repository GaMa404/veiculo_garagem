const { DatabaseHelper } = require("./DatabaseHelper");

class MarcaHelper extends DatabaseHelper
{
	static async selectMarcas() {
		await super.createConnection();

		const [rows, fields] = await super.createQuery(`SELECT m.id, m.* FROM Marca m`);

		await super.endConnection();

		return rows;
	}
}

module.exports = {
	MarcaHelper
}
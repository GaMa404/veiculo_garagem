const { DatabaseHelper } = require("./DatabaseHelper");

class TipoHelper extends DatabaseHelper
{
	static async selectTipos() {
		await super.createConnection();

		const [rows, fields] = await super.createQuery(`SELECT t.id, t.* FROM Tipo t`);

		await super.endConnection();

		return rows;
	}
}

module.exports = {
	TipoHelper
}
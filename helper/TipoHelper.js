const { DatabaseHelper } = require("./DatabaseHelper");

class TipoHelper extends DatabaseHelper {
	static async selectTipos() {
		const [rows, fields] = await super.createQuery(
			`SELECT t.id, t.* FROM Tipo t`
		);

		return rows;
	}

	static async selectTipoById(id) {
		const [rows, fields] = await super.createQuery(
			`SELECT * FROM Tipo WHERE id = ?`,
			[id]
		);

		return rows;
	}

	static async updateTipo(id, descricao) {
		const [rows, fields] = await super.createQuery(
			`UPDATE Tipo SET descricao = ? WHERE id = ?`,
			[descricao, id]
		);
	}

	static async insertTipo(descricao) {
		const [rows, fields] = await super.createQuery(
			`INSERT INTO Tipo(descricao) VALUES (?)`,
			[descricao]
		);
	}

	static async deleteTipo(id) {
		const [rows, fields] = await super.createQuery(
			`DELETE FROM Tipo WHERE id = ?`,
			[id]
		);

		return rows;
	}
}

module.exports = {
	TipoHelper
}
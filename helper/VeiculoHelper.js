const { DatabaseHelper } = require("./DatabaseHelper");

class VeiculoHelper extends DatabaseHelper {
	static async selectVeiculos() {
		let sql = `
		SELECT v.*, v.id AS veiculo_id,
			c.*, c.descricao AS combustivel_descricao,
			m.*, m.descricao AS marca_descricao,
			t.*, t.descricao AS tipo_descricao
		FROM Veiculo v
		JOIN Combustivel c ON (c.id = v.id_combustivel)
		JOIN Marca m ON (m.id = v.id_marca)
		JOIN Tipo t ON (t.id = v.id_tipo)
		GROUP BY v.id
		`;

		const [rows, fields] = await super.createQuery(sql);

		return rows;
	}

	static async updateVeiculo(veiculo) {
		let sql = `
		UPDATE Veiculo
			SET id_marca = ?,
				id_tipo = ?,
				id_combustivel = ?,
				modelo = ?,
				ano = ?,
				cor = ?,
				numero_chassi = ?,
				quilometragem = ?,
				revisao = ?,
				sinistro = ?,
				roubo_furto = ?,
				aluguel = ?,
				venda = ?,
				particular = ?,
				observacoes = ?
			WHERE id = ?
		`;

		const [rows, fields] = await super.createQuery(sql,
			[
				veiculo.id_marca,
				veiculo.id_tipo,
				veiculo.id_combustivel,
				veiculo.modelo,
				veiculo.ano,
				veiculo.cor,
				veiculo.numero_chassi,
				veiculo.quilometragem,
				veiculo.revisao,
				veiculo.sinistro,
				veiculo.roubo_furto,
				veiculo.aluguel,
				veiculo.venda,
				veiculo.particular,
				veiculo.observacoes,
				veiculo.id
			]);

		return rows;
	}

	static async selectVeiculoById(id) {
		let sql = `
		SELECT v.*, v.id AS veiculo_id,
			c.*, c.descricao AS combustivel_descricao,
			m.*, m.descricao AS marca_descricao,
			t.*, t.descricao AS tipo_descricao
		FROM Veiculo v
		JOIN Combustivel c ON (c.id = v.id_combustivel)
		JOIN Marca m ON (m.id = v.id_marca)
		JOIN Tipo t ON (t.id = v.id_tipo)
		WHERE v.id = ?
		`;

		const [rows, fields] = await super.createQuery(sql, [id]);

		return rows;
	}

	static async insertVeiculo(veiculo) {
		let sql = `INSERT INTO Veiculo (
			id_marca,
			id_tipo,
			id_combustivel,
			modelo,
			ano,
			cor,
			numero_chassi,
			quilometragem,
			revisao,
			sinistro,
			roubo_furto,
			aluguel,
			venda,
			particular,
			observacoes
		) VALUES (
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			?
		);`;

		await super.createQuery(sql, [
			veiculo.id_marca,
			veiculo.id_tipo,
			veiculo.id_combustivel,
			veiculo.modelo,
			veiculo.ano,
			veiculo.cor,
			veiculo.numero_chassi,
			veiculo.quilometragem,
			veiculo.revisao,
			veiculo.sinistro,
			veiculo.roubo_furto,
			veiculo.aluguel,
			veiculo.venda,
			veiculo.particular,
			veiculo.observacoes
		]).catch((e) => {
			console.log("Rejected: " + e);
		});
	}

	static async deleteVeiculo(id) {
		const [rows, fields] = await super.createQuery(
			`DELETE FROM Veiculo WHERE id = ?`,
			[id]
		);

		return rows;
	}
}

module.exports = {
	VeiculoHelper
}
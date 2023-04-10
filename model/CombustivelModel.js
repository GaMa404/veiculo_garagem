const { CombustivelHelper } = require("../helper/CombustivelHelper");
const { TypeUtils } = require("../utils/utils");

class Combustivel {
	id;
	descricao;

	constructor(id, descricao) {
		this.id = id;
		this.descricao = descricao;
	};
}

class CombustivelModel extends TypeUtils {
	/**
	 * @example
	 * let combustiveis = await CombustivelHelper.getCombustiveis();
	 * 
	 * // Para cada combustível, será impressa no
	 * // console uma mensagem contendo a descrição do combustível.
	 * combustiveis.forEach((c) => {
	 * 	console.log(c.descricao);
	 * });
	 * 
	 * @returns {Promise<Combustivel[]>}
	 */
	static async getCombustiveis() {
		const combustiveis = [];

		const _combustiveis = await CombustivelHelper.selectCombustiveis();

		_combustiveis.forEach((c) => {
			combustiveis.push(super.unboxing(Combustivel, c));
		});

		return combustiveis;
	}

	static async addCombustivel(descricao) {
		await CombustivelHelper.insertCombustivel(descricao);
	}

	static async getCombustivelById(id) {
		const combustivel = await CombustivelHelper.selectCombustivelById(id);


		return super.unboxing(Combustivel, combustivel[0]);
	}

	static async updateCombustivel(id, descricao) {
		await CombustivelHelper.updateCombustivel(id, descricao);
	}

	static async removeCombustivel(id) {
		await CombustivelHelper.deleteCombustivel(id);
	}
}

module.exports = {
	CombustivelModel,
	Combustivel
}
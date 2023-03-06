const { MarcaHelper } = require("../helper/MarcaHelper");
const { TypeUtils } = require("../utils/utils");

// Base
class Marca {
	id;
	descricao;
	fabricante;
	constructor(id, descricao, fabricante) {
		this.id = id;
		this.descricao = descricao;
		this.fabricante = fabricante;
	}
}

class MarcaModel extends TypeUtils {
	/**
	 * @example
	 * let marcas = await MarcaModel.getVeiculos();
	 * 
	 * // Para cada marca, será impressa no
	 * // console uma mensagem contendo a descrição da marca.
	 * marcas.forEach((m) => {
	 * 	console.log(m.descricao)
	 * });
	 *
	 * @returns {Promise<Marca[]>}
	 */
	static async getMarcas() {
		const marcas = [];

		const _marcas = await MarcaHelper.selectMarcas();

		_marcas.forEach((m) => {
			marcas.push(super.unboxing(Marca, m));
		});

		return marcas;
	}
}

module.exports = {
	MarcaModel,
	Marca
}
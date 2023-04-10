const { MarcaHelper } = require("../helper/MarcaHelper");
const { TypeUtils } = require("../utils/utils");

class Marca
{
	id;
	descricao;
	fabricante;
	constructor(id, descricao, fabricante) {
		this.id = id;
		this.descricao = descricao;
		this.fabricante = fabricante;
	}
}

class MarcaModel extends TypeUtils
{
	/**
	 * @example
	 * let marcas = await MarcaModel.getMarcas();
	 * 
	 * // Para cada marca, será impressa no
	 * // console uma mensagem contendo a descrição da marca.
	 * marcas.forEach((m) => {
	 * 	console.log(m.descricao)
	 * });
	 *
	 * @returns {Promise<Marca[]>}
	 */
	static async getMarcas()
	{
		const marcas = [];

		const _marcas = await MarcaHelper.selectMarcas();

		_marcas.forEach((m) => {
			marcas.push(super.unboxing(Marca, m));
		});

		return marcas;
	}

	static async addMarca(descricao, fabricante)
	{
		await MarcaHelper.insertMarca(descricao, fabricante);
	}

	static async getMarcaById(id)
	{
		const _marca = await MarcaHelper.selectMarcaById(id);

		const marca = super.unboxing(Marca, _marca[0]);

		return marca;
	}

	static async updateMarca(id, descricao, fabricante)
	{
		await MarcaHelper.updateMarca(id, descricao, fabricante);
	}

	static async removeMarca(id)
	{
		await MarcaHelper.deleteMarca(id)
	}
}

module.exports = {
	MarcaModel,
	Marca
}
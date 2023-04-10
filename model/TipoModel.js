const { TipoHelper } = require("../helper/TipoHelper");
const { TypeUtils } = require("../utils/utils");

class Tipo
{
	id;
	descricao;
	constructor(id, descricao)
	{
		this.id = id;
		this.descricao = descricao;
	}
}

class TipoModel extends TypeUtils
{
	/**
	 * @example
	 * let tipos = await TipoModel.getTipos();
	 * 
	 * // Para cada tipo de veículo, será impressa no
	 * // console uma mensagem contendo a descrição do tipo.
	 * tipos.forEach((t) => {
	 * 	console.log(t.descricao)
	 * });
	 *
	 * @returns {Promise<Tipo[]>}
	 */
	static async getTipos()
	{
		const tipos = [];

		const _tipos = await TipoHelper.selectTipos();

		_tipos.forEach((t) => {
			tipos.push(super.unboxing(Tipo, t));
		});

		return tipos;
	}

	static async addTipo(descricao)
	{
		await TipoHelper.insertTipo(descricao);
	}

	static async getTipoById(id)
	{
		const tipo = await TipoHelper.selectTipoById(id);

		
		return super.unboxing(Tipo, tipo[0]);
	}

	static async updateTipo(id, descricao)
	{
		await TipoHelper.updateTipo(id, descricao);
	}

	static async removeTipo(id)
	{
		await TipoHelper.deleteTipo(id);
	}
}

module.exports = {
	TipoModel,
	Tipo
}
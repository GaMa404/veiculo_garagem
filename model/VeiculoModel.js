const { VeiculoHelper } = require("../helper/VeiculoHelper");
const { TypeUtils } = require("../utils/utils");

class Veiculo
{
	veiculo_id;
	id_marca;
	marca_descricao;
	id_tipo;
	fabricante;
	tipo_descricao;
	id_combustivel;
	combustivel_descricao;
	modelo;
	ano;
	cor;
	numero_chassi;
	quilometragem;
	revisao;
	sinistro;
	roubo_furto;
	aluguel;
	venda;
	particular;
	observacoes;

	constructor(id, id_marca, id_tipo, id_combustivel, modelo, ano, cor, numero_chassi, quilometragem, revisao, sinistro, roubo_furto, aluguel, venda, particular, observacoes)
	{
		this.veiculo_id = id;
		this.id_marca = id_marca;
		this.id_tipo = id_tipo;
		this.id_combustivel = id_combustivel;
		this.modelo = modelo;
		this.ano = ano;
		this.cor = cor;
		this.numero_chassi = numero_chassi;
		this.quilometragem = quilometragem;
		this.revisao = revisao;
		this.sinistro = sinistro;
		this.roubo_furto = roubo_furto;
		this.aluguel = aluguel;
		this.venda = venda;
		this.particular = particular;
		this.observacoes = observacoes;
	}
}


class VeiculoModel extends TypeUtils
{
	/**
	 * @example
	 * let veiculos = await VeiculoModel.getVeiculos();
	 * 
	 * // Para cada veículo, será impressa no
	 * // console uma mensagem contendo o modelo de veículo.
	 * veiculos.forEach((veiculo) => {
	 * 	console.log(veiculo.modelo)
	 * });
	 * 
	 * @returns {Promise<Veiculo[]>}
	 */
	static async getVeiculos()
	{
		const veiculos = [];

		const _veiculos = await VeiculoHelper.selectVeiculos();

		_veiculos.forEach((v) => {
			veiculos.push(super.unboxing(Veiculo, v));
		});

		return veiculos;
	}

	static async getVeiculoById(id)
	{
		const veiculos = [];

		const _veiculos = await VeiculoHelper.selectVeiculoById(id);

		_veiculos.forEach((v) => {
			veiculos.push(super.unboxing(Veiculo, v));
		});

		return veiculos[0];
	}

	/**
	 * @param {Veiculo} veiculo 
	 */
	static async addVeiculo(veiculo)
	{
		await VeiculoHelper.insertVeiculo(veiculo);
	}

	static async updateVeiculo(veiculo)
	{
		await VeiculoHelper.updateVeiculo(veiculo);
	}

	static async removeVeiculo(id) {
		await VeiculoHelper.deleteVeiculo(id);
	}
}

module.exports = {
	VeiculoModel,
	Veiculo
}
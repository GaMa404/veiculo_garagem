const { VeiculoHelper } = require("../helper/VeiculoHelper");
const { TypeUtils } = require("../utils/utils");

class Veiculo {
	id;
	id_marca;
	id_tipo;
	id_combustivel;
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

	constructor(id, id_marca, id_tipo, id_combustivel, modelo, ano, cor, numero_chassi, quilometragem, revisao, sinistro, roubo_furto, aluguel, venda, particular, observacoes) {
		this.id = id;
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


class VeiculoModel extends TypeUtils {
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
	static async getVeiculos() {
		const veiculos = [];

		const _veiculos = await VeiculoHelper.selectVeiculos();

		_veiculos.forEach((v) => {
			veiculos.push(super.unboxing(Veiculo, v));
		});

		return veiculos;
	}

	/**
	 * @param {Veiculo} veiculo 
	 */
	static async addVeiculo(veiculo) {
		await VeiculoHelper.insertVeiculo(veiculo);
	}
}

module.exports = {
	VeiculoModel,
	Veiculo
}
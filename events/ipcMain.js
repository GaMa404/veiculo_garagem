const { Veiculo, VeiculoModel } = require("../model/VeiculoModel");
const { Marca, MarcaModel } = require("../model/MarcaModel");
const { Tipo, TipoModel } = require("../model/TipoModel");
const { Combustivel, CombustivelModel } = require("../model/CombustivelModel");

const { TypeUtils, AppUtils } = require("../utils/utils")

module.exports = [
	{
		name: "toMain",
		execute: async (event, args) => {
			switch (args.command) {
				case "insert": {

					if (args.type == "veiculo") {
						const veiculo = TypeUtils.unboxing(Veiculo, args.data);

						await VeiculoModel.addVeiculo(veiculo);

						AppUtils.notify({
							title: "Veiculo adicionado!",
							body: `Veículo de modelo "${veiculo.modelo}" foi adicionado!`
						});

					}
					else if (args.type == "marca") {
						const marca = TypeUtils.unboxing(Marca, args.data);

						await MarcaModel.addMarca(marca.descricao, marca.fabricante);

						AppUtils.notify({
							title: "Marca adicionada!",
							body: `Marca "${marca.descricao}" foi adicionada!`
						});
					}
					else if (args.type == "tipo") {
						const tipo = TypeUtils.unboxing(Tipo, args.data);

						await TipoModel.addTipo(tipo.descricao);

						AppUtils.notify({
							title: "Tipo adicionado!",
							body: `Tipo "${tipo.descricao}" foi adicionado!`
						});
					}
					else if (args.type == "combustivel") {
						const combustivel = TypeUtils.unboxing(Combustivel, args.data);

						await CombustivelModel.addCombustivel(combustivel.descricao);

						AppUtils.notify({
							title: "Combustível adicionado!",
							body: `Combustível "${combustivel.descricao}" foi adicionado!`
						});
					}

					break;
				}

				case "update": {

					if (args.type == "veiculo") {
						await VeiculoModel.updateVeiculo(args.data);

						AppUtils.notify({
							title: "Veiculo editado!",
							body: `Veículo ID "${args.data.id}" foi editado!`
						});
					}
					else if (args.type == "marca") {
						await MarcaModel.updateMarca(args.data.id, args.data.descricao, args.data.fabricante);

						AppUtils.notify({
							title: "Marca editada!",
							body: `Marca ID "${args.data.id}" foi editada!`
						});
					}
					else if (args.type == "tipo") {
						await TipoModel.updateTipo(args.data.id, args.data.descricao);

						AppUtils.notify({
							title: "Tipo editado!",
							body: `Tipo ID "${args.data.id}" foi editado!`
						});
					}
					else if (args.type == "combustivel") {
						await CombustivelModel.updateCombustivel(args.data.id, args.data.descricao);

						AppUtils.notify({
							title: "Combustível editado!",
							body: `Combustível ID "${args.data.id}" foi editado!`
						});
					}

					break;
				}

				case "delete": {

					if (args.type == "veiculo") {
						await VeiculoModel.removeVeiculo(args.data);

						AppUtils.notify({
							title: "Veiculo removido!",
							body: `Veículo ID "${args.data}" foi excluído!`
						});
					}
					else if (args.type == "marca") {
						try {
							await MarcaModel.removeMarca(args.data);

							AppUtils.notify({
								title: "Marca removida!",
								body: `Marca ID "${args.data}" foi excluída!`
							});
						} catch (e) {
							AppUtils.notify({
								title: "Não foi possível remover a Marca",
								body: "Existem veículos cadastrados com essa marca."
							});
						}
					}
					else if (args.type == "tipo") {
						try {
							await TipoModel.removeTipo(args.data);

							AppUtils.notify({
								title: "Tipo removido!",
								body: `Tipo ID "${args.data}" foi removido!`
							});
						} catch (e) {
							AppUtils.notify({
								title: "Não foi possível remover o Tipo",
								body: `Existem veículos cadastrados com esse Tipo.`
							});
						}
					}
					else if (args.type == "combustivel") {
						try {
							await CombustivelModel.removeCombustivel(args.data);	

							AppUtils.notify({
								title: "Combustível removido!",
								body: `Combustível ID "${args.data}" foi removido!`
							});
						} catch (e) {
							AppUtils.notify({
								title: "Não foi possível remover o Combustível",
								body: `Existem veículos cadastrados com esse Combustível`
							});
						}
					}

					break;
				}

				default:
					break;
			}
		}
	}
]
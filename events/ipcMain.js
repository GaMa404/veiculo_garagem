const { Notification } = require("electron");

const { Veiculo, VeiculoModel } = require("../model/VeiculoModel");
const { Marca, MarcaModel } = require("../model/MarcaModel");

const { TypeUtils, AppUtils } = require("../utils/utils")

module.exports = [
	{
		name: "toMain",
		execute: async (event, args) => {
			switch (args.command) {
				case "insert": {

					if (args.type == "veiculo")
					{
						const veiculo = TypeUtils.unboxing(Veiculo, args.data);

						await VeiculoModel.addVeiculo(veiculo);

						AppUtils.notify({
							title: "Veiculo adicionado!",
							body: `Veículo de modelo "${veiculo.modelo}" foi adicionado!`
						});

					}
					else if (args.type == "marca")
					{
						const marca = TypeUtils.unboxing(Marca, args.data);

						await MarcaModel.addMarca(marca.descricao, marca.fabricante);

						AppUtils.notify({
							title: "Marca adicionada!",
							body: `Marca "${marca.descricao}" foi adicionada!`
						});
					}

					break;
				}

				case "update": {

					if (args.type == "veiculo")
					{
						await VeiculoModel.updateVeiculo(args.data);
	
						AppUtils.notify({
							title: "Veiculo editado!",
							body: `Veículo ID "${args.id}" foi editado!`
						});
					}
					else if (args.type == "marca")
					{
						console.log(args);
						await MarcaModel.updateMarca(args.data.id, args.data.descricao, args.data.fabricante);
						
						AppUtils.notify({
							title: "Marca editada!",
							body: `Marca ID "${args.data.id}" foi editada!`
						});
					}

					break;
				}

				default:
					break;
			}
		}
	}
]
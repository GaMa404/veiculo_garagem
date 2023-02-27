const { Notification } = require("electron");
const { Veiculo, VeiculoModel } = require("../model/VeiculoModel")
const { TypeUtils } = require("../utils/utils")

module.exports = [
	{
		name: "toMain",
		execute: async (event, args) => {
			if (args.command == "insert") {
				const veiculo = TypeUtils.unboxing(Veiculo, args.data);

				await VeiculoModel.addVeiculo(veiculo);

				const notification = new Notification({
					title: "Veiculo adicionado!",
					body: `Veículo de modelo "${veiculo.modelo}" foi adicionado!`
				});

				notification.show();
			}
		}
	}
]
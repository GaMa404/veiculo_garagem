const { BrowserWindow, ipcMain } = require("electron");
const { CombustivelModel } = require("./model/CombustivelModel");
const { MarcaModel } = require("./model/MarcaModel");
const { TipoModel } = require("./model/TipoModel");
const { VeiculoModel } = require("./model/VeiculoModel");

const path = require("path");

// Função responsável por renderizar a interface.
const createWindow = () => {

	// Criando uma nova instância de BrowserWindow, ou seja, a janela da nossa aplicação.
	const win = new BrowserWindow({
		title: "FormVeiculo",
		width: 1024,
		height: 768,
		center: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
			spellcheck: false,
		},
		roundedCorners: true,
		darkTheme: false,
	});

	//win.setMenu(null);

	// Renderizando o arquivo listar.html na janela.
	win.loadFile(path.join("./pages/veiculo/form", "form.html"));

	ipcMain.on("toMain", async (event, args) => {
		switch (args.command) {

			case "getData":
				win.webContents.send("fromMain", {
					command: "newVehicle",
					combustiveis: await CombustivelModel.getCombustiveis(),
					marcas: await MarcaModel.getMarcas(),
					tipos: await TipoModel.getTipos(),
					veiculos: await VeiculoModel.getVeiculos()
				});

			break;

			case "getVehicles":

				win.webContents.send("fromMain", {
					veiculos: await VeiculoModel.getVeiculos(),
				});

			break;

			case "getMarcas":

				win.webContents.send("fromMain", {
					marcas: await MarcaModel.getMarcas(),
				});

			break;
			
			case "addMarca":
				win.webContents.send("fromMain", {
					command: "newMarca"
				})
			break;

			case "getDataToEdit":
				if (args.type == "veiculo") {
					let veiculo = await VeiculoModel.getVeiculoById(args.data);

					let auxiliarData = {
						combustiveis: await CombustivelModel.getCombustiveis(),
						marcas: await MarcaModel.getMarcas(),
						tipos: await TipoModel.getTipos(),
					};

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: veiculo,
						auxiliarData: auxiliarData
					});
				}
				else if (args.type == "marca") {
					console.log("atualizar o id " + args.data);
					
					let marca = await MarcaModel.getMarcaById(args.data);

					console.log(marca);

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: marca
					});
				}

			break;


			default:
				break;
		}
	})
}

module.exports = {
	createWindow
}
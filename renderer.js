const { BrowserWindow, ipcMain } = require("electron");
const { CombustivelModel } = require("./model/CombustivelModel");
const { MarcaModel } = require("./model/MarcaModel");
const { TipoModel } = require("./model/TipoModel");
const { VeiculoModel } = require("./model/VeiculoModel");

const path = require("path");

/**
 * Função responsável por renderizar a interface.
 */
const createWindow = () => {

	/**
	 * Criando uma nova instância de BrowserWindow, ou seja, a janela da nossa aplicação.
	 */
	const win = new BrowserWindow({
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

	/**
	 * Renderizando o arquivo index.html na janela.
	 */
	win.loadFile(path.join("./pages", "listar.html"));

	/**
	 * Quando os componentes DOM estiverem renderizados, envie os dados de veículos.
	 */
	ipcMain.on("toMain", async (event, args) => {
		if (args.command == "getData")
		{
			win.webContents.send("fromMain", {
				command: "newVehicle",
				combustiveis: await CombustivelModel.getCombustiveis(),
				marcas: await MarcaModel.getMarcas(),
				tipos: await TipoModel.getTipos(),
				veiculos: await VeiculoModel.getVeiculos()
			});
		}
		else if (args.command == "getVehicles")
		{
			win.webContents.send("fromMain", {
				veiculos: await VeiculoModel.getVeiculos(),
			});
		}
		else if (args.command == "getDataToEdit")
		{
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
			})
		}
	})
}

module.exports = {
	createWindow
}
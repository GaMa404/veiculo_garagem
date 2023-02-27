const { BrowserWindow } = require("electron");
const { CombustivelModel } = require("./model/CombustivelModel");
const { MarcaModel } = require("./model/MarcaModel");
const { TipoModel } = require("./model/TipoModel");
const { VeiculoModel } = require("./model/VeiculoModel");

const path = require("path");

/**
 * Função responsável por renderizar a interface.
 */
const createWindow = () => {
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

	win.setMenu(null);

	win.loadFile(path.join("./pages", "index.html"));

	win.webContents.once('did-finish-load', async () => {
		win.webContents.send("fromMain", {
			combustiveis: await CombustivelModel.getCombustiveis(),
			marcas: await MarcaModel.getMarcas(),
			tipos: await TipoModel.getTipos(),
			veiculos: await VeiculoModel.getVeiculos()
		});
	});
}

module.exports = {
	createWindow
}
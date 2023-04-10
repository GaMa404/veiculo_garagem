// Importando algumas propriedades do electron
const { app, ipcMain } = require("electron");

const appEvents = require("./events/app");

appEvents.forEach((ev) => {
	app.on(ev.name, (...args) => {
		ev.execute(...args)
	});
});

const ipcMainEvents = require("./events/ipcMain");

// Carregando eventos responsáveis por update/inserts
ipcMainEvents.forEach((ev) => {
	ipcMain.on(ev.name, (...args) => {
		ev.execute(...args);
	});
});
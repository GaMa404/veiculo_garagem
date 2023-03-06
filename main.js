// Importando algumas propriedades do electron
const { app, ipcMain } = require("electron");

const appEvents = require("./events/app");

/**
 * "Ouvindo" os eventos de (app)
 */
appEvents.forEach((ev) => {
	app.on(ev.name, (...args) => {
		ev.execute(...args)
	});
});

const ipcMainEvents = require("./events/ipcMain");

/**
 * Ouvindo os eventos de (ipcMain)
 */
ipcMainEvents.forEach((ev) => {
	ipcMain.on(ev.name, (...args) => {
		ev.execute(...args);
	});
});
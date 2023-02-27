const { app, ipcMain } = require("electron");

const appEvents = require("./events/app");

appEvents.forEach((ev) => {
	app.on(ev.name, (...args) => {
		ev.execute(...args)
	});
});

const ipcMainEvents = require("./events/ipcMain");

ipcMainEvents.forEach((ev) => {
	ipcMain.on(ev.name, (...args) => {
		ev.execute(...args);
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});
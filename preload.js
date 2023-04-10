const { contextBridge, ipcRenderer } = require("electron");

/**
 * Definir as funções para enviar dados entre o front-end e o back-end
 */
contextBridge.exposeInMainWorld(
	"api", {
	send: (channel, data) => {
		let validChannels = ["toMain"];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = ["fromMain"];

		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	}
})
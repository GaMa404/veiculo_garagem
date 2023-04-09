const { app } = require("electron");
const { createWindow } = require("../renderer");

module.exports = [
	{
		name: "window-all-closed",
		execute() {
			if (process.plataform !== "darwin")
				app.quit();
		}
	},
	{
		name: "ready",
		execute() {
			createWindow();

			app.on("activate", () => {
				if (BrowserWindow.getAllWindows().length === 0)
					createWindow();
			});
		}
	}
]
const { shell, BrowserWindow } = require("electron")

module.exports = (app) => [
	{
		label: "History",
		click: async () => {
			const smallWin = new BrowserWindow({
				width: 300,
				height: 400,
				autoHideMenuBar: true,
				show: false,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
					webviewTag: true,
					nodeIntegrationInWorker: true,
					nodeIntegrationInSubFrames: true,
				},
			})
			smallWin.loadFile("history.html")
			smallWin.webContents.openDevTools()
			smallWin.on("ready-to-show", () => smallWin.show())
		},
	},
]

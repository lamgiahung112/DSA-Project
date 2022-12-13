const { shell, BrowserWindow } = require("electron")

module.exports = (app) => [
	{
		label: "History",
		click: async () => {
			const smallWin = new BrowserWindow({
				width: 1280,
				height: 720,
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
			smallWin.webContents.openDevTools()
			smallWin.loadFile("history.html")
			smallWin.on("ready-to-show", () => smallWin.show())
		},
	},
	{
		label: "Bookmark",
		click: async () => {
			const smallWin = new BrowserWindow({
				width: 1280,
				height: 720,
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
			smallWin.loadFile("bookmark.html")
			smallWin.webContents.openDevTools()
			smallWin.on("ready-to-show", () => smallWin.show())
		},
	},
]

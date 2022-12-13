const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")

const menuTemplate = require("./menu")(app)

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 810,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webviewTag: true,
			nodeIntegrationInWorker: true,
			nodeIntegrationInSubFrames: true,
		},
	})
	// mainWindow.webContents.openDevTools()
	mainWindow.loadFile("index.html")
}

app.whenReady().then(() => {
	createWindow()

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})

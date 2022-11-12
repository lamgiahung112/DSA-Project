const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")

const menuTemplate = require("./menu")(app)

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, "browser-script.js"),
			nodeIntegration: true,
			webviewTag: true,
			devTools: true,
		},
	})
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

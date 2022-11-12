const { shell, BrowserWindow } = require("electron")

module.exports = (app) => [
	{
		label: "Source code",
		click: async () => {
			// await shell.openExternal("https://github.com/lamgiahung112/DSA-Project")
			const smallWin = new BrowserWindow({
				width: 300,
				height: 400,
				autoHideMenuBar: true,
				show: false,
			})
			smallWin.loadURL("https://github.com/lamgiahung112/DSA-Project")
			smallWin.on("ready-to-show", () => smallWin.show())
		},
	},
]

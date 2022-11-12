const byId = (id) => {
	return document.getElementById(id)
}

const view = byId("webview")

view.addEventListener("load-commit", () => {
	byId("url-input").value = view.getURL()
})

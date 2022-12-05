const Stack = function () {
	this.head = {
		data: null,
		next: null,
	}
	this.top = this.head
}

Stack.prototype.push = function (item) {
	if (!this.head.data && !this.head.next) {
		this.head = { data: item, next: null }
		this.top = this.head
	} else {
		this.top.next = { data: item, next: null }
		this.top = this.top.next
	}
}

Stack.prototype.pop = function () {
	if (this.top === this.head) {
		this.top = null
	} else {
		let tmp = this.head

		while (tmp.next !== this.top) {
			tmp = tmp.next
		}
		delete tmp.next
		this.top = tmp
	}
}

Stack.prototype.getTop = function () {
	return this.top
}

Stack.prototype.getList = function () {
	let tmp = this.head
	let arr = []
	while (tmp) {
		arr.push(tmp.data)
		tmp = tmp.next
	}
	return arr
}

Stack.prototype.filter = function (callback) {
	const arr = []

	while (this.top && !callback(this.getTop())) {
		arr.push(this.getTop())
		this.pop()
	}

	this.pop()

	while (arr.length) {
		this.push(arr.pop())
	}
}

const BrowserHistory = function () {
	this.page = {
		url: homeURL,
		back: null,
		next: null,
	}
}

BrowserHistory.prototype.visit = function (url) {
	this.page.next = {
		url,
		back: this.page,
		next: null,
	}
	this.page = this.page.next
}

BrowserHistory.prototype.back = function () {
	if (!this.page.back) return
	this.page = this.page.back
	return this.page.url
}

BrowserHistory.prototype.next = function () {
	if (!this.page.next) return
	this.page = this.page.next
	return this.page.url
}

const byId = (id) => {
	return document.getElementById(id)
}

const { randomUUID } = require("crypto")
const storage = require("electron-json-storage")
const os = require("os")

storage.setDataPath(os.tmpdir())

const homeURL = "https://www.google.com"
const browserHistory = new BrowserHistory()

const historyStack = new Stack()
let bookmarkMap = {}

const tabMap = new Map()
;(() => {
	const tmp = storage.getSync("history")
	if (tmp.length) {
		tmp.forEach((item) => historyStack.push(item))
	}
	bookmarkMap = storage.getSync("bookmark")
})()

var isVisit = true

let currentTabid
const webviewContainer = byId("webview-container")
const addTabBtn = byId("btn-new-tab")
const tabRenderer = byId("tab-renderer")

const backBtn = byId("back-btn")
const nextBtn = byId("next-btn")
const reloadBtn = byId("reload-btn")
const urlInput = byId("url-input")
const homeBtn = byId("home-btn")
const bookmarkBtn = byId("save-bookmark")
const searchBtn = byId("search-btn")

const modal = byId("modal")

/** RENDER WEBVIEW */

/** WEBVIEW EVENT HANDLERS */
let isClickingClose = false

const tabEventHandler = (id) => {
	const view = tabMap.get(id)
	if (isVisit) {
		browserHistory.visit(view.getURL())
	}
	isVisit = true
	urlInput.value = view.getURL()
	byId(`tab-title-${currentTabid}`).textContent = view.getTitle()

	historyStack.push({
		url: view.getURL(),
		title: view.getTitle(),
		id: randomUUID(),
		date: new Date().toLocaleString(),
	})

	storage.set("history", historyStack.getList(), (err) => {
		console.log(err)
	})
	console.log(historyStack.getList())
}

const resetTabEventHandler = () => {
	for (const id of tabMap.keys()) {
		const view = tabMap.get(id)

		view.removeEventListener("did-finish-load", () => tabEventHandler(id))
		view.addEventListener("did-finish-load", () => tabEventHandler(id))
	}
}

resetTabEventHandler()

addTabBtn.addEventListener("click", () => {
	for (const key of tabMap.keys()) {
		tabMap.get(key).style.width = "0"
		tabMap.get(key).style.height = "0"
	}

	const newWebview = document.createElement("webview")
	const id = randomUUID()
	newWebview.setAttribute("id", id)
	newWebview.setAttribute("src", "https://www.google.com")
	newWebview.setAttribute("webpreferences", "contextIsolation=false")
	newWebview.textContent = " "
	webviewContainer.appendChild(newWebview)
	tabMap.set(id, byId(id))
	currentTabid = id

	const tabToAdd = document.createElement("div")
	tabToAdd.className = "chrome-tab"
	tabToAdd.toggleAttribute("active")

	const content = document.createElement("div")
	content.className = "chrome-tab-content"

	const tabTitle = document.createElement("div")
	tabTitle.className = "chrome-tab-title"
	tabTitle.id = `tab-title-${id}`

	const tabClose = document.createElement("div")
	tabClose.className = "chrome-tab-close"
	tabClose.id = `tab-close-${id}`

	tabClose.addEventListener("click", () => {
		isClickingClose = true
		tabRenderer.removeChild(tabToAdd)
		webviewContainer.removeChild(newWebview)
		tabMap.delete(id)
		tabMap.forEach((_, key) => (currentTabid = key))

		if (currentTabid !== id) {
			tabMap.get(currentTabid).style.width = "100%"
			tabMap.get(currentTabid).style.height = "680px"
			urlInput.value = tabMap.get(currentTabid).getURL()
		} else {
			urlInput.value = ""
		}
	})

	tabToAdd.addEventListener("click", () => {
		if (currentTabid == id || isClickingClose) return
		currentTabid = id
		tabMap.forEach((webview) => {
			webview.style.width = "0"
			webview.style.height = "0"
		})
		tabMap.get(currentTabid).style.width = "100%"
		tabMap.get(currentTabid).style.height = "680px"
		urlInput.value = tabMap.get(currentTabid).getURL()
	})

	content.appendChild(tabTitle)
	content.appendChild(tabClose)

	tabToAdd.innerHTML = chromeTabBackground
	tabToAdd.appendChild(content)

	tabRenderer.appendChild(tabToAdd)
	resetTabEventHandler()
})

/**OTHER EVENTS */

backBtn.addEventListener("click", () => {
	const backURL = browserHistory.back()
	if (!backURL) return
	isVisit = false
	tabMap(currentTabid).loadURL(backURL)
})

nextBtn.addEventListener("click", () => {
	const nextURL = browserHistory.next()
	if (!nextURL) return
	isVisit = false
	tabMap(currentTabid).loadURL(nextURL)
})

homeBtn.addEventListener("click", () => {
	tabMap(currentTabid).loadURL(homeURL)
})

reloadBtn.addEventListener("click", () => {})

searchBtn.onclick = () => {
	if (urlInput.value.startsWith("https://")) {
		tabMap.get(currentTabid).loadURL(urlInput.value)
	}
}

bookmarkBtn.addEventListener("click", () => {
	modal.style.visibility = "unset"

	const hide = () => {
		modal.style.visibility = "hidden"
	}

	byId("modal-close").onclick = hide

	byId("folder-input").innerHTML = ""
	Object.keys(bookmarkMap).forEach((key) => {
		const option = document.createElement("option")
		option.label = key
		option.value = key
		byId("folder-input").appendChild(option)
	})

	const form = byId("modal-form")
	const titleInput = byId("title-input")
	const newFolder = byId("add-folder")
	const folderInput = byId("folder-input")

	form.onsubmit = (e) => {
		e.preventDefault()

		if (!titleInput.value) {
			byId("chui").innerText = "Title cannot be null"
			return
		}

		if (newFolder.value !== "") {
			if (newFolder.value in bookmarkMap)
				bookmarkMap[newFolder.value].push({
					id: randomUUID(),
					date: `${new Date().getDate()}/${
						new Date().getMonth() + 1
					}/${new Date().getFullYear()}`,
					title: titleInput.value,
					url: tabMap.get(currentTabid).getURL(),
				})
			else
				bookmarkMap[newFolder.value] = [
					{
						id: randomUUID(),
						date: `${new Date().getDate()}/${
							new Date().getMonth() + 1
						}/${new Date().getFullYear()}`,
						title: titleInput.value,
						url: tabMap.get(currentTabid).getURL(),
					},
				]
		} else {
			bookmarkMap[folderInput.value].push({
				id: randomUUID(),
				date: `${new Date().getDate()}/${
					new Date().getMonth() + 1
				}/${new Date().getFullYear()}`,
				title: titleInput.value,
				url: tabMap.get(currentTabid).getURL(),
			})
		}

		modal.style.visibility = "hidden"
		storage.set("bookmark", bookmarkMap, (err) => {
			console.log(err)
		})
	}
})

const chromeTabBackground = `<div class="chrome-tab-background">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"/></symbol><symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></svg>
</div>`

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
const fs = require("fs")

const homeURL = "https://www.google.com"
const browserHistory = new BrowserHistory()

const historyStack = new Stack()
const bookmarkStack = new Stack()

;(() => {
	require("./history.json").forEach((item) => historyStack.push(item))
	require("./bookmark.json").forEach((item) => bookmarkStack.push(item))
})()

var isVisit = true

const view = byId("webview")
const backBtn = byId("back-btn")
const nextBtn = byId("next-btn")
const reloadBtn = byId("reload-btn")
const urlInput = byId("url-input")
const historyBtn = byId("history-btn")
const bookmarkBtn = byId("bookmark-btn")
const homeBtn = byId("home-btn")

view.addEventListener("did-finish-load", () => {
	if (isVisit) {
		browserHistory.visit(view.getURL())
	}
	isVisit = true
	urlInput.value = view.getURL()

	historyStack.push({ url: view.getURL(), title: view.getTitle(), id: randomUUID() })
	fs.writeFile("./history.json", JSON.stringify(historyStack.getList()), (err) => {
		homeBtn.innerText = err.message
	})
})

backBtn.addEventListener("click", () => {
	const backURL = browserHistory.back()
	if (!backURL) return
	isVisit = false
	view.loadURL(backURL)
})

nextBtn.addEventListener("click", () => {
	const nextURL = browserHistory.next()
	if (!nextURL) return
	isVisit = false
	view.loadURL(nextURL)
})

homeBtn.addEventListener("click", () => {
	view.loadURL(homeURL)
})

bookmarkBtn.addEventListener("click", () => {
	bookmarkStack.push({
		title: view.getTitle(),
		id: randomUUID(),
		url: view.getURL(),
	})
	fs.writeFile("./bookmark.json", JSON.stringify(bookmarkStack.getList()), (err) => {
		bookmarkBtn.innerText = err.message
	})
})

reloadBtn.addEventListener("click", () => {})
historyBtn.addEventListener("click", () => {
	urlInput.value = "browser://history"
	view.loadURL("./history.html")
})

class Stack {
	#items = []

	constructor(items) {
		this.#items = items
	}

	push(element) {
		this.#items.push(element)
	}

	top() {
		if (this.#items.length == 0) return null
		return this.#items[this.#items.length - 1]
	}

	pop() {
		if (this.#items.length === 0) return
		this.#items.pop()
	}

	getItemList() {
		return this.#items
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
const fs = require("fs")

const homeURL = "https://www.google.com"
const browserHistory = new BrowserHistory()

const historyStack = new Stack(require("./history.json"))
const bookmarkStack = new Stack(require("./bookmark.json"))

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

	historyStack.push({ title: view.getTitle(), url: view.getURL(), id: randomUUID() })
	fs.writeFile("./history.json", JSON.stringify(historyStack.getItemList()), (err) => {
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
	fs.writeFile(
		"./bookmark.json",
		JSON.stringify(bookmarkStack.getItemList()),
		(err) => {
			bookmarkBtn.innerText = err.message
		}
	)
})

reloadBtn.addEventListener("click", () => {})
historyBtn.addEventListener("click", () => {
	urlInput.value = "browser://history"
	view.loadURL("./history.html")
})

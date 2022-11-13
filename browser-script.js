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

class Stack{
    constructor() {
        this.items = [];
        this.count = 0;
    }
    push(element){
        this.items[this.count++] = element;     
    }
    
    top(){
        if(this.count == 0) return undefined
        return this.items[this.count - 1]
    }
}

const byId = (id) => {
	return document.getElementById(id)
}

const homeURL = "https://www.google.com"
const browserHistory = new BrowserHistory()
var isVisit = true

const view = byId("webview")
const backBtn = byId("back-btn")
const nextBtn = byId("next-btn")
const reloadBtn = byId("reload-btn")
const urlInput = byId("url-input")
const historyBtn = byId("history-btn")
const bookmarkBtn = byId("bookmark-btn")
const homeBtn = byId("home-btn")
const console = byId("console")
const stackHistory = new Stack()


view.addEventListener("did-finish-load", () => {
	if (isVisit) {
		browserHistory.visit(view.getURL())
	}
	isVisit = true
	urlInput.value = view.getURL()
	stackHistory.push(view.getURL())
	var obj = []
	obj.push(stackHistory.items)//add url to history.json, chỗ này thêm cái tab name nữa là hợp lí
	const fs = require('fs')
	fs.writeFile('testJSON.json', JSON.stringify(obj), err => {
		if (err) {
		  throw err
		}
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

reloadBtn.addEventListener("click", () => {})





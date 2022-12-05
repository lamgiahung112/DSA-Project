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
	let list = this.getList()

	list = list.filter((data) => callback(data))

	this.head = {
		data: null,
		next: null,
	}
	this.top = this.head
	for (let item of list) {
		this.push(item)
	}
}
const storage = require("electron-json-storage")
const os = require("os")

storage.setDataPath(os.tmpdir())
const data = new Stack()

;(() => {
	const tmp = storage.getSync("history")
	if (tmp.length) {
		tmp.forEach((item) => data.push(item))
	}
})()

const renderer = document.getElementById("renderer")
const render = () => {
	let tmp = data.head
	while (tmp) {
		const { id, title, url, date } = tmp.data

		const newDiv = document.createElement("div")
		newDiv.className = "item-container"

		const checkbox = document.createElement("input")
		checkbox.setAttribute("type", "checkbox")
		checkbox.className = "checkbox"

		const timeAccessed = document.createElement("p")
		timeAccessed.className = "time-accessed"
		timeAccessed.innerHTML = date

		const itemInfo = document.createElement("div")
		itemInfo.className = "item-info"

		const titleLink = document.createElement("a")
		titleLink.className = "title"
		titleLink.innerText = title

		titleLink.onclick = async () => {
			// Copy the text inside the text field
			await navigator.clipboard.writeText(bookmark.url)

			// Alert the copied text
			alert("Copied link: " + bookmark.url)
		}

		const domain = document.createElement("p")
		domain.className = "domain"
		domain.innerText = url

		const delBtn = document.createElement("button")
		delBtn.className = "option-btn"
		delBtn.innerText = "X"
		delBtn.addEventListener("click", () => {
			data.filter((x) => x.id !== id)
			renderer.innerHTML = ""
			storage.set("history", data.getList(), (err) => {
				console.log(err)
			})
			render()
		})

		itemInfo.appendChild(titleLink)
		itemInfo.appendChild(domain)

		newDiv.appendChild(checkbox)
		newDiv.appendChild(timeAccessed)
		newDiv.appendChild(itemInfo)
		newDiv.appendChild(delBtn)
		renderer.appendChild(newDiv)
		tmp = tmp.next
	}
}

render()

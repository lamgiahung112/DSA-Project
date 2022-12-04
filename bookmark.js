const fs = require("fs")
let data = require("./bookmark.json")

const renderer = document.getElementById("renderer")

const render = () => {
	for (let key of Object.keys(data)) {
		const mainContainer = document.createElement("div")
		mainContainer.className = "main-container"

		const bigTitle = document.createElement("div")
		bigTitle.className = "date-accessed"
		bigTitle.innerText = key

		const listItem = document.createElement("div")
		listItem.className = "list-items"

		function renderDetail() {
			for (let bookmark of data[key]) {
				const newDiv = document.createElement("div")
				newDiv.className = "item-container"

				const checkbox = document.createElement("input")
				checkbox.setAttribute("type", "checkbox")
				checkbox.className = "checkbox"

				const timeAccessed = document.createElement("p")
				timeAccessed.className = "time-accessed"
				timeAccessed.innerHTML = bookmark.date

				const itemInfo = document.createElement("div")
				itemInfo.className = "item-info"

				const titleLink = document.createElement("a")
				titleLink.className = "title"
				titleLink.innerText = bookmark.title

				const domain = document.createElement("p")
				domain.className = "domain"
				domain.innerText = bookmark.url

				const delBtn = document.createElement("button")
				delBtn.className = "option-btn"
				delBtn.innerText = "X"
				delBtn.addEventListener("click", () => {
					data[key] = data[key].filter((x) => x.id !== bookmark.id)
					listItem.innerHTML = ""
					fs.writeFile("./bookmark.json", JSON.stringify(data), (err) => {
						if (err) console.log(err)
					})
					renderDetail()
				})

				itemInfo.appendChild(titleLink)
				itemInfo.appendChild(domain)

				newDiv.appendChild(checkbox)
				newDiv.appendChild(timeAccessed)
				newDiv.appendChild(itemInfo)
				newDiv.appendChild(delBtn)

				listItem.appendChild(newDiv)
			}
		}

		renderDetail()
		mainContainer.appendChild(bigTitle)
		mainContainer.appendChild(listItem)
		renderer.appendChild(mainContainer)
	}
}

render()

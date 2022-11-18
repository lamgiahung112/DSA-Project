const renderer = document.getElementById("renderer")

const data = require("./history.json")

for (let i = 0; i < data.length; i++) {
	const newDiv = document.createElement("div")
	newDiv.className = "item-container"

	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.className = "checkbox"

	const timeAccessed = document.createElement("p")
	timeAccessed.className = "time-accessed"
	timeAccessed.innerHTML = data[i].date

	const itemInfo = document.createElement("div")
	itemInfo.className = "item-info"

	const title = document.createElement("a")
	title.className = "title"
	title.innerText = data[i].title

	const domain = document.createElement("p")
	domain.className = "domain"
	domain.innerText = data[i].url

	const delBtn = document.createElement("button")
	delBtn.className = "option-btn"
	delBtn.innerText = "X"

	itemInfo.appendChild(title)
	itemInfo.appendChild(domain)

	newDiv.appendChild(checkbox)
	newDiv.appendChild(timeAccessed)
	newDiv.appendChild(itemInfo)
	newDiv.appendChild(delBtn)
	renderer.appendChild(newDiv)
}

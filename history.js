const renderer = document.getElementById("renderer")

const data = require("./history.json")

for (let i = 0; i < data.length; i++) {
	const newDiv = document.createElement("div")
	newDiv.innerText = data[i].title
	renderer.appendChild(newDiv)
}

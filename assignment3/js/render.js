export function renderRound(matches, title){

const container = document.querySelector("#tournament")

const roundDiv = document.createElement("div")
roundDiv.classList.add("round")

const heading = document.createElement("h2")
heading.textContent = title

roundDiv.appendChild(heading)

matches.forEach(match => {

const el = match.createElement()
roundDiv.appendChild(el)

})

container.appendChild(roundDiv)

}
import {createRound, getWinners} from "./tournament.js"
import {renderRound} from "./render.js"

let currentMatches = []

async function init(){

const response = await fetch("./data/contestants.json")
const players = await response.json()

startTournament(players)

}

function startTournament(players){

document.querySelector("#tournament").innerHTML = ""

/* visa simulera-knappen igen */
document.querySelector("#simulateBtn").style.display = "inline-block"

currentMatches = createRound(players)

renderRound(currentMatches,"Kvartsfinal")

}

function simulateRound(){

currentMatches.forEach(match => match.compete())

const winners = getWinners(currentMatches)

/* FINALEN ÄR KLAR */

if(winners.length === 1){

/* göm simulera-knappen */
document.querySelector("#simulateBtn").style.display = "none"

return

}

/* skapa nästa runda */

currentMatches = createRound(winners)

let title = ""

if(winners.length === 4) title = "Semifinal"
if(winners.length === 2) title = "Final"

renderRound(currentMatches,title)

}

/* KNAPPAR */

document
.querySelector("#simulateBtn")
.addEventListener("click", simulateRound)

document
.querySelector("#restartBtn")
.addEventListener("click", init)

/* starta automatiskt */

init()
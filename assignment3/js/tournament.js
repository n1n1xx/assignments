import {Match} from "./Match.js"

export function createRound(players){

const matches = []

for(let i = 0; i < players.length; i += 2){

const match = new Match(players[i], players[i+1])
matches.push(match)

}

return matches
}

export function getWinners(matches){

return matches.map(match => match.winner)

}
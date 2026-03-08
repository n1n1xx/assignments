export class Match {

#player1
#player2
#winner
#element

constructor(p1, p2){
this.#player1 = p1
this.#player2 = p2
this.#winner = null
}

get player1(){
return this.#player1
}

get player2(){
return this.#player2
}

get winner(){
return this.#winner
}

get isPlayed(){
return this.#winner !== null
}

compete(){

if(this.isPlayed) return

const skill1 = this.#player1.skillLevel ?? 4
const skill2 = this.#player2.skillLevel ?? 4

const chance = skill1 / (skill1 + skill2)

if(Math.random() < chance){
this.#winner = this.#player1
}else{
this.#winner = this.#player2
}

this.updateUI()
}

createElement(){

const matchDiv = document.createElement("div")
matchDiv.classList.add("match")

const p1 = document.createElement("div")
p1.classList.add("player")

p1.textContent =
`${this.#player1.name} | Skill: ${this.#player1.skillLevel ?? "?"}
"${this.#player1.catchphrase ?? "Ingen catchphrase"}"`

const p2 = document.createElement("div")
p2.classList.add("player")

p2.textContent =
`${this.#player2.name} | Skill: ${this.#player2.skillLevel ?? "?"}
"${this.#player2.catchphrase ?? "Ingen catchphrase"}"`

matchDiv.append(p1,p2)

this.#element = matchDiv

return matchDiv

}

updateUI(){

const players = this.#element.querySelectorAll(".player")

if(this.#winner === this.#player1){

players[0].classList.add("winner")
players[1].classList.add("loser")

}else{

players[1].classList.add("winner")
players[0].classList.add("loser")

}

}

}
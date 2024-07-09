class FifaOnlinePlayer {
    constructor(name,team,position,goals) {
        this.name = name
        this.team = team
        this.position = position
        this.goals = goals
    }

    score() {
        this.goals++
    }

    clone() {
        return new FifaOnlinePlayer(this.name,this.team, this.position,this.goals)
    }
}

const prototypePattern = new FifaOnlinePlayer('CR7','MU', 'ST',0)

const cr7 = prototypePattern.clone()
const neymar =  prototypePattern.clone()
neymar.name= 'neymar'
neymar.team = 'barca'
const neymar1 =  JSON.parse(JSON.stringify(neymar))
neymar1.age =23
FifaOnlinePlayer.prototype.age = 20
cr7.score()
console.log(`${cr7.name} has rescored ${cr7.goals} this season and ${cr7.age}`);
neymar.score()
console.log(`${neymar1.name} has rescored ${neymar1.goals} this season and ${neymar1.age}`);

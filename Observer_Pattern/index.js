class Observer {
    constructor(name) {
        this.namePick = name;
    }

    updateStatus(location) {
        this.goToHelp(location)
    }

    goToHelp(location) {
        console.log(`${this.namePick} ... Ping..Ping..Ping ${JSON.stringify(location)}`);
    }
}

class Subject {
    constructor() {
        this.observerList = []
    }
    
    addObserver(observer){
        this.observerList.push(observer)
    }

    notify(location) {
        this.observerList.forEach(observer => observer.updateStatus(location))
    }
}

const subject = new Subject()

const akali =  new Observer('akali')
const katarina = new Observer('katarina')

subject.addObserver(akali)
subject.addObserver(katarina)

subject.notify({long:123, lat:234})
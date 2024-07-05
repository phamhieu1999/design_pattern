class Leader {
    receiveRequest(offer) {
        console.log(`Boss said!:Ok::${offer}`);
    }
}

class Scretery {
    constructor() {
        this.leader = new Leader()
    }

    receiveRequest(offer) {
        this.leader.receiveRequest(offer)
    }
}

class Developer {
    constructor(offer) {
        this.offer = offer
    }

    applyFor(target){
        target.receiveRequest(this.offer)
    }
}

const dev = new Developer('I want to upto 100k')
dev.applyFor(new Scretery())
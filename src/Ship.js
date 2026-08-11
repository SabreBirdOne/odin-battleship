export default class Ship {
    constructor(shipLength = 1){
        this.shipLength = shipLength;
        this.timesHit = 0;
    }

    hit(){
        if (this.timesHit < this.shipLength) this.timesHit++;
    }

    isSunk(){
        return this.timesHit >= this.shipLength;
    }
}
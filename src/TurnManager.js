import playerList from "./playerList";

export default class TurnManager {
    static currentTurn = 0;

    static getCurrentTurn(){
        return this.currentTurn;
    }

    static getCurrentPlayerName(){
        return playerList[this.currentTurn].name;
    }

    static nextTurn(){
        this.currentTurn = (this.currentTurn + 1) % playerList.length;
    }

    static resetTurn(){
        this.currentTurn = 0;
    }
} 
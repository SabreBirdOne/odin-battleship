import GameBoard from "./GameBoard";

export default class Player {
    constructor(name, type = 'real'){
        this.name = name;
        this.playerType = ['computer', 'real'].includes(type) ?
            type : 'real';
        
        this.board = new GameBoard(10);
    }
}
import GameBoard from "./GameBoard";

export default class Player {
    constructor(name, type = 'real'){
        this.name = name;
        this.playerType = ['computer', 'real'].includes(type) ?
            type : 'real';
        
        this.board = new GameBoard(10);
        this.computerAttacks = [];
    }

    computerRecordAttack(x, y){
        this.computerAttacks.push(`${x},${y}`);
    }

    computerGetNextAttack(){
        let squaresAvailable = [];
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let coordString = `${j},${i}`
                if (!this.computerAttacks.includes(coordString)){
                    squaresAvailable.push(coordString);
                }
            }
        }
        return squaresAvailable[Math.floor(
            Math.random() * squaresAvailable.length
        )];
    }
}
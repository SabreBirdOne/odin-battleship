import Player from "./Player";

/*
    There will be two types of players in the game, 
    ‘real’ players and ‘computer’ players.
    Each player object should contain its own gameboard.
*/

test("Player constructor test", ()=>{
    const player1 = new Player("Strayed");
    const player2 = new Player("CUBE", 'computer');

    expect(player1).toBeDefined();
    expect(player2).toBeDefined();

    expect(player1.name).not.toBe(player2.name);
    const validPlayerTypes = ['computer', 'real'];
    expect(validPlayerTypes).toContain(player1.playerType);
    expect(validPlayerTypes).toContain(player2.playerType);
})

test("Player's gameboard test", ()=>{
    const player1 = new Player("Strayed");
    const player2 = new Player("CUBE", 'computer');

    // GameBoards should not interfere with each other
    player1.board.placeShip(1, 0, 0, 0, 0);
    player2.board.placeShip(1, 9, 9, 9, 9);

    expect(player1.board.ships.keys()).toContain('0,0,0,0');
    expect(player1.board.ships.keys()).not.toContain('9,9,9,9');

    expect(player1.board.ships.keys()).toContain('0,0,0,0');
    expect(player1.board.ships.keys()).not.toContain('9,9,9,9');

    player1.board.receiveAttack(0, 1);
    expect(player1.board.getMissedAttacks()).toContain('0,1');
    expect(player2.board.getMissedAttacks()).not.toContain('0,1');

    player2.board.receiveAttack(9, 9)
    expect(player1.board.allShipsSunk()).toBeFalsy();
    expect(player2.board.allShipsSunk()).toBeTruthy();

})
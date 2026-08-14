import Ship from "./Ship.js"
import GameBoard from "./GameBoard";
import hashMapCopy from "./hashMapCopier";

function createNewGameBoard(){
    return new GameBoard();
}

test("constructor test", ()=>{
    const board = createNewGameBoard();
    
    expect(board).toBeDefined();
    expect(board.sideLength).toBe(10);
})

/* 
    Gameboards should be able to place ships at specific coordinates
    by calling the ship factory or class.
*/
test("placeShip() test 1", ()=>{
    let board = createNewGameBoard();
    const boardShipsBefore = hashMapCopy(board.ships);
    const boardSquareListsBefore = hashMapCopy(board.tipPointsSquareList);

    board.placeShip(3, -1, 0, -1, 2);
    expect(boardShipsBefore).toStrictEqual(board.ships);
    expect(boardSquareListsBefore).toStrictEqual(board.tipPointsSquareList);
})

test("placeShip() test 2", ()=>{
    let board = createNewGameBoard();
    
    board.placeShip(1, 9, 9, 9, 9);
    expect(board.ships.get('9,9,9,9')).toStrictEqual(new Ship(1));
    expect(board.tipPointsSquareList.get('9,9,9,9')).toStrictEqual(['9,9']);

    board.placeShip(3, 0, 0, 0, 2);
    expect(board.ships.get('0,0,0,2')).toStrictEqual(new Ship(3));
    expect(board.tipPointsSquareList.get('0,0,0,2')).toStrictEqual(['0,0', '0,1', '0,2']);

    board.placeShip(4, 0, 3, 3, 3);
    expect(board.ships.get('0,3,3,3')).toStrictEqual(new Ship(4));
    expect(board.tipPointsSquareList.get('0,3,3,3')).toStrictEqual(['0,3', '1,3', '2,3', '3,3']);

    // Prevent placing ships that overlap
    board.placeShip(4, 0, 0, 0, 3);
    expect(board.ships.get('0,0,0,2')).toStrictEqual(new Ship(3));
    expect(board.tipPointsSquareList.get('0,0,0,2')).toStrictEqual(['0,0', '0,1', '0,2']);
    expect(board.ships.get('0,0,0,3')).toBeNull();
    expect(board.tipPointsSquareList.get('0,0,0,3')).toBeNull();
})

/* 
    Gameboards should have a receiveAttack function that takes a pair of coordinates, 
    determines whether or not the attack hit a ship and 
    then sends the ‘hit’ function to the correct ship, 
    or records the coordinates of the missed shot.
*/

test("receiveAttack() test 1", ()=>{
    let board = createNewGameBoard();
    
    board.placeShip(1, 9, 9, 9, 9);
    board.placeShip(3, 0, 0, 0, 2);
    board.placeShip(4, 0, 3, 3, 3);
    
    board.receiveAttack(8, 8); // miss
    expect(board.hits.length).toBeFalsy();
    expect(board.hits).not.toContain('8,8');
    expect(board.misses).toContain('8,8');

    board.receiveAttack(9, 9); // hit, sink ship
    expect(board.hits).toContain('9,9');
    expect(board.misses).not.toContain('9,9');
    expect(board.ships.get('9,9,9,9').isSunk()).toBeTruthy();
    
    board.receiveAttack(0, 0) // hit, ship has taken 1 hit
    expect(board.hits).toContain('0,0');
    expect(board.misses).not.toContain('0,0');
    expect(board.ships.get('0,0,0,2').isSunk()).toBeFalsy();
    expect(board.ships.get('0,0,0,2').timesHit).toBe(1);
})

test("receiveAttack() test 1", ()=>{
    let board = createNewGameBoard();
    
    board.placeShip(1, 9, 9, 9, 9);
    board.placeShip(3, 0, 0, 0, 2);
    board.placeShip(4, 0, 3, 3, 3);

    board.receiveAttack(9, 9); // hit, sink ship
    board.receiveAttack(9, 9); // receive attack in a damaged square, ignore.
    expect(board.hits).toContain('9,9');
    expect(board.misses).not.toContain('9,9');
    expect(board.ships.get('9,9,9,9').isSunk()).toBeTruthy();

    board.receiveAttack(0, 0) // hit, ship has taken 1 hit
    board.receiveAttack(0, 0) // receive attack in a damaged square, ignore.
    expect(board.hits).toContain('0,0');
    expect(board.misses).not.toContain('0,0');
    expect(board.ships.get('0,0,0,2').isSunk()).toBeFalsy();
    expect(board.ships.get('0,0,0,2').timesHit).toBe(1);

    board.receiveAttack(0, 1) // hit, ship has taken 2 hits
    expect(board.hits).toContain('0,1');
    expect(board.misses).not.toContain('0,1');
    expect(board.ships.get('0,0,0,2').isSunk()).toBeFalsy();
    expect(board.ships.get('0,0,0,2').timesHit).toBe(2);

    board.receiveAttack(0, 2) // hit, ship has taken 3 hits, sunk
    expect(board.hits).toContain('0,2');
    expect(board.misses).not.toContain('0,2');
    expect(board.ships.get('0,0,0,2').isSunk()).toBeTruthy();
    expect(board.ships.get('0,0,0,2').timesHit).toBe(3);
})

/*
    Gameboards should keep track of missed attacks so they can display them properly.
*/
test("getMissedAttacks() test", ()=>{
    let board = createNewGameBoard();
    board.placeShip(1, 9, 9, 9, 9);

    const attacks = [
        [0,0],
        [2,3],
        [0,0],
        [2,3],
        [1,2],
        [9,9]
    ]

    for(const attack of attacks){
        board.receiveAttack(attack[0], attack[1]);
    }
    const missedAttacks = board.getMissedAttacks();
    expect(missedAttacks).toContain('0,0');
    expect(missedAttacks).toContain('2,3');
    expect(missedAttacks).toContain('1,2');
})

/*
    Gameboards should be able to report whether or not all of their ships have been sunk.
*/

test("allShipsSunk() test", ()=>{
    let board = createNewGameBoard();
    
    // returns false because there is no ship.
    expect(board.allShipsSunk()).toBeFalsy();

    board.placeShip(1, 9, 9, 9, 9);
    board.placeShip(3, 0, 0, 0, 2);

    // No attacks yet
    expect(board.allShipsSunk()).toBeFalsy();

    board.receiveAttack(9, 9); // hit, sink ship
    board.receiveAttack(9, 9); // receive attack in a damaged square, ignore.
    
    // Ships still remain
    expect(board.allShipsSunk()).toBeFalsy();

    board.receiveAttack(0, 0) // hit, ship has taken 1 hit
    board.receiveAttack(0, 0) // receive attack in a damaged square, ignore.
    
    expect(board.allShipsSunk()).toBeFalsy();

    board.receiveAttack(0, 1) // hit, ship has taken 2 hits
    expect(board.allShipsSunk()).toBeFalsy();

    board.receiveAttack(0, 2) // hit, ship has taken 3 hits, sunk
    
    // All ships are sunk
    expect(board.allShipsSunk()).toBeTruthy();

})
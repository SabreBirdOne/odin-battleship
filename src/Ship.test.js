import Ship from "./Ship";

function buildShip(length){
    return new Ship(length);
}

test("Ship constructor", ()=>{
    const next = buildShip(1);
    expect(next).toBeDefined();
})

test("hit() function", ()=>{
    const ship = buildShip(3);
    ship.hit();
    ship.hit();
    expect(ship.timesHit).toBe(2);
})

test("isSunk function", ()=>{
    const ship = buildShip(5);
    for(let i = 0; i < 5; i++){
        ship.hit();
    }
    expect(ship.isSunk()).toBeTruthy();
})
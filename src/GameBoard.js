import Ship from "./Ship.js"
import HashMap from "./HashMap.js"
import squareConverter, { toStringType } from "./squareConverter.js"

export default class GameBoard {
    constructor(sideLength = 10){
        this.sideLength = sideLength;
        this.ships = new HashMap();
        this.tipPointsSquareList = new HashMap();
        this.misses = new Array();
        this.hits = new Array();
    }

    _isInBounds(x, y){
        return 0 <= x && x < this.sideLength 
            && 0 <= y && y < this.sideLength;
    }

    _isValidShip(length, startX, startY, endX, endY){
        if (!this._isInBounds(startX, startY) 
            || !this._isInBounds(endX, endY)){
            return false; 
        }
        if (startX === endX && startY < endY){
            // vertically placed ship
            return Math.abs(startY - endY) + 1 === length;
        }
        else if (startY === endY && startX < endX){
            // horizontally placed ship
            return Math.abs(startX - endX) + 1 === length;
        }
        else if (startX === endX && startY === endY){
            // ship of length 1
            return length === 1;
        }
        else {
            return false;
        }
    }

    _getOccupiedSquares(){
        if (!this.tipPointsSquareList.values().length) return [];
        return this.tipPointsSquareList.values().reduce(
            (result, current) => result.concat(current));
    }

    _getTipPoint(startX, startY, endX, endY){
        const startString = toStringType([startX, startY]);
        const endString = toStringType([endX, endY]);
        return `${startString},${endString}`;
    }

    _getTipPointAsArray(tipPointString){
        return tipPointString.split(",");
    }

    _getTipPointFromSpannedSquare(x, y){
        // return the tip point of a ship that spans over this x,y square.
        // if no ships span this square (a miss), return null
        const coordString = toStringType([x, y]);
        for(const point of this.tipPointsSquareList.keys()){
            const squareListAtPoint = this.tipPointsSquareList.get(point);
            if (squareListAtPoint && squareListAtPoint.includes(coordString)){
                return point;
            }
        }
        return null;
    }

    _getSquareList(startX, startY, endX, endY){
        const isHorizontal = (startY === endY);
        let squareList = new Array();
        if (isHorizontal){
            for(let i = startX; i <= endX; i++){
                squareList.push(toStringType([i, startY]));
            }
        }
        else {
            for(let i = startY; i <= endY; i++){
                squareList.push(toStringType([startX, i]));
            }
        }
        return squareList;
    }

    _willOverlapOnShip(startX, startY, endX, endY){
        // returns True if coordinates will overlap an existing Ship
        const occupiedSquares = this._getOccupiedSquares();
        const squareListFromTipPoint = this._getSquareList(startX, startY, endX, endY);

        return squareListFromTipPoint.some((point) => occupiedSquares.includes(point));
    }

    placeShip(length, startX, startY, endX, endY){
        if (!this._isValidShip(length, startX, startY, endX, endY)) return;
        if (this._willOverlapOnShip(startX, startY, endX, endY)) return;
        
        const tipPoints = this._getTipPoint(startX, startY, endX, endY);
        this.ships.set(tipPoints, new Ship(length));
        
        const squareList = this._getSquareList(startX, startY, endX, endY);
        this.tipPointsSquareList.set(tipPoints, squareList);
    }

    receiveAttack(x, y){
        const coordinateString = toStringType([x, y]);
        const tipPoint = this._getTipPointFromSpannedSquare(x, y);

        if (!tipPoint && !this.misses.includes(coordinateString)){
            this.misses.push(coordinateString);
        }
        else if (tipPoint && !this.hits.includes(coordinateString)){
            this.hits.push(coordinateString);
            this.ships.get(tipPoint).hit();
        }
    }

    getMissedAttacks(){
        return [...this.misses];
    }

    allShipsSunk(){
        // returns true if there is at least 1 ship and all ships are sunk.
        const tipPoints = this.ships.keys();
        
        if (!tipPoints.length) return false;
        let result = true;
        for (const point of tipPoints){
            result = result && this.ships.get(point).isSunk();
        }
        return result;
    }
}
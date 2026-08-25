export default function createSquareButton(x, y){
    let squareButton = document.createElement('button');

    squareButton.dataset.x = x;
    squareButton.dataset.y = y;
    squareButton.textContent = `${x},${y}`;
    squareButton.dataset.occupied = 0;
    squareButton.dataset.attacked = 0;

    return squareButton;
}
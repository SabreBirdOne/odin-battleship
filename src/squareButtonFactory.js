export default function createSquareButton(x, y){
    let squareButton = document.createElement('button');

    squareButton.dataset.x = x;
    squareButton.dataset.y = y;
    squareButton.textContent = `${x},${y}`;
    
    return squareButton;
}
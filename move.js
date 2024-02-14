const player = document.querySelector('img.player');
const button = document.querySelector('button');
const p = document.querySelector('p,text');

let posTop = 0;
let posLeft = 0;

let interval;

const moveRight = () => {
    posLeft = posLeft + 5;
    player.style.left = posLeft + 'px';
} 

const moveLeft = () => {
    posLeft = posLeft - 5;
    player.style.left = posLeft + 'px';
} 

// button.addEventListener('mousedown', () => {interval = setInterval(movefunc, 20)});
// button.addEventListener('mouseup', () => {clearInterval(interval)});

document.body.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') {
        moveRight();
    }
    if (event.code === 'KeyD') {
        moveLeft();
    }
});
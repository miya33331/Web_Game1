const player = document.querySelector('img.player');
const button = document.querySelector('button');
const p = document.querySelector('p,text');

let posTop = 0;
let posLeft = 0;

let interval;

const movefunc = () => {
    posTop = posTop + 1;
    posLeft = posLeft + 3;

    player.style.top  = posTop + 'px'; 
    player.style.left = posLeft + 'px';
} 

button.addEventListener('mousedown', () => {interval = setInterval(movefunc, 20)});
button.addEventListener('mouseup', () => {clearInterval(interval)});